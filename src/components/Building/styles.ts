import styled from 'styled-components';

export const ShellElevator = styled.div`
  width: 70px;
  height: 60px;
  background: ${props => props.theme.colors.elevator};
  border-radius: 8px;

  position: relative;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
  border-bottom: 15px solid #c48383;
`;

export const ActiveFloorNumber = styled.div`
  width: 20px;
  height: 10px;
  padding: 1px;
  border-radius: 4px;
  margin-top: 10px;
  background: azure;
  overflow: hidden;
  font-size: 10px;
  text-align: center;
`;

export const BuildingFloorsWrapper = styled.div`
  padding: 0 2px 0;
  row-gap: 3px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.floorBorders};
`;

export const BuildingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
