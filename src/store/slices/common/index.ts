import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../..';

interface CommonState {
  isMobile: boolean;
  isMobileOnly: boolean;
}

const initialState: CommonState = {
  isMobile: true,
  isMobileOnly: true,
};
const setViewPort = (state: CommonState, { payload }: PayloadAction<number>) => {
  const windowWidth = payload;
  state.isMobile = windowWidth <= 768;
  state.isMobileOnly = windowWidth <= 480;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setViewPort,
  },
});

// Actions
export const commonActions = commonSlice.actions;

// Reducer
export const commonReducer = commonSlice.reducer;

// Selectors
export const selectIsMobile = (state: AppState) => state.common.isMobile;

export const selectIsMobileOnly = (state: AppState) => state.common.isMobileOnly;
