// =============================================
// Love Birds — Lottie Flying Animation System
// Uses animationData instead of path to work
// correctly under the file:// protocol
// =============================================

(function () {

    const BIRD_COUNT = 3;

    // =============================================
    // Wait For Lottie CDN Script To Be Ready
    // =============================================
    function waitForLottie(cb) {
        if (typeof lottie !== "undefined") {
            cb();
        } else {
            setTimeout(function () { waitForLottie(cb); }, 80);
        }
    }

    // =============================================
    // Wait For Embedded JSON Variable To Be Ready
    // =============================================
    function waitForJSON(cb) {
        if (typeof LOVE_BIRDS_JSON !== "undefined") {
            cb();
        } else {
            setTimeout(function () { waitForJSON(cb); }, 80);
        }
    }

    // =============================================
    // Initialize Once Both Are Ready
    // =============================================
    function start() {
        waitForLottie(function () {
            waitForJSON(function () {
                init();
            });
        });
    }

    // =============================================
    // Core Bird System
    // =============================================
    function init() {
        var container = document.getElementById("birds-container");
        if (!container) return;

        var birds = [];

        // =========================================
        // Create One Bird
        // =========================================
        function createBird(index) {
            var scale  = 0.5 + Math.random() * 0.4;
            var width  = Math.round(350 * scale);
            var height = Math.round(300 * scale);

            var el                  = document.createElement("div");
            el.style.position       = "absolute";
            el.style.width          = width  + "px";
            el.style.height         = height + "px";
            el.style.opacity        = "0";
            el.style.pointerEvents  = "none";
            el.style.left           = "-9999px";
            el.style.top            = "-9999px";
            container.appendChild(el);

            // Use animationData — no fetch, works on file://
            var anim = lottie.loadAnimation({
                container:     el,
                renderer:      "svg",
                loop:          true,
                autoplay:      true,
                animationData: JSON.parse(JSON.stringify(LOVE_BIRDS_JSON))
            });
            anim.setSpeed(0.75 + Math.random() * 0.5);

            birds.push({
                el:            el,
                w:             width,
                h:             height,
                x:             -9999,
                y:             -9999,
                vx:            0,
                vy:            0,
                opacity:       0,
                phase:         "waiting",
                floatTimer:    0,
                floatDuration: 0,
                entryDelay:    800 + index * 2800
            });
        }

        // =========================================
        // Launch Bird From A Random Screen Edge
        // =========================================
        function launchBird(bird) {
            var W     = window.innerWidth;
            var H     = window.innerHeight;
            var edge  = Math.floor(Math.random() * 4);
            var speed = 0.45 + Math.random() * 0.5;

            if (edge === 0) {
                bird.x = -(bird.w + 40);
                bird.y = H * 0.12 + Math.random() * (H * 0.76);
                bird.vx =  speed;
                bird.vy = (Math.random() - 0.5) * 0.3;
            } else if (edge === 1) {
                bird.x = W + 40;
                bird.y = H * 0.12 + Math.random() * (H * 0.76);
                bird.vx = -speed;
                bird.vy = (Math.random() - 0.5) * 0.3;
            } else if (edge === 2) {
                bird.x = W * 0.1 + Math.random() * (W * 0.8);
                bird.y = -(bird.h + 40);
                bird.vx = (Math.random() - 0.5) * 0.3;
                bird.vy =  speed;
            } else {
                bird.x = W * 0.1 + Math.random() * (W * 0.8);
                bird.y = H + 40;
                bird.vx = (Math.random() - 0.5) * 0.3;
                bird.vy = -speed;
            }

            bird.opacity = 0;
            bird.phase   = "enter";
            applyBird(bird);
        }

        // =========================================
        // Apply State To DOM
        // =========================================
        function applyBird(bird) {
            bird.el.style.opacity = bird.opacity.toFixed(3);
            bird.el.style.left    = Math.round(bird.x) + "px";
            bird.el.style.top     = Math.round(bird.y) + "px";
        }

        // =========================================
        // Boundary Helpers
        // =========================================
        function isComfortablyOnScreen(bird) {
            var W = window.innerWidth, H = window.innerHeight;
            return bird.x > W * 0.06 && bird.x < W * 0.86 &&
                   bird.y > H * 0.06 && bird.y < H * 0.86;
        }

        function isOffScreen(bird) {
            var W = window.innerWidth, H = window.innerHeight;
            var m = Math.max(bird.w, bird.h) + 100;
            return bird.x < -m || bird.x > W + m ||
                   bird.y < -m || bird.y > H + m;
        }

        // =========================================
        // Animation Loop
        // =========================================
        var last = null;

        function tick(now) {
            if (!last) last = now;
            var dt = Math.min(now - last, 50);
            last = now;

            for (var i = 0; i < birds.length; i++) {
                var bird = birds[i];

                if (bird.phase === "waiting") {
                    bird.entryDelay -= dt;
                    if (bird.entryDelay <= 0) launchBird(bird);
                    continue;
                }

                if (bird.phase === "enter") {
                    bird.x += bird.vx * dt;
                    bird.y += bird.vy * dt;
                    if (bird.x > -bird.w && bird.x < window.innerWidth &&
                        bird.y > -bird.h && bird.y < window.innerHeight) {
                        bird.opacity = Math.min(1, bird.opacity + dt * 0.003);
                    }
                    if (isComfortablyOnScreen(bird)) {
                        bird.phase         = "float";
                        bird.floatDuration = 5000 + Math.random() * 6000;
                        bird.floatTimer    = 0;
                        bird.vx = (Math.random() - 0.5) * 0.2;
                        bird.vy = (Math.random() - 0.5) * 0.15;
                    }

                } else if (bird.phase === "float") {
                    bird.x += bird.vx * dt;
                    bird.y += bird.vy * dt;
                    bird.floatTimer += dt;
                    bird.opacity = Math.min(1, bird.opacity + dt * 0.004);

                    // Soft edge bounce
                    var W = window.innerWidth, H = window.innerHeight;
                    var pad = 55;
                    if (bird.x < pad)              { bird.vx =  Math.abs(bird.vx); }
                    if (bird.x > W - bird.w - pad) { bird.vx = -Math.abs(bird.vx); }
                    if (bird.y < pad)              { bird.vy =  Math.abs(bird.vy); }
                    if (bird.y > H - bird.h - pad) { bird.vy = -Math.abs(bird.vy); }

                    // Random gentle nudge
                    if (Math.random() < 0.007) {
                        bird.vx += (Math.random() - 0.5) * 0.1;
                        bird.vy += (Math.random() - 0.5) * 0.08;
                        var spd = Math.sqrt(bird.vx * bird.vx + bird.vy * bird.vy);
                        if (spd > 0.35) {
                            bird.vx = bird.vx / spd * 0.35;
                            bird.vy = bird.vy / spd * 0.35;
                        }
                    }

                    if (bird.floatTimer >= bird.floatDuration) {
                        bird.phase = "exit";
                        var exitSpeed = 0.6 + Math.random() * 0.55;
                        var angle     = Math.random() * Math.PI * 2;
                        bird.vx = Math.cos(angle) * exitSpeed;
                        bird.vy = Math.sin(angle) * exitSpeed;
                    }

                } else if (bird.phase === "exit") {
                    bird.x += bird.vx * dt;
                    bird.y += bird.vy * dt;
                    bird.opacity = Math.max(0, bird.opacity - dt * 0.002);

                    if (isOffScreen(bird)) {
                        bird.phase            = "waiting";
                        bird.opacity          = 0;
                        bird.el.style.opacity = "0";
                        bird.el.style.left    = "-9999px";
                        bird.el.style.top     = "-9999px";
                        bird.entryDelay       = 1500 + Math.random() * 4000;
                        continue;
                    }
                }

                applyBird(bird);
            }

            requestAnimationFrame(tick);
        }

        // =========================================
        // Spawn Birds & Begin Loop
        // =========================================
        for (var i = 0; i < BIRD_COUNT; i++) {
            createBird(i);
        }
        requestAnimationFrame(tick);
    }

    // Run On DOM Ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }

})();