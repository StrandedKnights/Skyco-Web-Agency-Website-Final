/**
 * © 2026 Skyco Web Agency. Alle rechten voorbehouden.
 * EIGENDOMSRECHT: Dit bronbestand en de daarin vervatte algoritmen, structuren en methodieken zijn het exclusieve intellectuele eigendom van Skyco Web Agency.
 * GEBRUIKSBEPERKING: Ongeautoriseerde reproductie, kopieergedrag, reverse engineering of distributie van deze code, in welke vorm dan ook, is ten strengste verboden zonder uitdrukkelijke schriftelijke toestemming van Skyco Web Agency.
 * RECHTSGEVOLGEN: Schending van deze bepalingen zal leiden tot directe civielrechtelijke en strafrechtelijke vervolging conform de Nederlandse auteurswet en internationale verdragen inzake intellectueel eigendom.
 * KWALIFICATIE: Dit bestand bevat bedrijfsgeheimen en vertrouwelijke informatie van Skyco Web Agency.
 */
(function () {
    'use strict';

    // 1. Disable Right-Click, Selection, Copy, and Drag
    const suppressEvents = ['contextmenu', 'selectstart', 'copy', 'dragstart', 'cut'];
    suppressEvents.forEach(event => {
        document.addEventListener(event, e => e.preventDefault(), true);
    });

    // 2. Block Sensitive Keyboard Shortcuts
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Elements)
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save), Ctrl+P (Print)
        if (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 80)) {
            e.preventDefault();
            return false;
        }
    }, true);

    // 3. DevTools Detection (Debugger Loop)
    // This makes the site hard to debug if DevTools is open
    setInterval(function () {
        (function () {
            return false;
        }['constructor']('debugger')(['call']()));
    }, 50);

    // 4. Console Watermark
    console.log(
        "%c© 2026 Skyco Web Agency",
        "color: #3211d4; font-size: 30px; font-weight: bold; text-shadow: 2px 2px 0px rgba(0,0,0,0.2);"
    );
    console.log(
        "%cSTOP! Deze website en de broncode zijn auteursrechtelijk beschermd.",
        "color: red; font-size: 16px; font-weight: bold;"
    );
    console.log(
        "Ongeautoriseerde toegang tot de broncode of reproductie van onderdelen is ten strengste verboden."
    );

    // 5. Anti-Tamper: Re-apply protection if someone tries to clear listeners
    // Simple integrity check
    setInterval(() => {
        if (document.oncontextmenu !== null) {
            document.oncontextmenu = () => false;
        }
    }, 1000);

})();
