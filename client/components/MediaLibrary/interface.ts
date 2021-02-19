import { MediaState, MediaType, MediaFolderType, MediaImageType } from '@/types';

/**
 * Interface for items to display in current directory
 * @interface MediaLibraryItems
 */
export interface MediaLibraryItems {
  directories: MediaFolderType[];
  images: MediaImageType[];
}

/**
 * Interface for MediaHeader component props
 * @interface MediaHeaderInterface
 */
export interface MediaHeaderInterface {
  path: string;
  dirNames: string[];
  uploadFile: (file: File, path: string) => void;
  createFolder: (folder: MediaFolderType) => void;
  onBack: () => void;
}

/**
 * Interface for MediaGallery component props
 * @interface MediaGalleryInterface
 */
export interface MediaGalleryInterface {
  data: MediaLibraryItems;
  dirNames: string[];
  inModal: boolean;
  deleteFile: (file: MediaType) => void;
  updateFolder: (folder: MediaFolderType) => void;
  handleSelect: (data: MediaType, ref: React.RefObject<HTMLDivElement>) => void;
  handleFolderClick: (path: string) => void;
  handleImageSelect: (image: MediaImageType) => MediaImageType;
}

/**
 * Interface for MediaLibrary component props
 * @interface MediaLibraryInterface
 */
export interface MediaLibraryInterface {
  fileData: MediaState;
  path: string;
  inModal: boolean;
  uploadFile: (file: File, path: string) => void;
  deleteFile: (file: MediaType) => void;
  createFolder: (folder: MediaFolderType) => void;
  updateFolder: (folder: MediaFolderType) => void;
  handleBackClick: () => void;
  handleSelect: (data: MediaType, ref: React.RefObject<HTMLDivElement>) => void;
  handleFolderClick: (path: string) => void;
  handleImageSelect: (image: MediaImageType) => MediaImageType;
}

/**
 * Interface for MediaFolder component props
 * @interface MediaFolderInterface
 */
export interface MediaFolderInterface {
  data: MediaFolderType;
  dirNames: string[];
  deleteFile: (file: MediaType) => void;
  updateFolder: (folder: MediaFolderType) => void;
  onSelect: (data: MediaType, ref: React.RefObject<HTMLDivElement>) => void;
  onFolderClick: (path: string) => void;
}

/**
 * Interface for NewFolder component props
 * @interface NewFolderInterface
 */
export interface NewFolderInterface {
  dirNames: string[];
  path: string;
  createFolder: (folder: MediaFolderType) => void;
}

/**
 * Interface for MediaImage component props
 * @interface MediaImageInterface
 */
export interface MediaImageInterface {
  data: MediaImageType;
  inModal: boolean;
  deleteFile: (file: MediaType) => void;
  onSelect: (data: MediaType, ref: React.RefObject<HTMLDivElement>) => void;
  onImageSelect: (image: MediaImageType) => MediaImageType;
}
