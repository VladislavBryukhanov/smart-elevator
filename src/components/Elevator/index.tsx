import React from 'react';
import {useSelector} from 'react-redux';
import {selectDoorsOpening} from '@store/elevator/selectors';
import {DoorElevator, WrapperDoors} from './styles';

interface IElevatorProps {
  elevatorKey: string;
}

const Elevator = ({elevatorKey}: IElevatorProps) => {
  const doorsOpening = useSelector(selectDoorsOpening);

  const isOpened = doorsOpening[elevatorKey]!;

  return (
    <WrapperDoors>
      <DoorElevator open={isOpened} side='left' />
      <DoorElevator open={isOpened} side='right' />
    </WrapperDoors>
  );
};

export default Elevator;
