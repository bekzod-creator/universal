// ==UserScript==
// @name         memefi enabler
// @namespace    Violentmonkey Scripts
// @match        https://tg-app.memefi.club/*
// @match        https://web.telegram.org/k/*
// @grant        none
// @version      1.2
// @author       bekzod
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/memefi%20enabler.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/memefi%20enabler.user.js
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

        // Wait for 40 seconds before reloading the content inside the tab
        setTimeout(() => {
            const targetDiv = document.querySelector('div._tabs_1pooj_1');
            if (targetDiv) {
                // Clear existing content (if needed)
                targetDiv.innerHTML = ''; // Optionally clear existing content
                
                // You can either:
                // 1. Set new content
                targetDiv.innerHTML = '<p>Loading new content...</p>'; // Example content
                
                // 2. Or, re-fetch or initialize the original content here
                // fetchDataAndUpdate(); // Call a function to fetch new content, if you have one

                console.log('Reloaded content in the tab after 40 seconds');
            } else {
                console.log('Target div not found');
            }
        }, 40000); // Wait for 40000 milliseconds (40 seconds)

    }, 5000); // Wait for 5000 milliseconds (5 seconds)
})();
