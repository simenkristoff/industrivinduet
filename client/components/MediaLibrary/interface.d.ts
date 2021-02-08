import { MediaState, MediaType } from '@/state/ducks/media/types';
import { RcFile } from 'antd/lib/upload';

export type MediaFolderType = {} & MediaType;

export type MediaImageType = {
  ext: string;
} & MediaType;

export interface MediaLibraryItems {
  directories: MediaFolderType[];
  images: MediaImageType[];
}

export interface MediaHeaderInterface {
  path: string;
  dirNames: string[];
  uploadFile: (file: File, path: string) => void;
  createFolder: (folder: MediaFolderType) => void;
  onBack: () => void;
}

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

export interface MediaFolderInterface {
  data: MediaFolderType;
  dirNames: string[];
  deleteFile: (file: MediaType) => void;
  updateFolder: (folder: MediaFolderType) => void;
  onSelect: (data: MediaType, ref: React.RefObject<HTMLDivElement>) => void;
  onFolderClick: (path: string) => void;
}

export interface NewFolderInterface {
  dirNames: string[];
  path: string;
  createFolder: (folder: MediaFolderType) => void;
}

export interface MediaImageInterface {
  data: MediaImageType;
  inModal: boolean;
  deleteFile: (file: MediaType) => void;
  onSelect: (data: MediaType, ref: React.RefObject<HTMLDivElement>) => void;
  onImageSelect: (image: MediaImageType) => MediaImageType;
}
