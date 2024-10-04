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
        }
    }, 5000); // Wait for 5000 milliseconds (5 seconds)

    // Function to check turbo status every 10 seconds
    function checkTurboStatus() {
        const turboStatus = document.querySelector('.turbo-boost-status'); // Adjust the selector as needed
        if (turboStatus && turboStatus.textContent.includes("0/3")) {
            // Simulate pressing Alt + Left Arrow key
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowLeft',
                code: 'ArrowLeft',
                altKey: true,
                bubbles: true
            });
            document.dispatchEvent(event);
            console.log('Simulated Alt + Left Arrow key'); // Debug message
            return; // Stop checking once the event is dispatched
        }
        setTimeout(checkTurboStatus, 10000); // Check every 10 seconds
    }

    // Start checking turbo boost status after an initial delay of 5 seconds
    setTimeout(() => {
        checkTurboStatus(); // Start checking after 5 seconds
    }, 5000);
})();
