import _ from 'lodash';
import { MediaType, MediaFolderType, MediaImageType, MediaLibraryItems } from '@/types';

import { Bytes } from '@/constants';

namespace MediaHelpers {
  export function formatBytes(bytes: number) {
    const i = Math.ceil(Math.log(bytes) / Bytes.kilobyte);

    return (bytes / Math.pow(Bytes.kilobyte, i)).toFixed(2) + ' ' + Bytes.byteSizes[i];
  }

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
