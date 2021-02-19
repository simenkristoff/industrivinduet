import { MediaImageType, MediaFolderType } from '@/types';

export const mediaFolderMock: MediaFolderType = {
  path: 'profiler',
  name: 'profiler',
  isDir: true,
  size: 0,
  children: [
    {
      path: 'profiler/default.png',
      name: 'default',
      isDir: false,
      size: 8957,
      ext: '.png',
      children: [],
    },
  ],
};

export const mediaImageMock: MediaImageType = {
  path: 'profiler/defaulttest.png',
  name: 'defaulttest',
  isDir: false,
  size: 8957,
  ext: '.png',
  children: [],
};

export const mediaDirectoryMock: MediaFolderType = {
  path: '',
  name: '',
  isDir: true,
  size: 0,
  children: [
    {
      path: 'bedrifter',
      name: 'bedrifter',
      isDir: true,
      size: 0,
      children: [
        {
          path: 'bedrifter/cowi.png',
          name: 'cowi',
          isDir: false,
          size: 8904,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/dnv-gl.png',
          name: 'dnv-gl',
          isDir: false,
          size: 17897,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/equinor.png',
          name: 'equinor',
          isDir: false,
          size: 37056,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/kongsberg.png',
          name: 'kongsberg',
          isDir: false,
          size: 92539,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/kvaerner.png',
          name: 'kvaerner',
          isDir: false,
          size: 19639,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/schlumberger.png',
          name: 'schlumberger',
          isDir: false,
          size: 2354,
          ext: '.png',
          children: [],
        },
      ],
    },
    {
      path: 'profiler',
      name: 'profiler',
      isDir: true,
      size: 0,
      children: [
        {
          path: 'profiler/default.png',
          name: 'default',
          isDir: false,
          size: 8957,
          ext: '.png',
          children: [],
        },
      ],
    },
  ],
};

export const mediaDirectoryMockUpdated: MediaFolderType = {
  path: '',
  name: '',
  isDir: true,
  size: 0,
  children: [
    {
      path: 'bedrifter',
      name: 'bedrifter',
      isDir: true,
      size: 0,
      children: [
        {
          path: 'bedrifter/cowi.png',
          name: 'cowi',
          isDir: false,
          size: 8904,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/dnv-gl.png',
          name: 'dnv-gl',
          isDir: false,
          size: 17897,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/equinor.png',
          name: 'equinor',
          isDir: false,
          size: 37056,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/kongsberg.png',
          name: 'kongsberg',
          isDir: false,
          size: 92539,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/kvaerner.png',
          name: 'kvaerner',
          isDir: false,
          size: 19639,
          ext: '.png',
          children: [],
        },
        {
          path: 'bedrifter/schlumberger.png',
          name: 'schlumberger',
          isDir: false,
          size: 2354,
          ext: '.png',
          children: [],
        },
      ],
    },
    {
      path: 'profiler',
      name: 'profiler',
      isDir: true,
      size: 0,
      children: [
        {
          path: 'profiler/default.png',
          name: 'default',
          isDir: false,
          size: 8957,
          ext: '.png',
          children: [],
        },
        {
          path: 'profiler/defaulttest.png',
          name: 'defaulttest',
          isDir: false,
          size: 8957,
          ext: '.png',
          children: [],
        },
      ],
    },
  ],
};
