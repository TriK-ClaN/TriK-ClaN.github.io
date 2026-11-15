/* Spreadsheet Formula Engine */
window.Guide = window.Guide || {};

(function (Guide) {
  "use strict";

  /* Error Values */
  const ERR = {
    div: { error: "#DIV/0!" },
    num: { error: "#NUM!" },
    ref: { error: "#REF!" },
    name: { error: "#NAME?" },
    value: { error: "#VALUE!" },
    circ: { error: "#CIRC!" },
    parse: { error: "#ERROR!" }
  };
  const isError = (value) => value !== null && typeof value === "object" && "error" in value;

  /* French Function Names Mapped to English */
  const FRENCH = {
    SI: "IF",
    ET: "AND",
    OU: "OR",
    NON: "NOT",
    SOMME: "SUM",
    MOYENNE: "AVERAGE",
    VPM: "PMT",
    INTPER: "IPMT",
    PRINCPER: "PPMT",
    TRI: "IRR",
    VAN: "NPV",
    SOMMEPROD: "SUMPRODUCT",
    SIERREUR: "IFERROR",
    ARRONDI: "ROUND",
    PUISSANCE: "POWER",
    NB: "COUNT",
    VRAI: "TRUE",
    FAUX: "FALSE"
  };

  /* Column Letter Conversion */
  function colToNum(letters) {
    let n = 0;
    for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
    return n;
  }

  function numToCol(n) {
    let letters = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      letters = String.fromCharCode(65 + rem) + letters;
      n = Math.floor((n - 1) / 26);
    }
    return letters;
  }

  /* Tokenizer With Source Positions */
  const REF_RE = /^(?:(?:'([^']+)'|([A-Za-z_][A-Za-z0-9_.]*))!)?(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(])/;

  function tokenize(text) {
    const tokens = [];
    const semicolons = /;/.test(text.replace(/"[^"]*"/g, ""));
    let i = 0;
    while (i < text.length) {
      const ch = text[i];
      if (/\s/.test(ch)) {
        i += 1;
        continue;
      }
      const start = i;
      const rest = text.slice(i);

      if (ch === '"') {
        const end = text.indexOf('"', i + 1);
        if (end < 0) throw new Error("Unclosed string");
        tokens.push({ type: "str", value: text.slice(i + 1, end), start, end: end + 1 });
        i = end + 1;
        continue;
      }

      const number = (semicolons ? /^\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?/ : /^\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/).exec(rest) || /^\.\d+/.exec(rest);
      const ref = REF_RE.exec(rest);
      if (ref) {
        tokens.push({
          type: "ref",
          sheet: ref[1] || ref[2] || null,
          absCol: Boolean(ref[3]),
          col: ref[4].toUpperCase(),
          absRow: Boolean(ref[5]),
          row: Number(ref[6]),
          start,
          end: i + ref[0].length
        });
        i += ref[0].length;
        continue;
      }

      if (number) {
        tokens.push({ type: "num", value: Number(number[0].replace(",", ".")), start, end: i + number[0].length });
        i += number[0].length;
        continue;
      }

      const name = /^[A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_.]*/.exec(rest);
      if (name) {
        const upper = name[0].toUpperCase();
        const word = FRENCH[upper] || upper;
        const after = text.slice(i + name[0].length).trimStart();
        if (after.startsWith("(")) tokens.push({ type: "func", value: word, start, end: i + name[0].length });
        else if (word === "TRUE" || word === "FALSE") tokens.push({ type: "bool", value: word === "TRUE", start, end: i + name[0].length });
        else tokens.push({ type: "name", value: upper, start, end: i + name[0].length });
        i += name[0].length;
        continue;
      }

      const two = text.slice(i, i + 2);
      if (two === "<=" || two === ">=" || two === "<>") {
        tokens.push({ type: "op", value: two, start, end: i + 2 });
        i += 2;
        continue;
      }
      if ("+-*/^&=<>%".includes(ch)) {
        tokens.push({ type: "op", value: ch, start, end: i + 1 });
      } else if (ch === "(" || ch === ")") {
        tokens.push({ type: ch, start, end: i + 1 });
      } else if (ch === "," || ch === ";") {
        tokens.push({ type: "sep", start, end: i + 1 });
      } else if (ch === ":") {
        tokens.push({ type: ":", start, end: i + 1 });
      } else {
        throw new Error(`Unexpected character ${ch}`);
      }
      i += 1;
    }
    return tokens;
  }

  /* Recursive Descent Parser Following Excel Precedence */
  function parse(text) {
    const tokens = tokenize(text);
    let pos = 0;
    const peek = () => tokens[pos];
    const take = () => tokens[pos++];
    const isOp = (...ops) => peek() && peek().type === "op" && ops.includes(peek().value);

    function comparison() {
      let left = concat();
      while (isOp("=", "<>", "<", ">", "<=", ">=")) {
        const op = take().value;
        left = { kind: "bin", op, left, right: concat() };
      }
      return left;
    }

    function concat() {
      let left = additive();
      while (isOp("&")) {
        take();
        left = { kind: "bin", op: "&", left, right: additive() };
      }
      return left;
    }

    function additive() {
      let left = multiplicative();
      while (isOp("+", "-")) {
        const op = take().value;
        left = { kind: "bin", op, left, right: multiplicative() };
      }
      return left;
    }

    function multiplicative() {
      let left = power();
      while (isOp("*", "/")) {
        const op = take().value;
        left = { kind: "bin", op, left, right: power() };
      }
      return left;
    }

    function power() {
      let left = unary();
      while (isOp("^")) {
        take();
        left = { kind: "bin", op: "^", left, right: unary() };
      }
      return left;
    }

    function unary() {
      if (isOp("-")) {
        take();
        return { kind: "neg", arg: unary() };
      }
      if (isOp("+")) {
        take();
        return unary();
      }
      let node = primary();
      while (isOp("%")) {
        take();
        node = { kind: "pct", arg: node };
      }
      return node;
    }

    function primary() {
      const token = take();
      if (!token) throw new Error("Unexpected end");
      if (token.type === "num") return { kind: "num", value: token.value };
      if (token.type === "str") return { kind: "str", value: token.value };
      if (token.type === "bool") return { kind: "bool", value: token.value };
      if (token.type === "ref") {
        if (peek() && peek().type === ":") {
          take();
          const end = take();
          if (!end || end.type !== "ref") throw new Error("Bad range");
          return { kind: "range", sheet: token.sheet, c1: colToNum(token.col), r1: token.row, c2: colToNum(end.col), r2: end.row };
        }
        return { kind: "ref", sheet: token.sheet, col: colToNum(token.col), row: token.row };
      }
      if (token.type === "func") {
        if (!peek() || peek().type !== "(") throw new Error("Expected parenthesis");
        take();
        const args = [];
        if (peek() && peek().type !== ")") {
          for (;;) {
            if (peek() && (peek().type === "sep" || peek().type === ")")) args.push({ kind: "blank" });
            else args.push(comparison());
            if (peek() && peek().type === "sep") {
              take();
              continue;
            }
            break;
          }
        }
        if (!peek() || peek().type !== ")") throw new Error("Expected closing parenthesis");
        take();
        return { kind: "func", name: token.value, args };
      }
      if (token.type === "(") {
        const inner = comparison();
        if (!peek() || peek().type !== ")") throw new Error("Expected closing parenthesis");
        take();
        return inner;
      }
      if (token.type === "name") return { kind: "badname", value: token.value };
      throw new Error("Unexpected token");
    }

    const tree = comparison();
    if (pos < tokens.length) throw new Error("Unexpected input");
    return tree;
  }

  /* Coercion Helpers */
  function toNumber(value) {
    if (isError(value)) return value;
    if (value === null || value === "") return 0;
    if (typeof value === "boolean") return value ? 1 : 0;
    if (typeof value === "number") return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : ERR.value;
  }

  function truthy(value) {
    if (isError(value)) return value;
    if (typeof value === "string") return value !== "";
    return Boolean(toNumber(value));
  }

  /* Numeric Helpers Matching Excel */
  function pmt(rate, nper, pv, fv = 0, type = 0) {
    if (nper === 0) return ERR.num;
    if (rate === 0) return -(pv + fv) / nper;
    const factor = Math.pow(1 + rate, nper);
    return (-(rate * (pv * factor + fv))) / ((1 + rate * type) * (factor - 1));
  }

  function ipmt(rate, per, nper, pv, fv = 0, type = 0) {
    if (per < 1 || per > nper) return ERR.num;
    const payment = pmt(rate, nper, pv, fv, type);
    if (isError(payment)) return payment;
    if (type === 1 && per === 1) return 0;
    const k = type === 1 ? per - 2 : per - 1;
    const balance = rate === 0 ? pv + payment * k : pv * Math.pow(1 + rate, k) + (payment * (Math.pow(1 + rate, k) - 1)) / rate;
    return -balance * rate;
  }

  function irr(values, guess = 0.1) {
    if (!values.some((v) => v > 0) || !values.some((v) => v < 0)) return ERR.num;
    const npv = (rate) => values.reduce((sum, v, t) => sum + v / Math.pow(1 + rate, t), 0);
    const slope = (rate) => values.reduce((sum, v, t) => sum - (t * v) / Math.pow(1 + rate, t + 1), 0);
    let rate = guess;
    for (let i = 0; i < 50; i += 1) {
      const f = npv(rate);
      const d = slope(rate);
      if (!Number.isFinite(f) || !Number.isFinite(d) || d === 0) break;
      const next = rate - f / d;
      if (Math.abs(next - rate) < 1e-12) return next;
      rate = next;
      if (rate <= -0.9999) break;
    }
    let low = -0.9999;
    let high = 10;
    if (npv(low) * npv(high) > 0) return ERR.num;
    for (let i = 0; i < 300; i += 1) {
      const mid = (low + high) / 2;
      if (npv(low) * npv(mid) <= 0) high = mid;
      else low = mid;
    }
    return (low + high) / 2;
  }

  /* Workbook With Cached Recalculation */
  class Workbook {
    constructor(sheets) {
      this.sheets = {};
      Object.keys(sheets).forEach((name) => {
        this.sheets[name] = Object.assign({}, sheets[name]);
      });
      this.cache = new Map();
      this.trees = new Map();
      this.stack = new Set();
    }

    raw(sheet, address) {
      const data = this.sheets[sheet];
      return data && Object.prototype.hasOwnProperty.call(data, address) ? data[address] : null;
    }

    set(sheet, address, raw) {
      if (!this.sheets[sheet]) this.sheets[sheet] = {};
      if (raw === null || raw === "" || raw === undefined) delete this.sheets[sheet][address];
      else this.sheets[sheet][address] = raw;
      this.cache.clear();
    }

    setMany(entries) {
      entries.forEach(([sheet, address, raw]) => {
        if (!this.sheets[sheet]) this.sheets[sheet] = {};
        if (raw === null || raw === "" || raw === undefined) delete this.sheets[sheet][address];
        else this.sheets[sheet][address] = raw;
      });
      this.cache.clear();
    }

    value(sheet, address) {
      const key = `${sheet}!${address}`;
      if (this.cache.has(key)) return this.cache.get(key);
      if (this.stack.has(key)) return ERR.circ;
      const raw = this.raw(sheet, address);
      let result;
      if (raw === null) result = null;
      else if (typeof raw === "number") result = raw;
      else if (typeof raw === "string" && raw.startsWith("=")) {
        this.stack.add(key);
        result = this.evaluateFormula(raw, sheet);
        this.stack.delete(key);
        if (result === null) result = 0;
      } else {
        const parsed = Number(String(raw).replace(",", "."));
        result = String(raw).trim() !== "" && Number.isFinite(parsed) ? parsed : raw;
      }
      this.cache.set(key, result);
      return result;
    }

    evaluateFormula(raw, sheet) {
      let tree = this.trees.get(raw);
      if (!tree) {
        try {
          tree = parse(raw.slice(1));
        } catch (error) {
          tree = { kind: "parseError" };
        }
        this.trees.set(raw, tree);
      }
      const result = this.evaluate(tree, sheet);
      if (result && result.kind === "rangeValue") return ERR.value;
      return result;
    }

    refValue(node, sheet) {
      const target = node.sheet || sheet;
      if (!this.sheets[target]) return ERR.ref;
      return this.value(target, `${numToCol(node.col)}${node.row}`);
    }

    rangeValues(node, sheet) {
      const target = node.sheet || sheet;
      if (!this.sheets[target]) return [ERR.ref];
      const values = [];
      for (let r = Math.min(node.r1, node.r2); r <= Math.max(node.r1, node.r2); r += 1) {
        for (let c = Math.min(node.c1, node.c2); c <= Math.max(node.c1, node.c2); c += 1) {
          values.push(this.value(target, `${numToCol(c)}${r}`));
        }
      }
      return values;
    }

    evaluate(node, sheet) {
      switch (node.kind) {
        case "num":
        case "str":
        case "bool":
          return node.value;
        case "blank":
          return null;
        case "parseError":
          return ERR.parse;
        case "badname":
          return ERR.name;
        case "ref":
          return this.refValue(node, sheet);
        case "range":
          return { kind: "rangeValue", values: this.rangeValues(node, sheet) };
        case "neg": {
          const value = toNumber(this.scalar(node.arg, sheet));
          return isError(value) ? value : -value;
        }
        case "pct": {
          const value = toNumber(this.scalar(node.arg, sheet));
          return isError(value) ? value : value / 100;
        }
        case "bin":
          return this.binary(node, sheet);
        case "func":
          return this.call(node, sheet);
        default:
          return ERR.value;
      }
    }

    scalar(node, sheet) {
      const value = this.evaluate(node, sheet);
      if (value && value.kind === "rangeValue") return ERR.value;
      return value;
    }

    binary(node, sheet) {
      const left = this.scalar(node.left, sheet);
      if (isError(left)) return left;
      const right = this.scalar(node.right, sheet);
      if (isError(right)) return right;
      if (node.op === "&") return `${left === null ? "" : left}${right === null ? "" : right}`;
      if (["=", "<>", "<", ">", "<=", ">="].includes(node.op)) {
        const textual = typeof left === "string" || typeof right === "string";
        const a = textual ? String(left === null ? "" : left).toLowerCase() : toNumber(left);
        const b = textual ? String(right === null ? "" : right).toLowerCase() : toNumber(right);
        switch (node.op) {
          case "=":
            return a === b;
          case "<>":
            return a !== b;
          case "<":
            return a < b;
          case ">":
            return a > b;
          case "<=":
            return a <= b;
          default:
            return a >= b;
        }
      }
      const a = toNumber(left);
      const b = toNumber(right);
      if (isError(a)) return a;
      if (isError(b)) return b;
      switch (node.op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return b === 0 ? ERR.div : a / b;
        case "^": {
          const result = Math.pow(a, b);
          return Number.isFinite(result) ? result : ERR.num;
        }
        default:
          return ERR.value;
      }
    }

    /* Numbers From Arguments, Skipping Text and Blanks Inside Ranges */
    numbers(args, sheet) {
      const out = [];
      for (const arg of args) {
        const value = this.evaluate(arg, sheet);
        if (value && value.kind === "rangeValue") {
          for (const item of value.values) {
            if (isError(item)) return item;
            if (typeof item === "number") out.push(item);
          }
        } else {
          if (isError(value)) return value;
          const n = toNumber(value);
          if (isError(n)) return n;
          if (value !== null) out.push(n);
        }
      }
      return out;
    }

    call(node, sheet) {
      const args = node.args;
      const num = (i, fallback) => {
        if (i >= args.length || args[i].kind === "blank") return fallback;
        return toNumber(this.scalar(args[i], sheet));
      };
      const firstError = (...values) => values.find(isError);

      switch (node.name) {
        case "IF": {
          const condition = truthy(this.scalar(args[0], sheet));
          if (isError(condition)) return condition;
          if (condition) return args.length > 1 ? this.scalar(args[1], sheet) : true;
          return args.length > 2 ? this.scalar(args[2], sheet) : false;
        }
        case "IFERROR": {
          const value = this.scalar(args[0], sheet);
          return isError(value) ? this.scalar(args[1], sheet) : value;
        }
        case "AND":
        case "OR": {
          const values = [];
          for (const arg of args) {
            const value = this.evaluate(arg, sheet);
            const items = value && value.kind === "rangeValue" ? value.values.filter((v) => v !== null && typeof v !== "string") : [value];
            for (const item of items) {
              const t = truthy(item);
              if (isError(t)) return t;
              values.push(t);
            }
          }
          return node.name === "AND" ? values.every(Boolean) : values.some(Boolean);
        }
        case "NOT": {
          const t = truthy(this.scalar(args[0], sheet));
          return isError(t) ? t : !t;
        }
        case "SUM":
        case "MIN":
        case "MAX":
        case "AVERAGE":
        case "COUNT": {
          const values = this.numbers(args, sheet);
          if (isError(values)) return values;
          if (node.name === "SUM") return values.reduce((s, v) => s + v, 0);
          if (node.name === "COUNT") return values.length;
          if (!values.length) return node.name === "AVERAGE" ? ERR.div : 0;
          if (node.name === "MIN") return Math.min(...values);
          if (node.name === "MAX") return Math.max(...values);
          return values.reduce((s, v) => s + v, 0) / values.length;
        }
        case "ABS": {
          const v = num(0, 0);
          return isError(v) ? v : Math.abs(v);
        }
        case "ROUND": {
          const v = num(0, 0);
          const d = num(1, 0);
          if (firstError(v, d)) return firstError(v, d);
          const f = Math.pow(10, d);
          return Math.round(v * f) / f;
        }
        case "POWER": {
          const a = num(0, 0);
          const b = num(1, 0);
          return firstError(a, b) || Math.pow(a, b);
        }
        case "PMT":
        case "IPMT":
        case "PPMT": {
          const ipmtStyle = node.name !== "PMT";
          const rate = num(0, 0);
          const per = ipmtStyle ? num(1, 0) : null;
          const offset = ipmtStyle ? 1 : 0;
          const nper = num(1 + offset, 0);
          const pv = num(2 + offset, 0);
          const fv = num(3 + offset, 0);
          const type = num(4 + offset, 0);
          const bad = firstError(rate, per, nper, pv, fv, type);
          if (bad) return bad;
          if (node.name === "PMT") return pmt(rate, nper, pv, fv, type);
          const interest = ipmt(rate, per, nper, pv, fv, type);
          if (node.name === "IPMT" || isError(interest)) return interest;
          return pmt(rate, nper, pv, fv, type) - interest;
        }
        case "IRR": {
          const values = this.numbers([args[0]], sheet);
          if (isError(values)) return values;
          const guess = num(1, 0.1);
          return irr(values, isError(guess) ? 0.1 : guess);
        }
        case "NPV": {
          const rate = num(0, 0);
          if (isError(rate)) return rate;
          const values = this.numbers(args.slice(1), sheet);
          if (isError(values)) return values;
          return values.reduce((sum, v, t) => sum + v / Math.pow(1 + rate, t + 1), 0);
        }
        case "SUMPRODUCT": {
          const ranges = args.map((arg) => this.evaluate(arg, sheet)).map((v) => (v && v.kind === "rangeValue" ? v.values : [v]));
          if (!ranges.length || ranges.some((r) => r.length !== ranges[0].length)) return ERR.value;
          let total = 0;
          for (let i = 0; i < ranges[0].length; i += 1) {
            let product = 1;
            for (const r of ranges) {
              if (isError(r[i])) return r[i];
              product *= typeof r[i] === "number" ? r[i] : 0;
            }
            total += product;
          }
          return total;
        }
        default:
          return ERR.name;
      }
    }
  }

  /* Relative Reference Shifting for Fill Right and Fill Down */
  function shiftFormula(formula, dCol, dRow) {
    if (typeof formula !== "string" || !formula.startsWith("=")) return formula;
    let tokens;
    try {
      tokens = tokenize(formula.slice(1));
    } catch (error) {
      return formula;
    }
    let out = "";
    let cursor = 0;
    const body = formula.slice(1);
    tokens.forEach((token) => {
      if (token.type !== "ref") return;
      out += body.slice(cursor, token.start);
      const col = token.absCol ? colToNum(token.col) : colToNum(token.col) + dCol;
      const row = token.absRow ? token.row : token.row + dRow;
      const sheet = body.slice(token.start, token.end).match(/^((?:'[^']+'|[A-Za-z_][A-Za-z0-9_.]*)!)?/)[0];
      out += col < 1 || row < 1 ? "#REF!" : `${sheet}${token.absCol ? "$" : ""}${numToCol(col)}${token.absRow ? "$" : ""}${row}`;
      cursor = token.end;
    });
    return `=${out}${body.slice(cursor)}`;
  }

  /* F4 Anchor Cycling for the Reference Before the Caret */
  function cycleAnchor(text, caret) {
    if (!text.startsWith("=")) return { text, caret };
    let tokens;
    try {
      tokens = tokenize(text.slice(1));
    } catch (error) {
      return { text, caret };
    }
    const position = caret - 1;
    const token = tokens.find((t) => t.type === "ref" && position >= t.start && position <= t.end);
    if (!token) return { text, caret };
    const states = [
      [false, false],
      [true, true],
      [false, true],
      [true, false]
    ];
    const index = states.findIndex(([c, r]) => c === token.absCol && r === token.absRow);
    const [absCol, absRow] = states[(index + 1) % 4];
    const original = text.slice(1).slice(token.start, token.end);
    const sheet = original.match(/^((?:'[^']+'|[A-Za-z_][A-Za-z0-9_.]*)!)?/)[0];
    const replacement = `${sheet}${absCol ? "$" : ""}${token.col}${absRow ? "$" : ""}${token.row}`;
    const newText = `=${text.slice(1, token.start + 1)}${replacement}${text.slice(token.end + 1)}`;
    return { text: newText, caret: token.start + 1 + replacement.length };
  }

  /* Hard-Coded Number Detection for Teaching Feedback */
  function hasHardcodedNumbers(formula) {
    try {
      return tokenize(formula.slice(1)).some((t) => t.type === "num" && ![0, 1].includes(t.value));
    } catch (error) {
      return false;
    }
  }

  /* Goal Seek by Secant Search With Bisection Fallback */
  function goalSeek(workbook, target, changing, goal) {
    const read = () => toNumber(workbook.value(target.sheet, target.address));
    const original = workbook.raw(changing.sheet, changing.address);
    const f = (x) => {
      workbook.set(changing.sheet, changing.address, x);
      const v = read();
      return isError(v) ? NaN : v - goal;
    };
    let x0 = toNumber(workbook.value(changing.sheet, changing.address));
    if (isError(x0)) x0 = 0;
    let x1 = x0 === 0 ? 0.01 : x0 * 1.01;
    let f0 = f(x0);
    let f1 = f(x1);
    for (let i = 0; i < 100 && Number.isFinite(f0) && Number.isFinite(f1); i += 1) {
      if (Math.abs(f1) < 1e-10) return { ok: true, value: x1 };
      if (f1 === f0) break;
      const x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0);
      x0 = x1;
      f0 = f1;
      x1 = x2;
      f1 = f(x1);
    }
    if (Number.isFinite(f1) && Math.abs(f1) < 1e-7) return { ok: true, value: x1 };
    workbook.set(changing.sheet, changing.address, original);
    return { ok: false };
  }

  /* Two-Way Data Table by Recalculation */
  function dataTable(workbook, output, rowInput, rowValues, colInput, colValues) {
    const keepRow = workbook.raw(rowInput.sheet, rowInput.address);
    const keepCol = workbook.raw(colInput.sheet, colInput.address);
    const grid = colValues.map((cv) =>
      rowValues.map((rv) => {
        workbook.setMany([
          [rowInput.sheet, rowInput.address, rv],
          [colInput.sheet, colInput.address, cv]
        ]);
        return workbook.value(output.sheet, output.address);
      })
    );
    workbook.setMany([
      [rowInput.sheet, rowInput.address, keepRow],
      [colInput.sheet, colInput.address, keepCol]
    ]);
    return grid;
  }

  /* Parse a Typed Address Such as Inputs!B11 */
  function parseAddress(text, defaultSheet) {
    const match = /^\s*(?:(?:'([^']+)'|([A-Za-z_][A-Za-z0-9_.]*))!)?\$?([A-Za-z]{1,3})\$?(\d+)\s*$/.exec(text || "");
    if (!match) return null;
    return { sheet: match[1] || match[2] || defaultSheet, address: `${match[3].toUpperCase()}${match[4]}` };
  }

  Guide.engine = { Workbook, parse, tokenize, shiftFormula, cycleAnchor, hasHardcodedNumbers, goalSeek, dataTable, parseAddress, isError, colToNum, numToCol, toNumber };
})(window.Guide);
