import { MediaFolderType } from '@/components/MediaLibrary/interface';
import _ from 'lodash';

import { MediaType } from './types';

function setupPathStack(file: MediaType, isDir: boolean = false): string[] {
  const paths = file.path.split('/');
  if (!isDir) {
    paths.pop();
    paths.push(file.name);
  }
  paths.reverse();

  return paths;
}

export function updateFolder(root: MediaType | {}, payload: MediaFolderType): MediaType | {} {
  if (Object.keys(root).length < 1) return {};
  const folder = findFolder(root as MediaType, payload);
  if (!folder) return root;
  const stack: MediaFolderType[] = [folder];

  while (stack.length > 0) {
    const currentDir = stack.pop();

    if (currentDir) {
      _.forEach(currentDir.children, (child) => {
        child.path = child.path.replace(folder.name, payload.name);
        if (child.isDir) {
          stack.push(child);
        }
      });
    }
  }
  folder.path = folder.path.replace(folder.name, payload.name);
  folder.name = payload.name;

  return root;
}

export function appendMediaFile(root: MediaType | {}, payload: MediaType): MediaType | {} {
  if (Object.keys(root).length < 1) return {};
  const paths = setupPathStack(payload);
  const stack: MediaType[] = [root as MediaType];
  while (paths.length > 0) {
    const currentDir = stack.pop();
    const path = paths.pop();

    if (currentDir && path) {
      const index = _.findIndex(currentDir.children, (childNode) => childNode.name === path);
      const child = currentDir.children[index];
      if (child && child.isDir && paths.length > 0) {
        stack.push(child);
      } else {
        currentDir.children.push(payload);
      }
    }
  }

  return { ...root };
}

export function reduceMediaFile(root: MediaType | {}, payload: MediaType[]): MediaType | {} {
  if (Object.keys(root).length < 1) return {};

  _.forEach(payload, (file) => {
    file.isDir ? deleteFolder(root as MediaType, file) : deleteFile(root as MediaType, file);
  });

  return { ...root };
}

function findFolder(root: MediaType, folder: MediaType): MediaFolderType | undefined {
  const result: MediaFolderType[] = [];
  const paths = setupPathStack(folder, true);
  const stack: MediaType[] = [root as MediaType];
  while (paths.length > 0) {
    const currentDir = stack.pop();
    const path = paths.pop();

    if (currentDir && path) {
      const index = _.findIndex(currentDir.children, (childNode) => childNode.name === path);
      const child = currentDir.children[index];

      if (child.isDir && paths.length > 0) {
        stack.push(child);
      } else {
        result.push(child);
      }
    }
  }

  return result.pop();
}

function deleteFolder(root: MediaType, folder: MediaType): void {
  const paths = setupPathStack(folder);
  const stack: MediaType[] = [root as MediaType];
  while (paths.length > 0) {
    const currentDir = stack.pop();
    const path = paths.pop();

    if (currentDir && path) {
      const index = _.findIndex(currentDir.children, (childNode) => childNode.name === path);
      const child = currentDir.children[index];

      if (child.isDir && paths.length > 0) {
        stack.push(child);
      } else {
        currentDir.children.splice(index, 1);
      }
    }
  }
}

function deleteFile(root: MediaType, file: MediaType): void {
  const paths = setupPathStack(file);
  const stack: MediaType[] = [root as MediaType];
  while (paths.length > 0) {
    const currentDir = stack.pop();
    const path = paths.pop();

    if (currentDir && path) {
      const index = _.findIndex(currentDir.children, (childNode) => childNode.name === path);
      const child = currentDir.children[index];
      if (child.isDir) {
        stack.push(child);
      } else {
        currentDir.children.splice(index, 1);
      }
    }
  }
}
