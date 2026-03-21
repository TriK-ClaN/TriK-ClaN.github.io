// =============================================
// Persistent Cross-Page Audio Player
// =============================================

(function () {

    const AUDIO_SRC  = "./img/still-standing.mp3";
    const VOLUME     = 0.05;
    const STORAGE_KEY = "audioCurrentTime";

    const audio = new Audio(AUDIO_SRC);
    audio.volume = VOLUME;
    audio.loop   = true;

    // Resume From Saved Timestamp (If Navigating From Another Page)
    const savedTime = sessionStorage.getItem(STORAGE_KEY);
    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Attempt Immediate Autoplay
    function tryPlay() {
        audio.play().catch(function () {
            // Autoplay blocked — play on first user interaction
            document.addEventListener("click", function handler() {
                audio.play();
                document.removeEventListener("click", handler);
            }, { once: true });
        });
    }

    // Save Playback Position Before Leaving Page
    window.addEventListener("beforeunload", function () {
        sessionStorage.setItem(STORAGE_KEY, audio.currentTime);
    });

    // Start Playing
    if (document.readyState === "complete") {
        tryPlay();
    } else {
        window.addEventListener("load", tryPlay);
    }

})();
