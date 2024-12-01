// ==UserScript==
// @name        zaavood auto
// @namespace   zoderman scriptsc
// @match       https://zavod.mdaowallet.com/*
// @grant       none
// @version     1.1
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/ZAVOD%20CLAIMER.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/ZAVOD%20CLAIMER.user.js
// @description  zavodcha
// ==/UserScript==

(function() {
    'use strict';

    // Function to simulate mouse click on the CLAIM button based on SVG presence
    function clickClaimButton() {
        const svgs = document.querySelectorAll('svg');
        for (let svg of svgs) {
            const path = svg.querySelector('path');
            if (path && path.getAttribute('d') === 'M19.5499 3.57007C18.9498 2.97664 17.969 2.97664 17.3625 3.57007L6.57364 14.1893L2.63752 10.3164C2.03743 9.72298 1.05662 9.72298 0.450073 10.3164C-0.150024 10.9036 -0.150024 11.8593 0.450073 12.4527L4.87659 16.8066C5.32183 17.2501 5.93483 17.5 6.57364 17.5C7.21245 17.5 7.819 17.2501 8.27069 16.8066L19.5499 5.70641C20.15 5.11923 20.15 4.1635 19.5499 3.57007Z') {
                const parentElement = svg.closest('div, span, button, a');
                if (parentElement) {
                    try {
                        parentElement.click();
                        console.log("Claim button clicked!");
                        // Wait a moment and then click the next button
                        setTimeout(clickBonusButton, 500); // Adjust delay as needed
                        return;
                    } catch (error) {
                        console.error("Error while clicking the claim button's parent element:", error);
                    }
                }
            }
        }
    }

    // Function to click the "ЗАБРАТЬ БЕЗ БОНУСА" button
    function clickBonusButton() {
        const bonusButton = document.querySelector('div.sc-blHHSb.sc-gtLWhw.sc-kZrBCu.kqMMnW.jTrzQY.jndmy');
        if (bonusButton) {
            try {
                bonusButton.click();
                console.log("Bonus button clicked!");
            } catch (error) {
                console.error("Error while clicking the bonus button:", error);
            }
        } else {
            console.log("Bonus button not found.");
        }
    }

    // Set an interval to check for the CLAIM button every 2 seconds
    setInterval(clickClaimButton, 2000);
})();
