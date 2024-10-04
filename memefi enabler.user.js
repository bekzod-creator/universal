// ==UserScript==
// @name         memefi enabler
// @namespace    Violentmonkey Scripts
// @match        https://tg-app.memefi.club/*
// @match        https://web.telegram.org/k/*
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
// @version     1.7
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

        // Wait for 40 seconds before reloading the page
        setTimeout(() => {
            console.log('Reloading the page in 40 seconds...');
            location.reload(); // Reload the page
        }, 40000); // Wait for 40000 milliseconds (40 seconds)

    }, 5000); // Wait for 5000 milliseconds (5 seconds)
})();
