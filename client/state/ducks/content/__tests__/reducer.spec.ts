import { action } from 'typesafe-actions';

import { fetchContents } from '../actions';
import { contentReducer, initialState } from '../reducer';
import { ContentActionTypes } from '../types';

import contentData from './__mockData__/contentData';

describe('content reducer', () => {
  it('reducer initial', () => {
    expect(contentReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(contentReducer(initialState, fetchContents())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(
      contentReducer(initialState, action(ContentActionTypes.FETCH.SUCCESS, contentData)),
    ).toEqual({
      ...initialState,
      data: contentData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...contentData] };
    expect(
      contentReducer(currentState, action(ContentActionTypes.CREATE.SUCCESS, contentData[0])),
    ).toEqual({
      ...currentState,
      data: [...contentData, contentData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...contentData] };
    const newContent = { ...contentData[0], name: 'Test gruppe' };
    expect(
      contentReducer(currentState, action(ContentActionTypes.UPDATE.SUCCESS, newContent)),
    ).toEqual({
      ...currentState,
      data: [newContent, ...contentData.slice(1, contentData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...contentData] };
    expect(
      contentReducer(currentState, action(ContentActionTypes.DELETE.SUCCESS, contentData[0])),
    ).toEqual({
      ...currentState,
      data: contentData.slice(1, contentData.length),
    });
  });

  it('reducer set content', () => {
    expect(
      contentReducer(initialState, action(ContentActionTypes.SET.START, contentData[0])),
    ).toEqual({
      ...initialState,
      byId: contentData[0],
    });
  });

  it('reducer set content to null', () => {
    const currentState = { ...initialState, byId: contentData[0] };
    expect(contentReducer(currentState, action(ContentActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
