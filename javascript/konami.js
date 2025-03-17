document.addEventListener("DOMContentLoaded", function() {
    // Create the icon container
    const iconContainer = document.createElement("div");
    iconContainer.setAttribute("id", "konami-icon");
    iconContainer.style.position = "fixed";
    iconContainer.style.bottom = "20px";
    iconContainer.style.left = "20px";
    iconContainer.style.width = "50px";
    iconContainer.style.height = "50px";
    iconContainer.style.backgroundColor = "rgba(20, 20, 99, 0.9)";
    iconContainer.style.backdrop = "blur(2)";
    iconContainer.style.webkitBackdropFilter = "blur(2px)";
    iconContainer.style.borderRadius = "50%";
    iconContainer.style.display = "flex";
    iconContainer.style.alignItems = "center";
    iconContainer.style.justifyContent = "center";
    iconContainer.style.color = "#fff";
    iconContainer.style.fontSize = "24px";
    iconContainer.style.cursor = "pointer";
    iconContainer.style.zIndex = "1000";
    iconContainer.setAttribute("aria-label", "Try pressing the arrow up key for a hidden surprise!");
    iconContainer.innerHTML = "";
    // Create the hint bubble
    const hintBubble = document.createElement("div");
    hintBubble.setAttribute("id", "hint-bubble");
    hintBubble.style.position = "fixed";
    hintBubble.style.bottom = "20px"; // Align it to the bottom of the icon
    hintBubble.style.left = "80px"; // Position it to the left of the icon
    hintBubble.style.backgroundColor = "rgba(20, 20, 99, 0.8)";
    hintBubble.style.backdrop = "blur(2)";
    hintBubble.style.webkitBackdropFilter = "blur(2px)";
    hintBubble.style.color = "#fff";
    hintBubble.style.padding = "10px";
    hintBubble.style.fontSize = "14px";
    hintBubble.style.borderRadius = "10px";
    hintBubble.style.maxWidth = "200px";
    hintBubble.style.transform = "scaleX(0)"; // Initially hidden
    hintBubble.style.transformOrigin = "left"; // To scale from left
    hintBubble.style.transition = "transform 0.3s ease-in-out";
    hintBubble.style.zIndex = "999"; // Make sure it's above the icon
    hintBubble.style.pointerEvents = "none"; // Prevent interaction until shown
    hintBubble.innerHTML = "Some secrets are unlocked with the right combination of keys &#46;&#46;&#46; &#40;try starting with Up, Up&#41;"; // The hint text
    // Append icon and bubble to the body
    document.body.appendChild(iconContainer);
    document.body.appendChild(hintBubble);
    // Toggle the hint bubble when the icon is clicked
    iconContainer.addEventListener("click", function() {
        if (hintBubble.style.transform === "scaleX(0)") {
            hintBubble.style.transform = "scaleX(1)"; // Show the bubble with scale animation
            hintBubble.style.pointerEvents = "auto"; // Enable interaction when shown
        } else {
            hintBubble.style.transform = "scaleX(0)"; // Hide the bubble with scale animation
            hintBubble.style.pointerEvents = "none"; // Disable interaction when hidden
        }
    });
});

// Create and inject the popup HTML
const popupHTML = `
    <div id="konami-popup" style="display: none;">
        <p class="konami">Are you curious enough???</p>
        <div class="konami-container">
            <div class="arrow">↑</div>
            <div class="arrow">↑</div>
            <div class="arrow">↓</div>
            <div class="arrow">↓</div>
            <div class="arrow">←</div>
            <div class="arrow">→</div>
            <div class="arrow">←</div>
            <div class="arrow">→</div>
            <div class="arrow">B</div>
            <div class="arrow">A</div>
        </div>
        <p class="konami" id="konami-message">Press Esc to close</p>
        <p class="konami" id="countdown-timer"></p>
    </div>
`;
document.body.insertAdjacentHTML("beforeend", popupHTML);
// Create and inject the CSS styles
const popupStyles = document.createElement("style");
popupStyles.textContent = `
    @media (prefers-color-scheme: dark) {
        #konami-popup {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: #000 !important;
            padding: 20px !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
            border-radius: 10px !important;
            text-align: center !important;
            z-index: 9999 !important;
        }
        
        .konami-container {
            display: flex !important;
            justify-content: center !important;
            gap: 10px !important;
            margin: 10px 0 !important;
        }
        
        .konami {
            text-align: center !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 20px !important;
        }
        
        .arrow {
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: #222 !important;
            border-radius: 5px !important;
            font-size: 20px !important;
            font-weight: bold !important;
            transition: background 0.3s ease !important;
        }
        
        .arrow.correct {
            background: #4CAF50 !important; /* Green for correct */
            color: #fff !important;
        }
    }
    
    @media (prefers-color-scheme: light) {
        #konami-popup {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: #fff !important;
            padding: 20px !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
            border-radius: 10px !important;
            text-align: center !important;
            color: #000 !important;
            z-index: 9999 !important;
        }
        
        .konami-container {
            display: flex !important;
            justify-content: center !important;
            gap: 10px !important;
            margin: 10px 0 !important;
        }
        
        .konami {
            text-align: center !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 20px !important;
        }
        
        .arrow {
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: #ddd !important;
            border-radius: 5px !important;
            font-size: 20px !important;
            font-weight: bold !important;
            transition: background 0.3s ease !important;
        }
        
        .arrow.correct {
            background: #4CAF50 !important; /* Green for correct */
            color: #000 !important;
        }
    }
    
    @media (max-width: 1380px) {
        #konami-icon {
            display: none !important;
        }
    }
`;
document.head.appendChild(popupStyles);

// Konami Code sequence
const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
];

let timer = null;

// Show popup when the up arrow is first pressed
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && konamiIndex === 0) {
        document.getElementById("konami-popup").style.display = "block";
    }
    // Close popup on Esc key
    if (event.key === "Escape") {
        closePopup();
    }
    // Check if key matches the sequence
    if (event.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        // Highlight the corresponding arrow
        document.querySelectorAll(".arrow")[konamiIndex].classList.add("correct");
        konamiIndex++;
        // If full code is entered, display the message and start countdown
        if (konamiIndex === konamiCode.length) {
            document.getElementById("konami-message").textContent = "Konami Code Entered!";
            let countdown = 5; // Set countdown time
            document.getElementById("countdown-timer").textContent = countdown;
            // Clear any existing timer before starting a new one
            clearInterval(timer);
            timer = setInterval(() => {
                countdown--;
                document.getElementById("countdown-timer").textContent = "Redirecting in: " + countdown + " seconds...";
                if (countdown === 0) {
                    clearInterval(timer);
                    window.location.href = "/html/trivia.html";
                }
            }, 1000);
        }
    } else {
        // Wrong key resets the sequence
        konamiIndex = 0;
        document.querySelectorAll(".arrow").forEach(arrow => arrow.classList.remove("correct"));
    }
});

// Function to close the popup and cancel the timer
function closePopup() {
    document.getElementById("konami-popup").style.display = "none";
    clearInterval(timer); // Cancel countdown if running
    document.getElementById("countdown-timer").textContent = ""; // Clear the countdown text
    konamiIndex = 0; // Reset the Konami sequence
    document.querySelectorAll(".arrow").forEach(arrow => arrow.classList.remove("correct"));
}

let konamiIndex = 0; // Track progress
let konamiCodePosition = 0;

function checkKonamiCode(event) {
    // Get the key code from the event
    const key = event.keyCode || event.which;
    // Check if the key matches the next position in the Konami code sequence
    if (key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {
            // Konami Code entered correctly, take action
            window.location.href = "/index.html";
        }
    } else {
        konamiCodePosition = 0;  // Reset if the wrong key is pressed
    }
}
// Add the event listener
document.addEventListener('keydown', checkKonamiCode);
