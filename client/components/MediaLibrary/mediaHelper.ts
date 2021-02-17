import _ from 'lodash';

import { MediaType, MediaFolderType, MediaImageType, MediaLibraryItems } from '@/types';
import { Bytes } from '@/constants';
/**
 * Helper functions for the media library
 * @namespace MediaHelpers
 * @function formatBytes
 * @function renderTree
 */
namespace MediaHelpers {
  /**
   * Converts byte prefix
   * @memberof MediaHelpers
   * @param {number} bytes filesize
   * @return {string} converted bytes
   */
  export function formatBytes(bytes: number): string {
    const i = Math.ceil(Math.log(bytes) / Bytes.kilobyte);

    return (bytes / Math.pow(Bytes.kilobyte, i)).toFixed(2) + ' ' + Bytes.byteSizes[i];
  }

  /**
   * Sorts a directory into folders and files.
   * @memberof MediaHelpers
   * @param {MediaType} baseDir the root directory
   * @param {string} folder the path of the folder to render. Relative to baseDir
   * @return {MediaLibraryItems} directories, images
   */
  export function renderTree(baseDir: MediaType | {}, folder?: string): MediaLibraryItems {
    const directories: MediaFolderType[] = [];
    const images: MediaImageType[] = [];

    let dir = baseDir as MediaType;

    if (folder) {
      const paths = folder.split('/').reverse();
      while (paths.length) {
        const pathPiece = paths.pop();
        dir = _.find(dir.children, (value) => value.name === pathPiece && value.isDir)!;
      }
    }

    dir.children.map((child) => {
      if (child.isDir) directories.push(child);
      if (!child.isDir && child.ext !== undefined) images.push(child as MediaImageType);
    });

    return { directories, images };
  }
}

export default MediaHelpers;
