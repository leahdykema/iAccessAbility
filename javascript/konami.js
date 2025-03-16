// Create and inject the popup HTML
const popupHTML = `
    <div id="konami-popup" style="display: none;">
        <p>Are you curious enough???</p>
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
        <p id="konami-message">Press Esc to close</p>
        <p id="countdown-timer"></p>
    </div>
`;
document.body.insertAdjacentHTML("beforeend", popupHTML);
// Create and inject the CSS styles
const popupStyles = document.createElement("style");
popupStyles.textContent = `
    @media (prefers-color-scheme: dark) {
        #konami-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #000;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            text-align: center;
        }
        
        .konami-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 10px 0;
        }
        
        .arrow {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #222;
            border-radius: 5px;
            font-size: 20px;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        
        .arrow.correct {
            background: #4CAF50; /* Green for correct */
            color: white;
        }
    }
    
    @media (prefers-color-scheme: light) {
        #konami-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            text-align: center;
            color: #000;
        }
        
        .konami-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 10px 0;
        }
        
        .arrow {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ddd;
            border-radius: 5px;
            font-size: 20px;
            font-weight: bold;
            transition: background 0.3s ease;
        }
        
        .arrow.correct {
            background: #4CAF50; /* Green for correct */
            color: black;
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
            let timer = setInterval(() => {
                countdown--;
                document.getElementById("countdown-timer").textContent = "Redirecting in: " + countdown;
                if (countdown === 0) {
                    clearInterval(timer);
                    window.location.href = "/html/trivia.html";
                }
            }, 1000); // 5-second delay
        }
    } else {
        // Wrong key resets the sequence
        konamiIndex = 0;
        document.querySelectorAll(".arrow").forEach(arrow => arrow.classList.remove("correct"));
    }
});

// Function to close the popup
function closePopup() {
    document.getElementById("konami-popup").style.display = "none";
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