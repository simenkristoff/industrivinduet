import path from 'path';
import fs from 'fs';

import _ from 'lodash';
import { MediaTypeInterface } from '@server/types';

export class TreeNode implements MediaTypeInterface {
  public path: string;
  public name: string;
  public isDir: boolean;
  public size: number;
  public ext?: string;
  public children: Array<MediaTypeInterface>;

  constructor(path: string, name: string, isDir: boolean, size: number, ext?: string) {
    this.path = path;
    this.name = name;
    this.isDir = isDir;
    this.size = size;
    this.ext = ext ? ext : undefined;
    this.children = [];
  }

  public setDir(val: boolean) {
    this.isDir = val;
  }
}

export namespace MediaUtils {
  export function parseFile(file: Express.Multer.File, filepath?: string): TreeNode {
    const filename = filepath ? `${filepath}/${file.filename}` : file.filename;
    const stat = fs.statSync(file.path);
    const ext = path.extname(file.filename);
    const basename = path.basename(file.filename, ext);
    const node = new TreeNode(filename, basename, false, stat.size, ext);

    return node;
  }

  export function dirWalker(dir: string) {
    const basePath = dir;
    const root = new TreeNode('', '', true, 0);
    const stack = [root];

    while (stack.length) {
      const currentNode = stack.pop();

      if (currentNode) {
        const children = fs.readdirSync(path.resolve(basePath, currentNode.path));

        for (const child of children) {
          const childPath =
            currentNode.path.length > 0 ? `${currentNode.path}/${child}` : `${child}`;
          const stat = fs.statSync(path.resolve(basePath, childPath));
          const ext = path.extname(child);
          const basename = path.basename(child, ext);
          const childNode = new TreeNode(childPath, basename, false, stat.size, ext);
          currentNode.children.push(childNode);
          if (stat.isDirectory()) {
            childNode.setDir(true);
            stack.push(childNode);
          }
        }
      }
    }

    return root;
  }
}
