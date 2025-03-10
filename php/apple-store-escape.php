<?php
    session_start(); // Start the session
    if (!isset($_SESSION['apple_escape_access']) || $_SESSION['apple_escape_access'] !== true) {
        header('Location: forthegeeks.php'); // Redirect if not allowed
        exit;
    }
    unset($_SESSION['apple_escape_access']); // Remove access to prevent reuse
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Escape from the Apple Store</title>
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico?">
        <link rel="apple-touch-icon" type="image/x-icon" href="img/favicon.png">
        <link rel="stylesheet" href="../stylesheets/apple-store-escape.css">
        <link rel="stylesheet" href="../navbar/navbar.css">
    </head>
    <body>
        <!-- Menu Nav Bar -->
        <div data-role="header" data-position="fixed" class="nav-container">
            <nav>
                <!-- Desktop Menu -->
                <ul class="desktop-nav">
                    <!-- logo -->
                    <li><a href="../index.html" class="link-logo"><img src="../img/logo-colored.svg" class="link-logo" alt="I access ability"></a></li>
                    <!-- Support -->
                    <li><a href="../html/support.html">Support</a></li>
                    <!-- Connect -->
                    <li><a href="../html/connect.html">Connect</a></li>
                    <!-- About -->
                    <li><a href="../html/about.html">About</a></li>
                </ul>
            </nav>
        </div>
        <!-- Apple Store Escape Page -->
        <div class="site">
            <h1>Escape from the Apple Store</h1>
            <p>You went into the Apple Store to pickup a new device, but got engrossed checking out a new device. You were so focused you didn't realize that the store was closing and when you finalky look up, tou realize that you're alone and locked inside! Now, you need to figure out how to get out.
            <div id="game-container">
                <div id="game-log"></div>
                <!-- Stage 1 Buttons -->
                <button id="askSiri" class="game-button">Ask Siri for help</button>
                <button id="easyPay" class="game-button">Check the EasyPay Devices in the back room for a way out</button>
                <button id="frontEntrance" class="game-button">Try the front entrance glass door</button>
                <!-- Stage 2 Buttons -->
                <button id="storeKey" class="game-button" style="display: none;">Look for a store key</button>
                <button id="useMac" class="game-button" style="display: none;">Try accessing a Mac to unlock the front entrance</button>
                <button id="storePhone" class="game-button" style="display: none;">Look around for a phone to call the police</button>
                <!-- Stage 3 Buttons -->
                <button id="breakGlass" class="game-button" style="display: none;">Break the Glass</button>
                <button id="triggerAlarm" class="game-button" style="display: none;">Trigger the Alarm</button>
                <!-- Stage 4 Buttons -->
                <button id="ceilingVent" class="game-button" style="display: none;">Attempt a classic movie escape</button>
                <button id="dj" class="game-button" style="display: none;">Have fun</button>
                <button id="callCook" class="game-button" style="display: none;">Contact Tim Cook</button>
                <button id="resetGame" class="game-button" style="display: none;">Restart Game</button>
                <button id="backButton" class="game-button" style="display: none;">Go Back to the Geeks Page</button>
            </div>
        </div>
        <script src="../javascript/apple-store-escape.js"></script>
    </body>
</html>
