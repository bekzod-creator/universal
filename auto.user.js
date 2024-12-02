// ==UserScript==
// @name         tanagram AI
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  bulajak harobadan chiqqan millionerlar
// @author       zoder codes
// @downloadURL  https://raw.githubusercontent.com/bekzod-creator/universal/main/auto.user.js
// @updateURL    https://raw.githubusercontent.com/bekzod-creator/universal/main/auto.user.js
// @match        https://web.telegram.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // List of bots with their selectors, wait times, and allowed time constraints
    const bots = [
        { bot: "BybitCoinsweeper_Bot", text: "Play!", waitTime: 1000, special: "bybit_coinsweeper" },
        { bot: "BlumCryptoBot", text: "Launch Blum", waitTime: 50000 },
        { bot: "hamster_kombat_bot", text: "Play", waitTime: 30000, special: "hamster_kombat" },
        { bot: "notpixel", text: "start", waitTime: 15000 },
        { bot: "Mdaowalletbot", text: "Играть", fallbackText: "Play&Earn", waitTime: 15000, allowedTime: { start: "00:00", end: "23:59" } },
        { bot: "Bums", text: "Play", waitTime: 10000, specialSelector: '.new-message-bot-commands.is-view' }
    ];

    let currentBotIndex = localStorage.getItem('currentBotIndex') ? parseInt(localStorage.getItem('currentBotIndex')) : 0;

    // Function to check if the current time is within allowed hours
    function isWithinAllowedTime(allowedTime) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert time to minutes since midnight

        const [startHour, startMinute] = allowedTime.start.split(':').map(Number);
        const [endHour, endMinute] = allowedTime.end.split(':').map(Number);
        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;

        return currentTime >= startTime && currentTime <= endTime;
    }

    // Function to open the bot's chat
    function openBot(bot) {
        const botURL = `https://web.telegram.org/k/#@${bot.bot}`;
        if (window.location.href !== botURL) {
            window.location.href = botURL;
            console.log(`Navigating to ${bot.bot}...`);
        }
    }

    // Function to find buttons by text, fallback text, or a special selector
    function findButton(bot) {
        if (bot.specialSelector) {
            return document.querySelector(bot.specialSelector);
        }
        const elements = document.querySelectorAll('div, span, button');
        for (let element of elements) {
            if (element.textContent.trim() === bot.text || (bot.fallbackText && element.textContent.trim() === bot.fallbackText)) {
                return element;
            }
        }
        return null;
    }

    // Function to click the Play button, and then try to find and click the Launch button
    function clickPlayThenLaunch(bot, retryCount = 0) {
        let playButton = findButton(bot);

        if (playButton) {
            playButton.click();
            console.log(`Play button clicked for ${bot.bot}`);

            // Wait for 5 seconds before checking for a 'Launch' button
            setTimeout(() => {
                const launchButton = findButton({ text: "Launch" });
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
                    clickPlayThenLaunch(bot, retryCount + 1); // Retry after 2 seconds
                }, 2000);
            } else {
                console.log(`Play button not found after 2 retries for ${bot.bot}, skipping...`);
                setTimeout(() => {
                    checkAndMoveToNextBot(bot);
                }, bot.waitTime); // Move to the next bot after the wait time
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

        // Skip bot if the current time is outside allowed hours
        if (bot.allowedTime && !isWithinAllowedTime(bot.allowedTime)) {
            console.log(`Skipping ${bot.bot} because it's outside the allowed time (${bot.allowedTime.start} - ${bot.allowedTime.end})`);
            checkAndMoveToNextBot(bot);
            return;
        }

        openBot(bot);

        // Wait for 5 seconds to allow the page to load before clicking the play button
        setTimeout(() => {
            clickPlayThenLaunch(bot);
        }, 5000);
    }

    setTimeout(startBotProcess, 3000); // Start 3 seconds after the script is loaded

})();

