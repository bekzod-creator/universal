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


// ==UserScript==
// @name        memefi enabler
// @namespace   Violentmonkey Scripts
// @match       https://tg-app.memefi.club/*
// @grant       none
// @version     1.4
// @author      -
// @description 9/29/2024, 9:42:40 PM
// ==/UserScript==

(function() {
    'use strict';

    // Function to click the auto turbo button after 5 seconds
    setTimeout(() => {
        const autoTurboButton = document.querySelector('.auto-turbo-btn');
        if (autoTurboButton) {
            autoTurboButton.click();
            console.log('Clicked auto turbo button'); // Debug message
        }
    }, 5000); // Wait for 5000 milliseconds (5 seconds)

    // Function to check turbo status every 10 seconds
    function checkTurboStatus() {
        const turboStatus = document.querySelector('.turbo-boost-status'); // Adjust the selector as needed
        if (turboStatus && turboStatus.textContent.includes("0/3")) {
            const button = document.querySelector('button.btn-icon._BrowserHeaderButton_m63td_65'); // Updated selector
            if (button) {
                button.click(); // Click the button if turbo boost is 0/3
                console.log('Clicked button for turbo boost 0/3'); // Debug message
                return; // Stop checking once clicked
            }
        }
        setTimeout(checkTurboStatus, 10000); // Check every 10 seconds
    }

    // Start checking turbo boost status after an initial delay of 5 seconds
    setTimeout(() => {
        checkTurboStatus(); // Start checking after 5 seconds
    }, 5000);
})();
