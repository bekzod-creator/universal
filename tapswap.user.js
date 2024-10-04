// ==UserScript==
// @name         tapswap getter 
// @namespace    Violentmonkey Scripts
// @match        *://*.tapswap.*/*
// @grant        none
// @version      1.0
// @author       Bekoz
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/tapswap.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/tapswap.user.js
// @description  f you
// ==/UserScript==

(function() {
    'use strict';

    function clickGetItButton(attempts) {
        const button = document.querySelector('button._button_fffa0_1._secondary_fffa0_21._large_fffa0_49._fullWidth_fffa0_37');
        if (button) {
            button.click();
            console.log('Button clicked!');
        } else if (attempts > 0) {
            console.log('Button not found, retrying...');
            setTimeout(() => clickGetItButton(attempts - 1), 1000); // Wait 1 second before retrying
        } else {
            console.log('Button not found after 3 attempts.');
        }
    }

    // Start the process with 3 attempts
    clickGetItButton(3);
})();
