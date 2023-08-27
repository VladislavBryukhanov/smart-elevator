import {useEffect, useMemo, useRef} from 'react';
import {ElevatorDirection} from '@store/elevator/types';
import {useStoreDispatch} from '@store/index';
import {initElevators, moveActiveFloor, removeReachedFloor, setOpenDoors} from '@store/elevator/slice';
import {selectActiveFloors, selectDoorsOpening, selectQueuedFloors} from '@store/elevator/selectors';
import {selectSettings} from '@store/settings/selectors';
import {useSelector} from 'react-redux';

export const useElevatorFloorHandler = (elevatorsAmount: number) => {
  const dispatch = useStoreDispatch();
  const settings = useSelector(selectSettings);
  const activeFloors = useSelector(selectActiveFloors);
  const queuedFloors = useSelector(selectQueuedFloors);
  const doorsOpening = useSelector(selectDoorsOpening);

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    dispatch(initElevators(elevatorsAmount));
  }, [elevatorsAmount]);

  const nearestTargets = useMemo(() =>
    Object.entries(queuedFloors).reduce((acc, [id, floors]) => {
      acc[id] = [...floors].shift()!;

      return acc;
    }, {} as Record<string, number>),
    [queuedFloors],
  );

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      Object.entries(activeFloors).forEach(([elevatorId, activeFloor]) => {
        const targetFloor = nearestTargets[elevatorId];
        const isDoorOpened = doorsOpening[elevatorId];

        if (!targetFloor) return;

        if (!isDoorOpened && targetFloor === activeFloor) {
          dispatch(setOpenDoors({elevatorId, isOpened: true}));
        }

        if (isDoorOpened && targetFloor === activeFloor) {
          return setTimeout(() => {
            dispatch(setOpenDoors({elevatorId, isOpened: false}));
            dispatch(removeReachedFloor({elevatorId, floorNumber: targetFloor}));
          }, settings.movingDelay);
        }

        if (activeFloor > targetFloor) {
          return dispatch(moveActiveFloor({elevatorId, direction: ElevatorDirection.Down}));
        }

        if (activeFloor < targetFloor) {
          return dispatch(moveActiveFloor({elevatorId, direction: ElevatorDirection.Up}));
        }
      });
    }, settings.movingDelay);
  }, [nearestTargets, activeFloors, doorsOpening]);
};
