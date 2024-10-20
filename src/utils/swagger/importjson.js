import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerDocument = JSON.parse(readFileSync(path.join(__dirname, './swagger-output.json'), 'utf8'));
