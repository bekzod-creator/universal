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

    // Function to click the auto turbo button after 5 seconds
    setTimeout(() => {
        const autoTurboButton = document.querySelector('.auto-turbo-btn');
        if (autoTurboButton) {
            autoTurboButton.click();
            console.log('Clicked auto turbo button'); // Debug message

            // Wait for 10 seconds before simulating Alt + Left Arrow key
            setTimeout(() => {
                const event = new KeyboardEvent('keydown', {
                    key: 'ArrowLeft',
                    code: 'ArrowLeft',
                    altKey: true,
                    bubbles: true
                });
                document.dispatchEvent(event);
                console.log('Simulated Alt + Left Arrow key'); // Debug message
            }, 10000); // Wait for 10000 milliseconds (10 seconds)
        }
    }, 5000); // Wait for 5000 milliseconds (5 seconds)
})();
