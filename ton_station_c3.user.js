// ==UserScript==
// @name         Toncha Moncha Webcha Calimcha
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  zoderman
// @author       zoderman
// @match        https://tonstation.app/app/*
// @match        https://web.telegram.org/k/*
// @downloadURL  https://raw.githubusercontent.com/bekzod-creator/universal/main/ton_station_c3.user.js
// @updateURL    https://raw.githubusercontent.com/bekzod-creator/universal/main/ton_station_c3.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to find and click the "Claim" button
    function clickClaimButton() {
        const claimButton = document.querySelector('button[class*="animate-one-pulse"]'); // Adjust selector if needed
        if (claimButton) {
            console.log("Claim button found. Clicking...");
            claimButton.click();

            // After clicking "Claim", try to click "Start farming"
            setTimeout(clickStartFarmingButton, 2000); // Adjust delay as needed
        } else {
            console.log("Claim button not found. Trying to find 'Start farming'...");
            clickStartFarmingButton();
        }
    }

    // Function to find and click the "Start farming" button
    function clickStartFarmingButton() {
        const startFarmingButton = document.querySelector('button.z-0.group.relative.inline-flex.items-center.justify-center'); // Adjust selector if needed
        if (startFarmingButton) {
            console.log("Start farming button found. Clicking...");
            startFarmingButton.click();

            // After clicking "Start farming", loop back to "Claim" after a delay
            setTimeout(clickClaimButton, 5000); // Adjust delay as needed
        } else {
            console.log("Start farming button not found. Trying to find 'Claim'...");
            setTimeout(clickClaimButton, 2000); // Retry after a short delay
        }
    }

    // Observe DOM changes and try to click buttons when they appear
    const observer = new MutationObserver(() => {
        clickClaimButton();
    });

    const observerConfig = { childList: true, subtree: true };
    observer.observe(document.body, observerConfig);

    // Start the process after the DOM is fully loaded
    window.addEventListener('load', clickClaimButton);
})();
