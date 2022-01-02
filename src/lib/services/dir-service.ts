import { Dirent } from 'fs';
import { readdir } from 'fs/promises';

export async function getDirs(dirPath: string): Promise<Dirent[]> {
  let dirents: Dirent[], dirDirents: Dirent[];
  dirents = await readdir(dirPath, {
    withFileTypes: true,
  });
  dirDirents = dirents.filter(dirent => {
    return dirent.isDirectory();
  });
  return dirDirents;
}
