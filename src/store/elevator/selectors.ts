import {RootState} from '..'

export const selectQueuedFloors = (state: RootState) => state.elevator.queuedFloors;
export const selectActiveFloors = (state: RootState) => state.elevator.activeFloors;
export const selectDoorsOpening = (state: RootState) => state.elevator.doorsOpening;
