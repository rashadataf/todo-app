import { config } from 'dotenv';
import { dirname, join } from 'path';
const envFilePath = join(dirname(__dirname), '..', '.env');
config({ path: envFilePath });