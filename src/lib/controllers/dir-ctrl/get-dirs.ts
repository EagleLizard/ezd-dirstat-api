
import { Dirent } from 'fs';
import os from 'os';
import path from 'path';

import { Request, Response } from 'express';

import { getDirs } from '../../services/dir-service';

const DEFAULT_DIR = os.homedir();
console.log(DEFAULT_DIR);
export async function getDirsCtrl(req: Request, res: Response) {
  let dirPath: string, dirDirents: Dirent[], dirPaths: string[];
  dirPath = req.body?.path ?? DEFAULT_DIR;
  dirDirents = await getDirs(dirPath);
  dirDirents.sort((a, b) => {
    let aHidden: boolean, bHidden: boolean;
    aHidden = a.name.startsWith('.');
    bHidden = b.name.startsWith('.');
    if(aHidden && !bHidden) {
      return 1;
    }
    if(!aHidden && bHidden) {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });
  dirPaths = dirDirents.map(dirDirent => {
    return `${dirPath}${path.sep}${dirDirent.name}`;
  });

  res.json({
    dirs: dirPaths,
  });
}
