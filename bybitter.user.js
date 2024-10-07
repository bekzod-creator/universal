// ==UserScript==
// @name         Patch Bybit Coinsweeper
// @namespace    Violentmonkey Scripts
// @match        *://bybitcoinsweeper.com/*
// @grant        none
// @version      0.1
// @author       zoder
// @icon         https://mudachyo.codes/bybit/logo.jpg
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/bybitter.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/bybitter.user.js
// ==/UserScript==

(function() {
    'use strict';

    function clickPlayAgain() {
        // Try to find the "Play Again" button
        let playButton = document.querySelector('button.btn.primary-btn');

        if (playButton && playButton.textContent.trim() === 'Play Again') {
            // Button found, click it
            console.log("Found 'Play Again' button, clicking...");
            playButton.click();
        } else {
            // Button not found, retry after 10 seconds
            console.log("'Play Again' button not found, retrying in 10 seconds...");
            setTimeout(clickPlayAgain, 10000); // Retry after 10 seconds
        }
    }

    // Start the checking process
    clickPlayAgain();
})();
