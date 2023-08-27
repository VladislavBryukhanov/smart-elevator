export const findBestLocatedElevator = (queuedFloors: Record<string, number[]>) => {
  const {elevatorId: leastQueuedElevatorId, isEqual} = Object.entries(queuedFloors)
    .reduce((acc, [elevatorId, floors]) => {
      if (acc.prevFloorsLength !== floors.length) {
        acc.isEqual = false;
      }
      if (floors.length < acc.prevFloorsLength) {
        acc.elevatorId = elevatorId;
      }
      acc.prevFloorsLength = floors.length;

      return acc;
    }, {
      elevatorId: '',
      prevFloorsLength: 0,
      isEqual: true
    });

  if (!isEqual && leastQueuedElevatorId) {
    return leastQueuedElevatorId;
  }

  const {elevatorId: nearestElevatorId} = Object.entries(queuedFloors)
    .reduce((acc, [elevatorId, floors]) => {
      acc.elevatorId ||= elevatorId;

      const floorsDiff = calculateQueuedFloorsDiff(floors);

      if (floorsDiff <= acc.minFloorsDiff) {
        return {
          elevatorId,
          minFloorsDiff: floorsDiff,
        };
      }
      return acc;
    }, {
      elevatorId: '',
      minFloorsDiff: 0,
    });

  return nearestElevatorId;
}

const calculateQueuedFloorsDiff = (floors: number[]) => {
  const {diff} = floors.reduce((acc, floor: number) => {
    acc.diff += Math.abs(floor - acc.prevFloor);
    acc.prevFloor = floor;

    return acc;
  }, {
    prevFloor: 0,
    diff: 0,
  });

  return diff;
}