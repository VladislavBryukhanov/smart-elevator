import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISettingsState} from './types';

const initialState: ISettingsState = {
  elevatorsAmount: 1,
  floorsAmount: 5,
  movingDelay: 1000,
};

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    setSettings: (
      state: ISettingsState,
      {payload: {elevatorsAmount, floorsAmount, movingDelay}}: PayloadAction<Partial<ISettingsState>>
    ) => {
      if (!!elevatorsAmount) {
        state.elevatorsAmount = elevatorsAmount;
      }
      if (!!floorsAmount) {
        state.floorsAmount = floorsAmount;
      }
      if (!!movingDelay) {
        state.movingDelay = movingDelay;
      }
    }
  },
});

export const {setSettings} = settingsSlice.actions;

export default settingsSlice.reducer;
