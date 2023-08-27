import {ReactNode, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useElevatorFloorHandler} from '@hooks/useElevatorFloorHandler';
import {useStoreDispatch} from '@store/index';
import {pushTargetFloor} from '@store/elevator/slice';
import {findBestLocatedElevator} from '@utils/index';
import {AbsoluteCenter} from '@/styles';
import {selectActiveFloors, selectQueuedFloors} from '@/store/elevator/selectors';
import {ActiveFloorNumber, BuildingFloorsWrapper, BuildingWrapper, ShellElevator} from "./styles";
import { selectSettings } from '@store/settings/selectors';
import Elevator from '../Elevator';

export const Building = () => {
  const dispatch = useStoreDispatch();
  const settings = useSelector(selectSettings);
  const activeFloors = useSelector(selectActiveFloors);
  const queuedFloors = useSelector(selectQueuedFloors);

  useElevatorFloorHandler(settings.elevatorsAmount);

  const getElevatorFloorsElements = useCallback((elevatorId: string) => {
    const floors: ReactNode[] = [];
    const elevatorsFloors = Object.entries(activeFloors);

    if (!elevatorsFloors.length) return [];

    for (let floorNumber = +settings.floorsAmount; floorNumber >= 1; floorNumber--) {
      floors.push((
        <ShellElevator
          key={floorNumber}
          onClick={() => {
            const elevatorId = findBestLocatedElevator(queuedFloors, activeFloors, floorNumber);
            dispatch(pushTargetFloor({elevatorId, floorNumber}))
          }}
        >
          <AbsoluteCenter>
            <ActiveFloorNumber>
              {floorNumber}
            </ActiveFloorNumber>
          </AbsoluteCenter>
          {activeFloors[elevatorId] === floorNumber && <Elevator elevatorKey={elevatorId} />}
        </ShellElevator>
      ));
    }

    return floors;
  }, [settings, activeFloors, queuedFloors]);

  return (
    <BuildingWrapper>
      {Object.keys(activeFloors).map(id => (
        <BuildingFloorsWrapper key={id}>
          {getElevatorFloorsElements(id)}
        </BuildingFloorsWrapper>
      ))}
    </BuildingWrapper>
  );
};
