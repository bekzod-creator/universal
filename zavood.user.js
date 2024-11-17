// ==UserScript==
// @name         bekzod codes' AI in the future for adham
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  for adham only
// @downloadURL  https://github.com/bekzod-creator/universal/raw/refs/heads/main/zavood.user.js
// @updateURL    https://github.com/bekzod-creator/universal/raw/refs/heads/main/zavood.user.js
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Bot configurations
    const bots = [
        {
            name: "Mdaowalletbot",
            mainText: "Играть",
            fallbackText: "Play&Earn",
            waitTime: 20000 // 20 seconds
        },
        {
            name: "BlumCryptoBot",
            mainText: "Launch Blum",
            waitTime: 45000, // 45 seconds
            additionalClick: {
                selector: 'a.play-btn',
                textContent: "Play",
                waitAfter: 5000 // Wait 5 seconds after clicking the second button
            }
        },
        {
            name: "notpixel",
            mainText: "start",
            waitTime: 10000 // 10 seconds
        },
        {
            name: "hamster_kombat_bot",
            mainText: "Play",
            waitTime: 20000 // 20 seconds
        }
    ];

    let currentBotIndex = 0;

    // Function to open the bot's chat
    function openBot(bot) {
        const botURL = `https://web.telegram.org/k/#@${bot.name}`;
        if (window.location.href !== botURL) {
            window.location.href = botURL;
            console.log(`Navigating to ${bot.name}...`);
        }
    }

    // Function to find a button by text content
    function findButtonByText(text) {
        const elements = document.querySelectorAll('span.reply-markup-button-text, div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.textContent.trim() === text) {
                return element;
            }
        }
        return null;
    }

    // Function to find and click an additional element (e.g., "Play" button in Blum)
    function clickAdditionalElement(additionalClick, bot) {
        if (!additionalClick) {
            waitAndProceed(bot.waitTime);
            return;
        }

        const { selector, textContent, waitAfter } = additionalClick;
        const elements = document.querySelectorAll(selector);

        for (let element of elements) {
            if (element.textContent.trim() === textContent) {
                element.click();
                console.log(`Additional button clicked: ${textContent}`);
                setTimeout(() => {
                    waitAndProceed(bot.waitTime);
                }, waitAfter);
                return;
            }
        }

        console.log(`Additional button "${textContent}" not found.`);
        waitAndProceed(bot.waitTime);
    }

    // Function to click the main or fallback button
    function clickButton(bot) {
        let actionButton = findButtonByText(bot.mainText);

        // Try the fallback button if available and the main button is not found
        if (!actionButton && bot.fallbackText) {
            actionButton = findButtonByText(bot.fallbackText);
        }

        // Click the button if found, log an error if not
        if (actionButton) {
            actionButton.click();
            console.log(`Button clicked: ${actionButton.textContent.trim()}`);

            // Handle additional interaction if specified
            if (bot.additionalClick) {
                setTimeout(() => {
                    clickAdditionalElement(bot.additionalClick, bot);
                }, 3000); // Wait 3 seconds before trying the additional click
            } else {
                waitAndProceed(bot.waitTime);
            }
        } else {
            console.log(`Button not found for ${bot.name}.`);
            waitAndProceed(bot.waitTime);
        }
    }

    // Function to wait for the bot's specified time and then move to the next bot
    function waitAndProceed(waitTime) {
        console.log(`Waiting for ${waitTime / 1000} seconds before proceeding...`);
        setTimeout(() => {
            currentBotIndex++;
            if (currentBotIndex >= bots.length) {
                restartBots();
            } else {
                startBotProcess();
            }
        }, waitTime);
    }

    // Function to restart the bot sequence after all bots
    function restartBots() {
        console.log("Restarting bot sequence...");
        currentBotIndex = 0;
        setTimeout(() => {
            startBotProcess();
        }, 3000);
    }

    // Function to start the bot interaction process
    function startBotProcess() {
        const bot = bots[currentBotIndex];
        openBot(bot);

        // Wait 3 seconds to allow the page to load before attempting to click
        setTimeout(() => {
            clickButton(bot);
        }, 3000);
    }

    // Start the process 3 seconds after the script is loaded
    setTimeout(startBotProcess, 3000);

})();
