document.addEventListener("DOMContentLoaded", function() {
    const redButton = document.getElementById("Button2");
    const yesButton = document.getElementById("Button1");
    
    redButton.addEventListener("mouseover", function() {
        const newPositionX = Math.random() * (window.innerWidth - 100); // Adjust 100 according to button width
        const newPositionY = Math.random() * (window.innerHeight - 100); // Adjust 100 according to button height

        redButton.style.position = "absolute";
        redButton.style.left = newPositionX + "px";
        redButton.style.top = newPositionY + "px";
    });

    yesButton.addEventListener("click", function() {
        const popupContainer = document.createElement("div");
        popupContainer.classList.add("popup-container");

        const popupWindow = document.createElement("div");
        popupWindow.classList.add("popup-window");

        const popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");

        const popupText = document.createElement("p");
        popupText.textContent = "I'm honored to be your Valentine!";

        const closeButton = document.createElement("button");
        closeButton.textContent = "I Love You"; // Change the text for the button
        closeButton.classList.add("close-button");

        closeButton.addEventListener("click", function() {
            popupContainer.remove();
        });

        popupContent.appendChild(popupText);
        popupContent.appendChild(closeButton);
        popupWindow.appendChild(popupContent);
        popupContainer.appendChild(popupWindow);

        document.body.appendChild(popupContainer);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const slideshowImages = [
        "https://c.tenor.com/c3JObd_M3oUAAAAC/tenor.gif",
        "https://i.giphy.com/h4heWGtseRv13VcAlU.webp",
        "https://i.giphy.com/PzeJ8dpVEWM2sSUMa0.webp",
        "https://i.giphy.com/zNq6VpmVV4ft8tksIh.webp",
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXd4bzZvNGVkNjd0Y28yMGhlOGhpeDJsemRrNXZ3cDBjdTcwOHoycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b7fjzctrcG9YWLYJW2/giphy.gif"
    ]; // Array of image URLs

    const slideshowInterval = 3000; // Interval in milliseconds (5 seconds)

    const slideshowImage = document.getElementById("slideshow-image");
    let currentImageIndex = 0;

    // Function to update the slideshow image with a fade-in effect
    function updateSlideshow() {
        slideshowImage.style.opacity = 0; // Fade out the current image
        setTimeout(() => {
            slideshowImage.src = slideshowImages[currentImageIndex];
            slideshowImage.style.opacity = 1; // Fade in the new image
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
        }, 500); // Wait for half a second before updating the image (to allow for the fade-out effect)
    }

    // Initial call to update the slideshow
    updateSlideshow();

    // Set interval to update the slideshow image every 5 seconds
    setInterval(updateSlideshow, slideshowInterval);
});

document.addEventListener("DOMContentLoaded", function() {
    const lightBlueColor = '#B0E8FF'; // Define a lighter shade of blue

    function toggleBackgroundColor() {
        const body = document.body;
        const currentColor = getComputedStyle(body).getPropertyValue('background-color');
        
        if (currentColor === 'rgb(248, 215, 220)') { // Check if current color is pink
            body.style.backgroundColor = lightBlueColor; // Set background color to light blue
        } else {
            body.style.backgroundColor = '#F8D7DC'; // Set background color back to pink
        }
    }

    setInterval(toggleBackgroundColor, 5000); // Toggle every 5 seconds
});