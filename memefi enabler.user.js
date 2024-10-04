// ==UserScript==
// @name         memefi enabler
// @namespace    Violentmonkey Scripts
// @match        https://tg-app.memefi.club/*
// @grant        none
// @version      1.2
// @author       bekzod
// @downloadURL  https://raw.githubusercontent.com/bekzod-creator/universal/refs/heads/main/memefi%20enabler.user.js
// @updateURL    https://raw.githubusercontent.com/bekzod-creator/universal/refs/heads/main/memefi%20enabler.user.js
// @description  f you
// ==/UserScript==

(function() {
    'use strict';

    // Original function to click the button after 5 seconds
    setTimeout(() => {
        const button = document.querySelector('.auto-turbo-btn');
        if (button) {
            button.click();
        }
    }, 5000); // Wait for 5000 milliseconds (5 seconds)

    // Function to check turbo status every 10 seconds
    function checkTurboStatus() {
        const turboStatus = document.querySelector('.turbo-boost-status'); // Adjust the selector as needed
        if (turboStatus && turboStatus.textContent.includes("0/3")) {
            const button = document.querySelector('.btn-icon._BrowserHeaderButton_m63td_65');
            if (button) {
                button.click(); // Click the button if turbo boost is 0/3
                return; // Stop checking once clicked
            }
        }
        setTimeout(checkTurboStatus, 10000); // Check every 10 seconds
    }

    // Start checking turbo boost status after an initial delay of 5 seconds
    setTimeout(checkTurboStatus, 5000);
})();
