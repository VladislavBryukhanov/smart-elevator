export enum ElevatorDirection {
  Up = 'up',
  Down = 'down',
}

export interface IFloorChange extends IBaseAction {
  floorNumber: number;
}

export interface IElevatorDirectionMove extends IBaseAction {
  direction: ElevatorDirection,
}

export interface IElevatorDoorsOpening extends IBaseAction {
  isOpened: boolean;
}

interface IBaseAction {
  elevatorId: string;
}

export interface IElevatorState {
  activeFloors: Record<string, number>;
  queuedFloors: Record<string, number[]>;
  doorsOpening: Record<string, boolean>;
}
