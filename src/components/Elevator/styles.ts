import styled, {css} from 'styled-components';
import { AbsoluteCenter } from '@/styles';

export const WrapperDoors = styled(AbsoluteCenter)`
  bottom: -14px;
  display: flex;
  overflow: hidden;
`;

interface IDoorElevator {
  open: boolean;
  side: 'left' | 'right'
}

function transformOpenDoors(props: IDoorElevator) {
  return css`transform: translateX(${props.open ? (props.side === 'left' ? '-20px' : '20px') : '0px'});`
}

export const DoorElevator = styled.div<IDoorElevator>`
  background: white;
  border: 1px solid black;
  height: 34px;
  width: 20px;
  transition: linear;
  transition-duration: 1s;
  ${props => transformOpenDoors(props)}
`;
