// ==UserScript==
// @name         Toncha moncha webcha
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  toncha moncha to webcha
// @author       Your Name
// @match        https://tonstation.app/app/*
// @match        https://web.telegram.org/k/*
// @downloadURL  https://raw.githubusercontent.com/bekzod-creator/universal/main/toncha_moncha.user.js
// @updateURL    https://raw.githubusercontent.com/bekzod-creator/universal/main/toncha_moncha.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to update iframe src attributes and return the updated src
    function updateIframeSrc() {
        const iframes = document.querySelectorAll('iframe[src*="=web"]'); // Find iframes containing "=web"
        let updatedSrc = '';
        iframes.forEach(iframe => {
            const src = iframe.getAttribute('src');
            updatedSrc = src.replace('=web', '=ios'); // Replace "=web" with "=ios" (or another string as needed)
            iframe.setAttribute('src', updatedSrc);
            console.log(`Updated iframe src to: ${updatedSrc}`);
        });
        return updatedSrc; // Return the last updated src value
    }

    // Function to open the updated src in a mini window centered on the screen and zoomed to 50%
    function openTargetLinkInMiniWindow(updatedSrc) {
        // Window dimensions
        const width = 400;
        const height = 600;

        // Calculate the center of the screen
        const left = (window.innerWidth / 2) - (width / 1);
        const top = (window.innerHeight / 2) - (height / 2);

        // Open a new mini window with the calculated position and size
        const miniWindow = window.open(updatedSrc, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

        console.log(`Opening updated src in a mini window: ${updatedSrc}`);

        // Apply CSS zoom to scale the content to 50%
        miniWindow.document.body.style.transform = 'scale(0.5)';
        miniWindow.document.body.style.transformOrigin = '0 0'; // Ensure the top-left corner stays fixed

        // Close the mini window after 10 seconds
        setTimeout(() => {
            if (miniWindow && !miniWindow.closed) {
                miniWindow.close();
                console.log('Closed the mini window after 10 seconds.');
            }
        }, 20000); // 10 seconds delay
    }

    // Initial update when the script runs
    const updatedSrc = updateIframeSrc();
    if (updatedSrc) {
        openTargetLinkInMiniWindow(updatedSrc); // Open the updated src in the mini window
    }

    // Observe DOM changes to apply updates dynamically
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            const updatedSrc = updateIframeSrc(); // Get updated src after mutation
            if (updatedSrc) {
                openTargetLinkInMiniWindow(updatedSrc); // Open the updated src in the mini window
            }
        });
    });

    // Observer settings to detect changes in DOM
    const config = {
        childList: true,
        subtree: true
    };
    observer.observe(document.body, { childList: true, subtree: true });
})();
