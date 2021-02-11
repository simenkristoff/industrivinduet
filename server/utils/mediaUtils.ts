import path from 'path';
import fs from 'fs';

import _ from 'lodash';

import { MediaTypeInterface } from '../types';

/**
 * TreeNode class. Used for representing a tree structure of the resource/image directory.
 * ChildNodes are contained in the children-field, leaf-nodes has value 'isDir = false'
 * @class TreeNode
 */
export class TreeNode implements MediaTypeInterface {
  public path: string;
  public name: string;
  public isDir: boolean;
  public size: number;
  public ext?: string;
  public children: Array<MediaTypeInterface>;

  /**
   * Create a TreeNode
   * @param {string} path relative path of the file
   * @param {string} name name of the file
   * @param {boolean} isDir whether the file is a directory or not
   * @param {number} size the size of the file
   * @param {string | undefined} ext the file extension
   */
  constructor(path: string, name: string, isDir: boolean, size: number, ext?: string) {
    this.path = path;
    this.name = name;
    this.isDir = isDir;
    this.size = size;
    this.ext = ext ? ext : undefined;
    this.children = [];
  }

  /**
   * Mark the file as a directory
   * @param {boolean} state set to true if file is a directory
   */
  public setDir(state: boolean) {
    this.isDir = state;
  }
}

/**
 * MediaUtils namespace. Contains functions for handling media files and parsing of tree structures.
 * @namespace MediaUtils
 * @function parseFile
 * @function dirWalker
 */
export namespace MediaUtils {
  /**
   * Read filestats and initializes a new TreeNode instance
   * @param {Express.Multer.File} file the file to parse
   * @param {string | undefined} filepath the files path
   * @returns {TreeNode} TreeNode instance
   */
  export function parseFile(file: Express.Multer.File, filepath?: string): TreeNode {
    const filename = filepath ? `${filepath}/${file.filename}` : file.filename;
    const stat = fs.statSync(file.path);
    const ext = path.extname(file.filename);
    const basename = path.basename(file.filename, ext);
    const node = new TreeNode(filename, basename, false, stat.size, ext);

    return node;
  }

  /**
   * Walks a directory using depth first search and returns a Tree structure representing the directory.
   * @param {string} dir the root directory
   * @returns {TreeNode} TreeNode instance with sub-directories
   */
  export function dirWalker(dir: string): TreeNode {
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
