import { action } from 'typesafe-actions';

import { ContentActionTypes, ContentEntity } from '@/types';

import {
  clear,
  createContent,
  deleteContent,
  fetchContents,
  setContent,
  updateContent,
} from '../actions';

import contentData from './__mockData__/contentData';

describe('content actions', () => {
  it('should call @@content.FETCH.START', () => {
    const expectedAction = action(ContentActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/contents',
    });

    expect(fetchContents()).toEqual(expectedAction);
  });

  it('should call @@content.CREATE.START', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/contents`,
    });

    expect(createContent(payload)).toEqual(expectedAction);
  });

  it('should call @@content.UPDATE.START', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/contents/${payload._id}`,
    });

    expect(updateContent(payload)).toEqual(expectedAction);
  });

  it('should call @@content.DELETE.START', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/contents/${payload._id}`,
    });

    expect(deleteContent(payload)).toEqual(expectedAction);
  });

  it('should call @@content.SET.START', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.SET.START, payload);

    expect(setContent(payload)).toEqual(expectedAction);
  });

  it('should call @content.CLEAR', () => {
    const expectedAction = action(ContentActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
