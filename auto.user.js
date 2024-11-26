// ==UserScript==
// @name         tanagram AI
// @namespace    http://tampermonkey.net/
// @version      2.7
// @description  Automatically open Telegram bots, click the Play button, then click the Launch button (if available), and move to the next bot with page refresh, then repeat the cycle infinitely.
// @author       zoder codes
// @downloadURL  https://raw.githubusercontent.com/bekzod-creator/universal/main/auto.user.js
// @updateURL    https://raw.githubusercontent.com/bekzod-creator/universal/main/auto.user.js
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // List of remaining bots with their selectors and wait times
    const bots = [
        { bot: "BybitCoinsweeper_Bot", text: "Play!", waitTime: 200000, special: "bybit_coinsweeper" },
        { bot: "BlumCryptoBot", text: "Launch Blum", waitTime: 50000 },
        { bot: "hamster_kombat_bot", text: "Play", waitTime: 100000, special: "hamster_kombat" },
        { bot: "notpixel", text: "start", waitTime: 40000 }
    ];

    let currentBotIndex = localStorage.getItem('currentBotIndex') ? parseInt(localStorage.getItem('currentBotIndex')) : 0;

    // Function to open the bot's chat
    function openBot(bot) {
        const botURL = `https://web.telegram.org/k/#@${bot.bot}`;
        if (window.location.href !== botURL) {
            window.location.href = botURL;
            console.log(`Navigating to ${bot.bot}...`);
        }
    }

    // Function to find buttons by text
    function findButtonByText(text) {
        const elements = document.querySelectorAll('div, span, button');
        for (let element of elements) {
            if (element.textContent.trim() === text) {
                return element;
            }
        }
        return null;
    }

    // Special functions to handle custom bot elements (like hamster_kombat, bybit_coinsweeper, etc.)
    function findHamsterKombatCustomElement() {
        const elements = document.querySelectorAll('div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.textContent.trim() === 'Play') {
                return element;
            }
        }
        return null;
    }

    function findBybitCoinsweeperCustomElement() {
        const elements = document.querySelectorAll('div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.textContent.trim() === 'Play!') {
                return element;
            }
        }
        return null;
    }

    // Function to click the Play button, and then try to find and click the Launch button
    function clickPlayThenLaunch(bot, retryCount = 0) {
        let playButton = findButtonByText(bot.text);

        // Handle special bots with custom elements
        if (bot.bot === "hamster_kombat_bot" && !playButton) {
            playButton = findHamsterKombatCustomElement();
        }

        if (bot.bot === "BybitCoinsweeper_Bot" && !playButton) {
            playButton = findBybitCoinsweeperCustomElement();
        }

        if (playButton) {
            playButton.click();
            console.log(`Play button clicked for ${bot.bot}`);

            // Wait for 5 seconds before checking for a 'Launch' button
            setTimeout(() => {
                const launchButton = findButtonByText("Launch");
                if (launchButton) {
                    launchButton.click();
                    console.log(`Launch button clicked for ${bot.bot}`);
                } else {
                    console.log(`No Launch button found for ${bot.bot}`);
                }

                // Wait for the full wait time before moving to the next bot
                setTimeout(() => {
                    checkAndMoveToNextBot(bot);
                }, bot.waitTime);

            }, 5000); // 5 seconds delay after clicking Play

        } else {
            console.log(`Play button not found for ${bot.bot}, retrying... (${retryCount + 1}/2)`);

            if (retryCount < 2) {
                setTimeout(() => {
                    clickPlayThenLaunch(bot, retryCount + 1);  // Retry after 2 seconds
                }, 2000);
            } else {
                console.log(`Play button not found after 2 retries for ${bot.bot}, skipping...`);
                setTimeout(() => {
                    checkAndMoveToNextBot(bot);
                }, bot.waitTime);  // Move to the next bot after the wait time
            }
        }
    }

    // Function to check current bot and move to the next one
    function checkAndMoveToNextBot(bot) {
        currentBotIndex++;
        if (currentBotIndex < bots.length) {
            localStorage.setItem('currentBotIndex', currentBotIndex);
            location.reload();
        } else {
            console.log("All bots processed. Restarting the cycle...");
            localStorage.setItem('currentBotIndex', 0);
            location.reload();
        }
    }

    // Function to start the bot process
    function startBotProcess() {
        const bot = bots[currentBotIndex];
        openBot(bot);

        // Wait for 5 seconds to allow the page to load before clicking the play button
        setTimeout(() => {
            clickPlayThenLaunch(bot);
        }, 5000);
    }

    setTimeout(startBotProcess, 3000);  // Start 3 seconds after the script is loaded

})();
