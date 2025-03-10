document.addEventListener("DOMContentLoaded", () => {
    let gameState = {
        stage: 1
    };
    
    function logMessage(message) {
        const log = document.getElementById("game-log");
        log.innerHTML += `<p>${message}</p>`;
        log.scrollTop = log.scrollHeight;
    }
    
    function showStageOptions() {
        document.querySelectorAll(".game-button").forEach(button => button.style.display = "none");
        if (gameState.stage === 1) {
            document.getElementById("askSiri").style.display = "block";
            document.getElementById("easyPay").style.display = "block";
            document.getElementById("frontEntrance").style.display = "block";
        } else if (gameState.stage === 2) {
            document.getElementById("storeKey").style.display = "block";
            document.getElementById("useMac").style.display = "block";
            document.getElementById("storePhone").style.display = "block";
        } else if (gameState.stage === 3) {
            document.getElementById("breakGlass").style.display = "block";
            document.getElementById("backDoor").style.display = "block";
            document.getElementById("frontDoor").style.display = "block";
        } else if (gameState.stage === 4) {
            document.getElementById("ceilingVent").style.display = "block";
            document.getElementById("dj").style.display = "block";
            document.getElementById("callCook").style.display = "block";
        } else if (gameState.stage === 5 || gameState.stage === 6) {
            // Remove buttons when game ends
            document.querySelectorAll(".game-button").forEach(button => button.style.display = "none");
        }
    }
    
    function progressStage(stage) {
        gameState.stage = stage;
        showStageOptions();
        if (stage === 5) {
            logMessage("Oh no! You've been caught or failed to escape! Try again?");
            document.getElementById("resetGame").style.display = "block";
        } else if (stage === 6) {
            logMessage("Congratulations! You've successfully escaped the Apple Store! Maybe next time, watch the time closer so you don’t stay past closing :)");
           document.getElementById("resetGame").style.display = "block";
            document.getElementById("backButton").style.display = "block";
        }
    }
    
    function restartGame() {
        gameState.stage = 1;
        document.getElementById("resetGame").style.display = "none";
        document.getElementById("game-log").innerHTML = "";
        logMessage("You're back in the Apple Store... Let's try this again!");
        showStageOptions();
    }
    
    // stage 1
    function askSiri() {
        logMessage("You ask Siri for help... She says 'I’m sorry, I can’t help with that.' Typical.");
        progressStage(2);
    }
    
    function easyPay() {
        logMessage("You find the EasyPay iPhones in the back charging and pick one up. When you turn it on, you find it locked and requesting an employee Apple Account to sign in, but while you're considering your next options, an alarm goes off!");
        progressStage(5);
    }
    
    function frontEntrance() {
        logMessage("You walk up to the entrance doors and pull on the handle, but it doesn't budge. You try pushing it and the door rattles but stays firmly shut.");
        gameState.hasEasyPayAccess = true;
        progressStage(2);
    }
    
    // stage 2
    function storeKey() {
        logMessage("You head into the back and start looking for a store key to unlock a door. After looking around for a while, you find a key!");
        progressStage(3);
    }
    
    function useMac() {
        logMessage("You look around and decide to try using a display Mac to find a way to unlock the front entrance or the location of a key.");
        progressStage(5);
    }
    
    function storePhone() {
        logMessage("You decide to look around for a an active store phone. You find one behind the Genius Bar counter and call the police to explain your situation and ask for help!");
        gameState.hasFoundExit = true;
        progressStage(6);
    }
    
    // stage 3
    function breakGlass() {
        logMessage("You try to break the glass, but since it's the Apple Store, it doesn't even crack when you run into it.  You try using various tools and objects you find around the store and in the back and manage to shatter the glass, but as soon as it shatters, the security alarm goes off and a security gate drops down in front of the entrance, trapping you inside and soon found by the security guard.");
        progressStage(5);
    }
    
    function backDoor() {
        logMessage("You try unlocking the back door, but the key doesn't turn.");
        progressStage(4);
    }
    
    function frontDoor() {
        logMessage("You try unlocking the front entrance door and this time, the key turns and unlocks! You're free! After returning the key to where you found it, you leave happily.");
        progressStage(6);
    }
    
    // stage 4
    function ceilingVent() {
        logMessage("You manage to climb up onto a store table and manage to reach the ceiling where you push up a tile and pull yourself into the vents, but because the tiles are thin and you are too heavy for them to hold, you break through the ceiling and fall back into the store where a security guard soon appears and finds you.");
        progressStage(5);
    }
    
    function dj() {
        logMessage("You decide to kill some time and manage to connect the store speakers over the intercom you find behind the counter of the Genius Bar and start rapping one of your favorite songs. Soon, a security guard appears and after explaining your situation, he lets you out!");
        progressStage(6);
    }
    
    function callCook() {
        logMessage("You pick up a display iPhone, hoping it doesn't trigger an alarm, it doesn't thank goodness! You sign into your Twitter account and tweet Tim Cook in desperation, but don't expect him to respond. Before long, an Apple employee unlocks the front entrance and enters. He lets you out after handing you an Apple Gift card of $1,000 and explaining that Tim Cook had contacted him about you!");
        progressStage(6);
    }
    
    document.getElementById("easyPay").addEventListener("click", easyPay);
    document.getElementById("askSiri").addEventListener("click", askSiri);
    document.getElementById("frontEntrance").addEventListener("click", frontEntrance);
    document.getElementById("storeKey").addEventListener("click", storeKey);
    document.getElementById("useMac").addEventListener("click", useMac);
    document.getElementById("storePhone").addEventListener("click", storePhone);
    document.getElementById("breakGlass").addEventListener("click", breakGlass);
    document.getElementById("backDoor").addEventListener("click", backDoor);
    document.getElementById("frontDoor").addEventListener("click", frontDoor);
    document.getElementById("ceilingVent").addEventListener("click", ceilingVent);
    document.getElementById("dj").addEventListener("click", dj);
    document.getElementById("callCook").addEventListener("click", callCook);
    document.getElementById("resetGame").addEventListener("click", restartGame);
    document.getElementById("backButton").addEventListener("click", () => {
        window.location.href = "forthegeeks.html";
    });
    
    showStageOptions();
});
