document.addEventListener("DOMContentLoaded", function () {
    const shootingStarsContainer = document.querySelector(".shooting-stars-container");
    const twinklingStarsContainer = document.querySelector(".twinkling-stars-container");
  
    const numShootingStars = 6; // Adjust the number of shooting stars
    const numTwinklingStars = 30; // Adjust the number of twinkling stars
  
    // Create shooting stars
    for (let i = 0; i < numShootingStars; i++) {
        const shootingStar = document.createElement("div");
        shootingStar.className = "shooting-star";
        shootingStarsContainer.appendChild(shootingStar);
    
        const delay = Math.random() * 10; // Random delay for each shooting star
        const duration = Math.random() * 2 + 2; // Random duration for each shooting star
        let randomTopStart = 0;
        let randomTopEnd = 0;

        // Evenly distribute shooting stars across top, middle, and bottom
        if (i < numShootingStars / 3) {
            randomTopStart = Math.random() * 33.33; // Top third
            randomTopEnd = Math.random() * 33.33;
        } else if (i < 2 * numShootingStars / 3) {
            randomTopStart = Math.random() * 33.33 + 33.33; // Middle third
            randomTopEnd = Math.random() * 33.33 + 33.33;
        } else {
            randomTopStart = Math.random() * 33.33 + 66.66; // Bottom third
            randomTopEnd = Math.random() * 33.33 + 66.66;
        }

        shootingStar.style.left = `0%`; // Start from the left edge of the screen
        shootingStar.style.top = `${randomTopStart}%`; // Set random vertical start position
        shootingStar.style.animationDelay = `${delay}s`;
        shootingStar.style.animationDuration = `${duration}s`;
        shootingStar.style.setProperty("--randomTopEnd", `${randomTopEnd}%`); // Pass the end position to CSS
    }
  
    // Create twinkling stars
    for (let i = 0; i < numTwinklingStars; i++) {
      const twinklingStar = document.createElement("div");
      twinklingStar.className = "twinkling-star";
      twinklingStarsContainer.appendChild(twinklingStar);
  
      const delay = Math.random() * 10; // Random delay for each twinkling star
      const duration = Math.random() * 5 + 2; // Random duration for each twinkling star
  
      twinklingStar.style.left = `${Math.random() * 100}%`;
      twinklingStar.style.top = `${Math.random() * 100}%`;
      twinklingStar.style.animationDelay = `${delay}s`;
      twinklingStar.style.animationDuration = `${duration}s`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const flowersButton = document.getElementById("flowersButton");
    flowersButton.addEventListener("click", function() {
      window.location.href = "Flowers/index.html";
    });
  });

document.addEventListener("DOMContentLoaded", function() {
    const cardButton = document.getElementById("cardButton");
    cardButton.addEventListener("click", function() {
      window.location.href = "Card/index.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const secretButton = document.getElementById("secretButton");
    secretButton.addEventListener("click", function() {
      window.location.href = "Secret/index.html";
    });
});  