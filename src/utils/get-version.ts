import { readFileSync } from 'fs';
import { join } from 'path';

const getVersion = (): string => {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.version || 'unknown';
};

export default getVersion;