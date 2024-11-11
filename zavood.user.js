// ==UserScript==
// @name         bekzod codes' AI in the future for adham
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  for adham only
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Bot configuration
    const bot = {
        name: "Mdaowalletbot",
        mainText: "Играть",
        fallbackText: "Play&Earn",
        waitTime: 20000  // 20 seconds
    };

    // Function to open the bot's chat
    function openBot() {
        const botURL = `https://web.telegram.org/k/#@${bot.name}`;
        if (window.location.href !== botURL) {
            window.location.href = botURL;
            console.log(`Navigating to ${bot.name}...`);
        }
    }

    // Function to find a button by text content
    function findButtonByText(text) {
        const elements = document.querySelectorAll('span.reply-markup-button-text');
        for (let element of elements) {
            if (element.textContent.trim() === text) {
                return element;
            }
        }
        return null;
    }

    // Function to click the main or fallback button
    function clickButton() {
        let playButton = findButtonByText(bot.mainText);

        // Try the fallback button if the main button is not found
        if (!playButton) {
            playButton = findButtonByText(bot.fallbackText);
        }

        // Click the button if found, log an error if not
        if (playButton) {
            playButton.click();
            console.log(`Button clicked: ${playButton.textContent.trim()}`);
        } else {
            console.log("Button not found.");
        }

        // Wait for the specified time before reloading to repeat the process
        setTimeout(() => {
            location.reload();
        }, bot.waitTime);
    }

    // Function to start the bot interaction process
    function startBotProcess() {
        openBot();

        // Wait 3 seconds to allow the page to load before attempting to click
        setTimeout(() => {
            clickButton();
        }, 3000);
    }

    // Start the process 3 seconds after the script is loaded
    setTimeout(startBotProcess, 3000);

})();
