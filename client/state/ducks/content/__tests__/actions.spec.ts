import { action } from 'typesafe-actions';

import { createContent, deleteContent, fetchContents, setContent, updateContent } from '../actions';
import { ContentActionTypes, ContentEntity } from '../types';

import contentData from './__mockData__/contentData';

describe('content actions', () => {
  // FETCH: Test if the correct function is called when fetching Contents.
  it('fetch contents', () => {
    const expectedAction = action(ContentActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/contents',
    });

    expect(fetchContents()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Content.
  it('create content', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/contents`,
    });

    expect(createContent(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Content.
  it('update content', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/contents/${payload._id}`,
    });

    expect(updateContent(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Content.
  it('delete content', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/contents/${payload._id}`,
    });

    expect(deleteContent(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Content.
  it('set content', () => {
    const payload: ContentEntity = contentData[1];
    const expectedAction = action(ContentActionTypes.SET.START, payload);

    expect(setContent(payload)).toEqual(expectedAction);
  });
});
