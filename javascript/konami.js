(function() {
    // Konami Code Logic
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiIndex = 0;
    let timer = null;
    let isTouchDevice = false;
    function createElements() {
        // Icon
        const iconContainer = document.createElement("div");
        iconContainer.id = "konami-icon";
        iconContainer.setAttribute("aria-label", "Try pressing the arrow up key for a hidden surprise!");
        iconContainer.innerHTML = "";
        // Hint Bubble
        const hintBubble = document.createElement("div");
        hintBubble.id = "hint-bubble";
        hintBubble.innerHTML = "Some secrets are unlocked with the right combination of keys... (try starting with Up, Up)</p>";
        // Popup
        const popup = document.createElement("div");
        popup.id = "konami-popup";
        popup.style.display = "none"; // Start hidden
        popup.innerHTML = `
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
        `;
        // Touch Controller
        const controller = document.createElement("div");
        controller.id = "touch-controller";
        controller.style.display = "none"; // Start hidden
        controller.innerHTML = `
            <div class="button" data-key="ArrowUp">↑</div>
            <div class="button" data-key="ArrowDown">↓</div>
            <div class="button" data-key="ArrowLeft">←</div>
            <div class="button" data-key="ArrowRight">→</div>
            <div class="button" data-key="a">A</div>
            <div class="button" data-key="b">B</div>
            <div class="button" data-key="x">X</div>
            <div class="button" data-key="y">Y</div>
        `;
        // Append elements to body
        document.body.appendChild(iconContainer);
        document.body.appendChild(hintBubble);
        document.body.appendChild(popup);
        document.body.appendChild(controller);
        return {
            iconContainer,
            hintBubble,
            popup,
            controller
        };
        // Return element references for event listeners
    }
    // Add CSS Styles Dynamically
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (prefers-color-scheme: dark) {
                #konami-popup {
                    /* Dark mode styles */
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
                    color: white !important;
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
                    font-weight: bold;
                    transition: background 0.3s ease !important;
                }

                .arrow.correct {
                    background: #4CAF50 !important; /* Green for correct */
                    color: #fff !important;
                }

                #touch-controller {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    z-index: 1001;
                }

                .button {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #222;
                    color: white;
                    border-radius: 50%;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .button:hover {
                    background: #4CAF50;
                }
            }

            @media (prefers-color-scheme: light) {
                #konami-popup {
                    /* Light mode styles */
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
                    font-weight: bold;
                    transition: background 0.3s ease !important;
                }

                .arrow.correct {
                    background: #4CAF50 !important; /* Green for correct */
                    color: #000 !important;
                }

                #touch-controller {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    z-index: 1001;
                }

                .button {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #222;
                    color: white;
                    border-radius: 50%;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .button:hover,
                .button:focus {
                    background: #4CAF50;
                }
                
                .button:active {
                    background: #388E3C;
                }
            }
            
            @media (max-width) {
                #konami-container {
                    width: 90%;
                }
            }
            
            /* Add styles for the icon and hint bubble here, including responsiveness */
            #konami-icon {
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 50px;
                height: 50px;
                background-color: rgba(20, 20, 99, 0.9);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 24px;
                cursor: pointer;
                z-index: 1000;
            }

            #hint-bubble {
                position: fixed;
                bottom: 20px;
                left: 80px;
                background-color: rgba(20, 20, 99, 0.8);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                color: #fff;
                padding: 10px;
                font-size: 14px;
                border-radius: 10px;
                max-width: 200px;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.3s ease-in-out;
                z-index: 999;
                pointer-events: none;
            }
            
            #touch-controller {
                display: ${isTouchDevice ? 'flex' : 'none'}; /* Hide on desktop */
            }
        `;
        document.head.appendChild(style);
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        // Check for touch support on initial load
        window.addEventListener('touchstart', function onFirstTouch() {
            isTouchDevice = true;
            addStyles(); // call add styles here to change after touch start
            window.removeEventListener('touchstart', onFirstTouch, false); // Remove the event listener after detecting the first touch
        }, false);
        addStyles();
        const { iconContainer, hintBubble, popup, controller } = createElements(); // Destructure returned elements
        const konamiMessage = popup.querySelector("#konami-message"); // Access elements within the popup
        const countdownTimer = popup.querySelector("#countdown-timer");
        const arrows = popup.querySelectorAll(".arrow");
        // Toggle Popup and Controller visibility
        function toggleDisplay(event) {
            event.preventDefault();
            if (isTouchDevice) {
                popup.style.display = (popup.style.display === "block") ? "none" : "block";
                controller.style.display = (controller.style.display === "flex") ? "none" : "flex";
                hintBubble.style.display = "none";
            } else {
                if (hintBubble.style.transform === "scaleX(0)") {
                    hintBubble.style.transform = "scaleX(1)";
                    hintBubble.style.pointerEvents = "auto";
                } else {
                    hintBubble.style.transform = "scaleX(0)";
                    hintBubble.style.pointerEvents = "none";
                }
                popup.style.display = "none"; // Hide the popup
                controller.style.display = "none"; // Hide the popup
                hintBubble.style.display = "block";
            }
        }
        // Event listener for icon to toggle popup
        iconContainer.addEventListener("click", toggleDisplay);
        iconContainer.addEventListener("touchstart", toggleDisplay);
        // Event listener for Konami Message to dismiss Popup
        konamiMessage.addEventListener("click", closePopup);
        // Function to reset Konami Code
        function resetKonamiCode() {
            konamiIndex = 0;
            arrows.forEach(arrow => arrow.classList.remove("correct"));
        }
        // Countdown function
        function startCountdown() {
            let countdown = 5;
            countdownTimer.textContent = countdown;
            clearInterval(timer); // Clear any previous timer
            timer = setInterval(() => {
                countdown--;
                countdownTimer.textContent = "Redirecting in: " + countdown + " seconds...";
                if (countdown === 0) {
                    clearInterval(timer);
                    window.location.href = "/html/trivia.html";
                }
            }, 1000);
        }
        // Close Popup function
        function closePopup() {
            popup.style.display = "none";
            controller.style.display = "none";
            resetKonamiCode();
            clearInterval(timer);
            countdownTimer.textContent = "";
        }
        // Check Konami Code function
        function checkKonamiCode(key) {
            if (key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
                arrows[konamiIndex].classList.add("correct");
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    konamiMessage.textContent = "Konami Code Entered!";
                    startCountdown();
                }
            } else {
                resetKonamiCode();
            }
        }
        // Keydown event listener for keyboard input
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closePopup();
                return;
            }
            if (popup.style.display !== "block" && konamiIndex === 0 && event.key === "ArrowUp") {
                popup.style.display = "block"; // Show the popup
                controller.style.display = popup.style.display;
            }
            checkKonamiCode(event.key);
        });
        // Event listeners for touch controller buttons
        const buttons = controller.querySelectorAll(".button");
        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const key = this.dataset.key;
                checkKonamiCode(key);
            });
        });
    });
})();
