document.addEventListener("DOMContentLoaded", () => {
    let gameState = {
        stage: 1,
        hasEasyPayAccess: false,
        hasFoundExit: false,
        siriHelped: false
    };

    function logMessage(message) {
        const log = document.getElementById("game-log");
        log.innerHTML += `<p>${message}</p>`;
        log.scrollTop = log.scrollHeight;
    }

    function showStageOptions() {
        document.querySelectorAll(".game-button").forEach(button => button.style.display = "none");

        if (gameState.stage === 1) {
            document.getElementById("easyPay").style.display = "block";
            document.getElementById("askSiri").style.display = "block";
            document.getElementById("hackEasyPay").style.display = "block";
        } else if (gameState.stage === 2) {
            document.getElementById("findExit").style.display = "block";
            document.getElementById("useMac").style.display = "block";
            document.getElementById("searchGeniusBar").style.display = "block";
        } else if (gameState.stage === 3) {
            document.getElementById("finalUnlock").style.display = "block";
            document.getElementById("breakGlass").style.display = "block";
            document.getElementById("triggerAlarm").style.display = "block";
        } else {
            document.querySelectorAll(".game-button").forEach(button => button.remove());
        }
    }

    function progressStage(newStage) {
        gameState.stage = newStage;
        showStageOptions();
    }

    function checkEasyPay() {
        logMessage("You found an employee iPhone, but it's Face ID locked! You need another way...");
        progressStage(2);
    }

    function askSiri() {
        logMessage("You ask Siri for help... She says 'I’m sorry, I can’t help with that.' Typical.");
        progressStage(2);
    }

    function hackEasyPay() {
        logMessage("You bypass Face ID and unlock EasyPay! Now find the exit.");
        gameState.hasEasyPayAccess = true;
        progressStage(2);
    }

    function findExit() {
        logMessage("The doors are locked! Maybe there's another way?");
        progressStage(3);
    }

    function useMac() {
        logMessage("You attempt to use a Mac to access security... it's updating.");
        progressStage(3);
    }

    function searchGeniusBar() {
        logMessage("You find a hidden security key! Maybe this will help.");
        gameState.hasFoundExit = true;
        progressStage(3);
    }

    function finalUnlock() {
        if (gameState.hasFoundExit) {
            logMessage("You use the security key to unlock the store and escape! You win!");
        } else {
            logMessage("You need a security key! Maybe check the Genius Bar?");
        }
        progressStage(4);
    }

    function breakGlass() {
        logMessage("You try to break the glass, but it's Apple Store glass... impossible.");
        progressStage(4);
    }

    function triggerAlarm() {
        logMessage("You trigger the fire alarm! The doors unlock and you escape! But at what cost?");
        progressStage(4);
    }

    document.getElementById("easyPay").addEventListener("click", checkEasyPay);
    document.getElementById("askSiri").addEventListener("click", askSiri);
    document.getElementById("hackEasyPay").addEventListener("click", hackEasyPay);
    document.getElementById("findExit").addEventListener("click", findExit);
    document.getElementById("useMac").addEventListener("click", useMac);
    document.getElementById("searchGeniusBar").addEventListener("click", searchGeniusBar);
    document.getElementById("finalUnlock").addEventListener("click", finalUnlock);
    document.getElementById("breakGlass").addEventListener("click", breakGlass);
    document.getElementById("triggerAlarm").addEventListener("click", triggerAlarm);

    showStageOptions();
});