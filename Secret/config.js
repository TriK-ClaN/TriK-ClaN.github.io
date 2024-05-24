var config = {
	/** Document Title */
	documentTitle : "Secret",
	/** Stage Width */
	stageW : 800,
	/** Stage Height */
	stageH : 480,
	/** # of Grid Columns */ 
	col : 40,
	/** # of Grid Rows */ 
	row : 24,
	/** # of Particles Emitted */
	emitterNum : 20,

	/** Preface */
	preface : [
		"Tap to anywhere on the screen.",
		"Do you feel the curiosity eating away at you?",
		"Keep tapping until you reveal the secret message!"
	],
	prefaceFontSize : 20,

	/* Particle Colors */
	colorList : [
		"#990000",
		"#FF0000",
		"#CC3300",
		"#CC6600",
		"#CC0033",
		"#FFFF00",
		"#33FF00",
		"#33CC00",
		"#0066FF",
		"#00FF99",
		"#770099"
	],

	// I ♥ U
	matrix: [
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, true, true, true, false, false, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false, true, true, false, true, false, true, true, false, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true, false, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, false, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, false, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, false, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true],
		[true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, false, true, false, true, true, true, true, true, true, true, true, false, true, true, true, true, true, false, true, true, true],
		[true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
		[true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
	]
};