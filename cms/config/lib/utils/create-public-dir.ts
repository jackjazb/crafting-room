import fs from 'fs';
import { join } from 'path';

/**
 * Creates the public directory at the target path.
 *
 * This recursively creates any directories that don't exist in the requested path.
 * @param path - Target directory
 * @returns Public directory path
 */
export const createPublicDir = (path: string) => {
	const publicPath = join(path, 'public');

	if (!fs.existsSync(publicPath))
		fs.mkdirSync(publicPath, { recursive: true });

	const uploadPath = join(publicPath, 'uploads');

	if (!fs.existsSync(uploadPath))
		fs.mkdirSync(uploadPath);

	return publicPath;
};
