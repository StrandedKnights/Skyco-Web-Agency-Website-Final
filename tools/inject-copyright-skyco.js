const fs = require('fs');
const path = require('path');

// Target directories
const DIRS_TO_INJECT = [
    'C:/Users/mlgpr/OneDrive/Documents/Skyco Web Agency/Skyco Website',
    'C:/Users/mlgpr/OneDrive/Documents/Skyco Web Agency/Rijschool'
];

const LEGAL_HEADER_HTML = `<!-- 
  © 2026 Skyco Web Agency. Alle rechten voorbehouden.
  EIGENDOMSRECHT: Dit bronbestand en de daarin vervatte algoritmen, structuren en methodieken zijn het exclusieve intellectuele eigendom van Skyco Web Agency.
  GEBRUIKSBEPERKING: Ongeautoriseerde reproductie, kopieergedrag, reverse engineering of distributie van deze code, in welke vorm dan ook, is ten strengste verboden zonder uitdrukkelijke schriftelijke toestemming van Skyco Web Agency.
  RECHTSGEVOLGEN: Schending van deze bepalingen zal leiden tot directe civielrechtelijke en strafrechtelijke vervolging conform de Nederlandse auteurswet en internationale verdragen inzake intellectueel eigendom.
  KWALIFICATIE: Dit bestand bevat bedrijfsgeheimen en vertrouwelijke informatie van Skyco Web Agency.
-->\n`;

const LEGAL_HEADER_JS_CSS = `/**
 * © 2026 Skyco Web Agency. Alle rechten voorbehouden.
 * EIGENDOMSRECHT: Dit bronbestand en de daarin vervatte algoritmen, structuren en methodieken zijn het exclusieve intellectuele eigendom van Skyco Web Agency.
 * GEBRUIKSBEPERKING: Ongeautoriseerde reproductie, kopieergedrag, reverse engineering of distributie van deze code, in welke vorm dan ook, is ten strengste verboden zonder uitdrukkelijke schriftelijke toestemming van Skyco Web Agency.
 * RECHTSGEVOLGEN: Schending van deze bepalingen zal leiden tot directe civielrechtelijke en strafrechtelijke vervolging conform de Nederlandse auteurswet en internationale verdragen inzake intellectueel eigendom.
 * KWALIFICATIE: Dit bestand bevat bedrijfsgeheimen en vertrouwelijke informatie van Skyco Web Agency.
 */\n`;

function inject(filePath) {
    const ext = path.extname(filePath);
    let header = '';

    if (ext === '.html') header = LEGAL_HEADER_HTML;
    else if (ext === '.js' || ext === '.css') header = LEGAL_HEADER_JS_CSS;
    else return;

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Cleanup old headers
        const oldHeaderPattern = /<!--\s*© 2026 Skyco Web Agency[\s\S]*?-->\n?|\/\*\*\s*\*\s*© 2026 Skyco Web Agency[\s\S]*?\*\/\n?/g;
        content = content.replace(oldHeaderPattern, '');

        if (content.includes('EIGENDOMSRECHT: Dit bronbestand')) return;

        const newContent = header + content.trimStart();
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Injected: ${filePath}`);
    } catch (err) {
        console.error(`Error ${filePath}: ${err.message}`);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
            if (!['node_modules', '.git', 'assets', 'tools', 'img'].includes(file)) walk(full);
        } else inject(full);
    });
}

DIRS_TO_INJECT.forEach(dir => {
    console.log(`Scanning: ${dir}`);
    walk(dir);
});
