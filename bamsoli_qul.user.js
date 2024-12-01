// ==UserScript==
// @name         bamsoli qul
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  bumchaga
// @author       zoderman
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/bamisoli_qul.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/bamisoli_qul.user.js
// @match        https://app.bums.bot/*
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to update iframe src attributes
    function updateIframeSrc() {
        const iframes = document.querySelectorAll('iframe[src*="=web"]'); // Find iframes containing "=web"
        iframes.forEach(iframe => {
            const src = iframe.getAttribute('src');
            const updatedSrc = src.replace('=web', '=android'); // Replace "=web" with "=android"
            iframe.setAttribute('src', updatedSrc);
            console.log(`Updated iframe src: ${updatedSrc}`);
        });
    }

    // Initial update when the script runs
    updateIframeSrc();

    // Observe DOM changes to apply updates dynamically
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            updateIframeSrc();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
