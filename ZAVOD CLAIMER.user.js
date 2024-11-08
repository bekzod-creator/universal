// ==UserScript==
// @name        zaavood auto
// @namespace   zoderman scriptsc
// @match       https://zavod.mdaowallet.com/*
// @grant       none
// @version     1.0
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/ZAVOD%20CLAIMER.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/ZAVOD%20CLAIMER.user.js
// @description Clicks the "CLAIM" button once when found
// ==/UserScript==

(function() {
    'use strict';

    // Function to simulate mouse click on the CLAIM button based on SVG presence
    function clickClaimButton() {
        // Find all the <svg> elements with the specified path data
        const svgs = document.querySelectorAll('svg');

        // Iterate over all the <svg> elements
        for (let svg of svgs) {
            // Check if the svg contains the specific path data for CLAIM
            const path = svg.querySelector('path');
            if (path && path.getAttribute('d') === 'M19.5499 3.57007C18.9498 2.97664 17.969 2.97664 17.3625 3.57007L6.57364 14.1893L2.63752 10.3164C2.03743 9.72298 1.05662 9.72298 0.450073 10.3164C-0.150024 10.9036 -0.150024 11.8593 0.450073 12.4527L4.87659 16.8066C5.32183 17.2501 5.93483 17.5 6.57364 17.5C7.21245 17.5 7.819 17.2501 8.27069 16.8066L19.5499 5.70641C20.15 5.11923 20.15 4.1635 19.5499 3.57007Z') {
                // Find the parent element of the SVG
                const parentElement = svg.closest('div, span, button, a'); // Find closest clickable parent

                if (parentElement) {
                    try {
                        // Click the parent element (which is likely the clickable container)
                        parentElement.click();
                        console.log("Claim button clicked with SVG parent!");
                        return; // Stop after clicking once
                    } catch (error) {
                        console.error("Error while clicking the claim button's parent element:", error);
                    }
                }
            }
        }
    }

    // Set an interval to check for the SVG every 2 seconds
    setInterval(clickClaimButton, 2000);
})();
