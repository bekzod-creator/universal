// ==UserScript==
// @name         tanagram AI
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Automatically open Telegram bots, click the Play button, then click the Launch button (if available), and move to the next bot with page refresh, then repeat the cycle infinitely.
// @author       zoder codes
// @downloadURL  https://raw.githubusercontent.com/bekzod-creator/universal/main/auto.user.js
// @updateURL    https://raw.githubusercontent.com/bekzod-creator/universal/main/auto.user.js
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // List of bots with their selectors and wait times
    const bots = [
        { bot: "memefi_coin_bot", text: "Play", waitTime: 10000 },
        { bot: "pixelversexyzbot", text: "Fight for supply 💰🥊", waitTime: 30000, special: "pixelverse" },
        { bot: "tapswap_bot", text: "👋 Play", waitTime: 100000, special: "tapswap" },
        { bot: "BlumCryptoBot", text: "Launch Blum", waitTime: 50000 },
        { bot: "theYescoin_bot", text: "🕹 Play for Airdrop", waitTime: 100000, special: "yescoin" },
        { bot: "gemzcoin_bot", text: "Play Now", waitTime: 30000 },
        { bot: "xkucoinbot", text: "🎮 Play Game", waitTime: 30000 },
        { bot: "notpixel", text: "start", waitTime: 40000 },
        { bot: "token1win_bot", text: "Play", waitTime: 60000 },
        { bot: "hamster_kombat_bot", text: "Play", waitTime: 100000, special: "hamster_kombat" } // Added the new bot
    ];

    // Get the current bot index from localStorage, or start at 0
    let currentBotIndex = localStorage.getItem('currentBotIndex') ? parseInt(localStorage.getItem('currentBotIndex')) : 0;

    // Function to open the bot's chat
    function openBot(bot) {
        const botURL = `https://web.telegram.org/k/#@${bot.bot}`;

        // Navigate to the bot if not already there
        if (window.location.href !== botURL) {
            window.location.href = botURL;
            console.log(`Navigating to ${bot.bot}...`);
        }
    }

    // Custom function to find elements by their inner text
    function findButtonByText(text) {
        const elements = document.querySelectorAll('div, span, button'); // Search in div, span, and button elements
        for (let element of elements) {
            if (element.textContent.trim() === text) {
                return element;
            }
        }
        return null;
    }

    // Special function to handle the custom tapswap_bot element
    function findTapswapCustomElement() {
        const elements = document.querySelectorAll('div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.textContent.trim() === '👋 Play') {
                return element;
            }
        }
        return null;
    }

    // Special function to handle the yescoin_bot custom element
    function findYescoinCustomElement() {
        const elements = document.querySelectorAll('span.reply-markup-button-text');
        for (let element of elements) {
            if (element.innerHTML.includes('🕹') && element.textContent.trim().includes('Play for Airdrop')) {
                return element;
            }
        }
        return null;
    }

    // Special function to handle the custom pixelversexyzbot element
    function findPixelverseCustomElement() {
        const elements = document.querySelectorAll('div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.innerHTML.includes('💰') && element.innerHTML.includes('🥊')) {
                return element;
            }
        }
        return null;
    }

    // Special function to handle the custom hamster_kombat_bot element
    function findHamsterKombatCustomElement() {
        const elements = document.querySelectorAll('div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.textContent.trim() === 'Play') {
                return element;
            }
        }
        return null;
    }

    // Function to click the Play button, then attempt to click the Launch button (if found)
    function clickPlayThenLaunch(bot, retryCount = 0) {
        let playButton = findButtonByText(bot.text);

        // Handle the special case for tapswap_bot with the custom element
        if (bot.bot === "tapswap_bot" && !playButton) {
            playButton = findTapswapCustomElement(); // Use the custom search for tapswap_bot
        }

        // Handle the special case for yescoin_bot with the custom emoji button
        if (bot.bot === "theYescoin_bot" && !playButton) {
            playButton = findYescoinCustomElement(); // Use the custom search for yescoin_bot
        }

        // Handle the special case for pixelversexyzbot with the custom element
        if (bot.bot === "pixelversexyzbot" && !playButton) {
            playButton = findPixelverseCustomElement(); // Use the custom search for pixelversexyzbot
        }

        // Handle the special case for hamster_kombat_bot with the custom element
        if (bot.bot === "hamster_kombat_bot" && !playButton) {
            playButton = findHamsterKombatCustomElement(); // Use the custom search for hamster_kombat_bot
        }

        if (playButton) {
            playButton.click();
            console.log(`Play button clicked for ${bot.bot}`);

            // Add a 5-second delay after pressing the Play button before checking for the Launch button
            setTimeout(() => {
                const launchButton = findButtonByText("Launch"); // Look for the 'Launch' button by text
                if (launchButton) {
                    launchButton.click();
                    console.log(`'Launch' button clicked for ${bot.bot}`);

                    // After clicking the 'Launch' button, wait the full wait time before moving to the next bot
                    setTimeout(() => {
                        checkAndMoveToNextBot(bot);
                    }, bot.waitTime);

                } else {
                    console.log(`'Launch' button not found for ${bot.bot}, waiting for the full wait time...`);
                    // Wait for the full wait time before moving to the next bot
                    setTimeout(() => {
                        checkAndMoveToNextBot(bot);
                    }, bot.waitTime);
                }
            }, 5000);  // 5 seconds delay after clicking the Play button
        } else {
            console.log(`Play button not found for ${bot.bot}, retrying... (${retryCount + 1}/2)`);

            // Retry logic: Try 2 times before skipping the bot
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
            localStorage.setItem('currentBotIndex', currentBotIndex); // Store current bot index
            location.reload(); // Refresh the page before moving to the next bot
        } else {
            console.log("All bots processed. Restarting the cycle...");
            localStorage.setItem('currentBotIndex', 0); // Reset index to 0 to restart the cycle
            location.reload(); // Refresh the page to start over
        }
    }

    // Function to start the bot process
    function startBotProcess() {
        const bot = bots[currentBotIndex];
        openBot(bot);

        // Wait for a few seconds to allow the page to load before clicking the play button
        setTimeout(() => {
            clickPlayThenLaunch(bot);
        }, 5000);  // 5 seconds delay to allow Telegram Web to load
    }

    // Start processing the bot from where it left off
    setTimeout(startBotProcess, 3000);  // Start 3 seconds after the script is loaded

})();
