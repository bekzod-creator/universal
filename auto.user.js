// ==UserScript==
// @name         tanagram AI
// @namespace    http://tampermonkey.net/
// @version      2.6
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
        { bot: "memefi_coin_bot", text: "Play", waitTime: 100000 },
        { bot: "BybitCoinsweeper_Bot", text: "Play!", waitTime: 30000, special: "bybit_coinsweeper" }, // Added BybitCoinsweeper_Bot
        { bot: "tapswap_bot", text: "Play", waitTime: 60000, special: "tapswap" },
        { bot: "BlumCryptoBot", text: "Launch Blum", waitTime: 50000 },
        { bot: "theYescoin_bot", text: "🕹 Play for Airdrop", waitTime: 100000, special: "yescoin" },
        { bot: "gemzcoin_bot", text: "Play Now", waitTime: 30000 },
        { bot: "xkucoinbot", text: "🎮 Play Game", waitTime: 30000 },
        { bot: "notpixel", text: "start", waitTime: 40000 },
        { bot: "token1win_bot", text: "Play", waitTime: 60000 },
        { bot: "hamster_kombat_bot", text: "Play", waitTime: 100000, special: "hamster_kombat" }
    ];

    let currentBotIndex = localStorage.getItem('currentBotIndex') ? parseInt(localStorage.getItem('currentBotIndex')) : 0;

    function openBot(bot) {
        const botURL = `https://web.telegram.org/k/#@${bot.bot}`;
        if (window.location.href !== botURL) {
            window.location.href = botURL;
            console.log(`Navigating to ${bot.bot}...`);
        }
    }

    function findButtonByText(text) {
        const elements = document.querySelectorAll('div, span, button');
        for (let element of elements) {
            if (element.textContent.trim() === text) {
                return element;
            }
        }
        return null;
    }

    function findTapswapCustomElement() {
        const elements = document.querySelectorAll('div.new-message-bot-commands-view');
        for (let element of elements) {
            if (element.textContent.trim() === '👋 Play') {
                return element;
            }
        }
        return null;
    }

    function findYescoinCustomElement() {
        const elements = document.querySelectorAll('span.reply-markup-button-text');
        for (let element of elements) {
            if (element.innerHTML.includes('🕹') && element.textContent.trim().includes('Play for Airdrop')) {
                return element;
            }
        }
        return null;
    }

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

    function checkForYouLost(retryCount = 0) {
        let lostText = document.querySelector("div:contains('You Lost!'), p:contains('You Lost!')");

        if (lostText) {
            console.log("Detected 'You Lost!' message. Moving to the next bot...");
            checkAndMoveToNextBot(bots[currentBotIndex]);
        } else {
            console.log("'You Lost!' message not found. Retrying...");
            setTimeout(() => checkForYouLost(), 30000); // Check again after 30 seconds
        }
    }

    function clickPlayThenLaunch(bot, retryCount = 0) {
        let playButton = findButtonByText(bot.text);

        if (bot.bot === "tapswap_bot" && !playButton) {
            playButton = findTapswapCustomElement();
        }

        if (bot.bot === "theYescoin_bot" && !playButton) {
            playButton = findYescoinCustomElement();
        }

        if (bot.bot === "hamster_kombat_bot" && !playButton) {
            playButton = findHamsterKombatCustomElement();
        }

        if (bot.bot === "BybitCoinsweeper_Bot" && !playButton) {
            playButton = findBybitCoinsweeperCustomElement();
        }

        if (playButton) {
            playButton.click();
            console.log(`Play button clicked for ${bot.bot}`);

            if (bot.bot === "BybitCoinsweeper_Bot") {
                setTimeout(() => checkForYouLost(), 30000); // Start checking for "You Lost!" message
            } else {
                setTimeout(() => {
                    const launchButton = findButtonByText("Launch");
                    if (launchButton) {
                        launchButton.click();
                        console.log(`'Launch' button clicked for ${bot.bot}`);

                        setTimeout(() => {
                            checkAndMoveToNextBot(bot);
                        }, bot.waitTime);

                    } else {
                        console.log(`'Launch' button not found for ${bot.bot}, waiting for the full wait time...`);
                        setTimeout(() => {
                            checkAndMoveToNextBot(bot);
                        }, bot.waitTime);
                    }
                }, 5000);
            }
        } else {
            console.log(`Play button not found for ${bot.bot}, retrying... (${retryCount + 1}/2)`);

            if (retryCount < 2) {
                setTimeout(() => {
                    clickPlayThenLaunch(bot, retryCount + 1);
                }, 2000);
            } else {
                console.log(`Play button not found after 2 retries for ${bot.bot}, skipping...`);
                setTimeout(() => {
                    checkAndMoveToNextBot(bot);
                }, bot.waitTime);
            }
        }
    }

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

    function startBotProcess() {
        const bot = bots[currentBotIndex];
        openBot(bot);

        setTimeout(() => {
            clickPlayThenLaunch(bot);
        }, 5000);
    }

    setTimeout(startBotProcess, 3000);

})();
