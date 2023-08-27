import {Provider} from 'react-redux';
import {AnyAction, Store} from '@reduxjs/toolkit';
import configureStore, {MockStoreCreator, MockStoreEnhanced} from 'redux-mock-store';
import {renderHook, waitFor} from '@testing-library/react'
import {useElevatorFloorHandler} from './useElevatorFloorHandler'
import {initElevators, moveActiveFloor, removeReachedFloor, setOpenDoors} from '@store/elevator/slice';
import {ElevatorDirection} from '@store/elevator/types';

const getWrapper = (store: Store<any, AnyAction>): React.FC =>
  ({ children }: { children?: React.ReactNode }) => <Provider store={store}>{children}</Provider>;

const elevatorId = '1000';
const targetFloor = 3;

const commonSettings = {
  elevatorsAmount: 1,
  floorsAmount: 5,
  movingDelay: 10,
};

describe('useElevatorFloorHandler hook', () => {
  let storeCreator: MockStoreCreator<any, AnyAction>;

  beforeEach(() => {
    storeCreator = configureStore<any, AnyAction>([]);
  });

  test('should initiate elevators store with necessary amount of elevators', () => {
    const elevatorsAmount = 2;

    const mockStore = storeCreator({
      elevator: {
        queuedFloors: {},
        activeFloors: {},
        doorsOpening: {},
      },
      settings: {
        elevatorsAmount: elevatorsAmount,
        floorsAmount: 5,
        movingDelay: 10,
      }
    });

    const wrapper = getWrapper(mockStore);

    renderHook(() => useElevatorFloorHandler(elevatorsAmount), { wrapper });

    expect(mockStore.getActions()).toContainEqual(initElevators(elevatorsAmount));
  });


  test('should move single elevator UP to target floor', async () => {
    const mockStore = storeCreator({
      elevator: {
        queuedFloors: {
          [elevatorId]: [targetFloor],
        },
        activeFloors: {
          [elevatorId]: targetFloor - 1,
        },
        doorsOpening: {
          [elevatorId]: false,
        },
      },
      settings: commonSettings
    });
  
    const wrapper = getWrapper(mockStore);

    renderHook(() => useElevatorFloorHandler(1), { wrapper });

    await waitFor(() => expect(mockStore.getActions()).toContainEqual(
      moveActiveFloor({elevatorId, direction: ElevatorDirection.Up})
    ));
  });

  test('should move single elevator DOWN to target floor', async () => {
    const mockStore = storeCreator({
      elevator: {
        queuedFloors: {
          [elevatorId]: [targetFloor],
        },
        activeFloors: {
          [elevatorId]: targetFloor + 1,
        },
        doorsOpening: {
          [elevatorId]: false,
        },
      },
      settings: commonSettings
    });
  
    const wrapper = getWrapper(mockStore);

    renderHook(() => useElevatorFloorHandler(1), { wrapper });

    await waitFor(() => expect(mockStore.getActions()).toContainEqual(
      moveActiveFloor({elevatorId, direction: ElevatorDirection.Down})
    ));
  });

  test('should open the doors if floor is reached', async () => {
    const mockStore = storeCreator({
      elevator: {
        queuedFloors: {
          [elevatorId]: [targetFloor],
        },
        activeFloors: {
          [elevatorId]: targetFloor,
        },
        doorsOpening: {
          [elevatorId]: false,
        },
      },
      settings: commonSettings
    });
  
    const wrapper = getWrapper(mockStore);

    renderHook(() => useElevatorFloorHandler(1), { wrapper });

    await waitFor(() => expect(mockStore.getActions()).toContainEqual(
      setOpenDoors({elevatorId, isOpened: true})
    ));
  });

  test('should close the doors and remove floor from queue if it was successfully reached and opened', async () => {
    const mockStore = storeCreator({
      elevator: {
        queuedFloors: {
          [elevatorId]: [targetFloor],
        },
        activeFloors: {
          [elevatorId]: targetFloor,
        },
        doorsOpening: {
          [elevatorId]: true,
        },
      },
      settings: commonSettings
    });
  
    const wrapper = getWrapper(mockStore);

    renderHook(() => useElevatorFloorHandler(1), { wrapper });

    await waitFor(() => expect(mockStore.getActions()).toContainEqual(
      setOpenDoors({elevatorId, isOpened: false}),
    ));
    await waitFor(() => expect(mockStore.getActions()).toContainEqual(
      removeReachedFloor({elevatorId, floorNumber: targetFloor}),
    ));
  });
});
