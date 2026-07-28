import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkgPath = resolve(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const version = pkg.version;

// Записываем в frontend/src/version.ts
const frontendPath = resolve(__dirname, '../frontend/src/version.ts');
const content = `// Автоматически генерируется из package.json
export const VERSION = "${version}";
export const APP_NAME = "${pkg.name || 'vue-search-filter'}";
`;
writeFileSync(frontendPath, content);

// Можем также записать в backend (если нужно)
// const backendPath = resolve(__dirname, '../backend/version.js');
// writeFileSync(backendPath, `module.exports = { VERSION: "${version}" };\n`);

console.log(`✅ Version ${version} synced to frontend/src/version.ts`);