import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ElevatorDirection,
  IElevatorDirectionMove,
  IElevatorDoorsOpening,
  IElevatorState,
  IFloorChange
} from './types';

const MIN_FLOOR = 1;

const initialState: IElevatorState = {
  // <elevatorId, queuedFloor[]>
  queuedFloors: {},
  // <elevatorId, activeFloor>
  activeFloors: {},
  // <elevatorId, isDoorOpened>
  doorsOpening: {},
};

export const elevatorSlice = createSlice({
  name: 'elevatorSlice',
  initialState,
  reducers: {
    initElevators: (state: IElevatorState, {payload}: PayloadAction<number>) => {
      state.queuedFloors = {};
      state.activeFloors = {};
      state.doorsOpening = {};

      for (let i = 0; i < payload; i++) {
        const elevatorId = (i * 1000).toString();
        state.queuedFloors[elevatorId] = [];
        state.activeFloors[elevatorId] = MIN_FLOOR;
        state.doorsOpening[elevatorId] = false;
      }
    },
    removeReachedFloor: (
      state: IElevatorState,
      {payload: {elevatorId, floorNumber}}: PayloadAction<IFloorChange>
    ) => {
      state.queuedFloors[elevatorId] =
        state.queuedFloors[elevatorId]!.filter(floor => floor !== floorNumber);
    },
    pushTargetFloor: (
      state: IElevatorState,
      {payload: {elevatorId, floorNumber}}: PayloadAction<IFloorChange>,
    ) => {
      state.queuedFloors[elevatorId].push(floorNumber);
    },
    moveActiveFloor: (
      state: IElevatorState,
      {payload: {elevatorId, direction}}: PayloadAction<IElevatorDirectionMove>
    ) => {
      const floor = state.activeFloors[elevatorId]!;

      if(direction === ElevatorDirection.Up) {
        state.activeFloors[elevatorId] = floor + 1;
      }
      else if (direction === ElevatorDirection.Down && floor > MIN_FLOOR) {
        state.activeFloors[elevatorId] = floor - 1;
      }
    },
    setOpenDoors: (
      state: IElevatorState,
      {payload: {elevatorId, isOpened}}: PayloadAction<IElevatorDoorsOpening>,
    ) => {
      state.doorsOpening[elevatorId] = isOpened;
    }
  },
});

export const {
  initElevators,
  pushTargetFloor,
  removeReachedFloor,
  moveActiveFloor,
  setOpenDoors,
} = elevatorSlice.actions;

export default elevatorSlice.reducer;
