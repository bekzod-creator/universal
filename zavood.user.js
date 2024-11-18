// ==UserScript==
// @name         bekzod codes' AI in the future 
// @namespace    http://tampermonkey.net/
// @version      2.6
// @description  bekzods autmatic AI thing bot
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
            waitTime: 20000, // 20 seconds
            allowedTime: { start: "09:00", end: "00:00" } // Active from 9 AM to 9 PM
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
            waitTime: 30000 // 20 seconds
        }
    ];

    // Retrieve the last processed bot index from localStorage or initialize to 0
    let currentBotIndex = parseInt(localStorage.getItem("currentBotIndex")) || 0;

    // Helper function to check if the current time is within the allowed range
    function isWithinAllowedTime(allowedTime) {
        if (!allowedTime) return true;

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Time in minutes since midnight

        const [startHours, startMinutes] = allowedTime.start.split(":").map(Number);
        const startTime = startHours * 60 + startMinutes;

        const [endHours, endMinutes] = allowedTime.end.split(":").map(Number);
        const endTime = endHours * 60 + endMinutes;

        return currentTime >= startTime && currentTime <= endTime;
    }

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

    // Function to click the main or fallback button
    function clickButton(bot) {
        if (bot.allowedTime && !isWithinAllowedTime(bot.allowedTime)) {
            console.log(`Skipping ${bot.name} due to allowedTime restriction.`);
            proceedToNextBot();
            return;
        }

        let actionButton = findButtonByText(bot.mainText);

        // Try the fallback button if available and the main button is not found
        if (!actionButton && bot.fallbackText) {
            actionButton = findButtonByText(bot.fallbackText);
        }

        // Click the button if found, log an error if not
        if (actionButton) {
            actionButton.click();
            console.log(`Button clicked: ${actionButton.textContent.trim()}`);

            if (bot.additionalClick) {
                setTimeout(() => {
                    clickAdditionalElement(bot.additionalClick, bot);
                }, 3000); // Wait 3 seconds for the next action
            } else {
                waitAndReload(bot.waitTime);
            }
        } else {
            console.log(`Button not found for ${bot.name}.`);
            proceedToNextBot();
        }
    }

    // Function to handle additional clicks (e.g., "Play" button in BlumCryptoBot)
    function clickAdditionalElement(additionalClick, bot) {
        const { selector, textContent, waitAfter } = additionalClick;
        const elements = document.querySelectorAll(selector);

        for (let element of elements) {
            if (element.textContent.trim() === textContent) {
                element.click();
                console.log(`Additional button clicked: ${textContent}`);
                setTimeout(() => {
                    waitAndReload(bot.waitTime);
                }, waitAfter);
                return;
            }
        }

        console.log(`Additional button "${textContent}" not found.`);
        waitAndReload(bot.waitTime);
    }

    // Function to wait for the bot's specified time and then reload the page
    function waitAndReload(waitTime) {
        console.log(`Waiting for ${waitTime / 1000} seconds before reloading the page...`);
        setTimeout(() => {
            currentBotIndex++;
            if (currentBotIndex >= bots.length) {
                currentBotIndex = 0; // Restart sequence if all bots are processed
            }
            localStorage.setItem("currentBotIndex", currentBotIndex); // Save index before reload
            location.reload(); // Reload the page after wait time
        }, waitTime);
    }

    // Function to proceed to the next bot
    function proceedToNextBot() {
        currentBotIndex++;
        if (currentBotIndex >= bots.length) {
            currentBotIndex = 0; // Restart sequence if all bots are processed
        }
        localStorage.setItem("currentBotIndex", currentBotIndex); // Save index before moving
        startBotProcess();
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
