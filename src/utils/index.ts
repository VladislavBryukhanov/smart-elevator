const MAX_FLOOR = 999;

export const findBestLocatedElevator = (
  queuedFloors: Record<string, number[]>,
  activeFloors: Record<string, number>,
  targetFloor: number,
) => {
  const [[initElevatorId, initFloorsList]] = Object.entries(queuedFloors);

  const {elevatorId: leastQueuedElevatorId, isEqual} = Object.entries(queuedFloors)
    .reduce((acc, [elevatorId, floors]) => {
      if (acc.prevFloorsLength !== floors.length) {
        acc.isEqual = false;
      }
      if (floors.length < acc.minFloorsLength) {
        acc.elevatorId = elevatorId;
        acc.minFloorsLength = floors.length;
      }
      acc.prevFloorsLength = floors.length;

      return acc;
    }, {
      elevatorId: initElevatorId,
      prevFloorsLength: initFloorsList.length,
      minFloorsLength: MAX_FLOOR,
      isEqual: true
    });

  if (!isEqual && leastQueuedElevatorId) {
    return leastQueuedElevatorId;
  }

  const {elevatorId: nearestElevatorId} = Object.entries(queuedFloors)
    .reduce((acc, [elevatorId, floors]) => {
      const floorsDiff = calculateQueuedFloorsDiff(activeFloors[elevatorId], [...floors, targetFloor]);

      if (floorsDiff <= acc.minFloorsDiff) {
        return {
          elevatorId,
          minFloorsDiff: floorsDiff,
        };
      }
      return acc;
    }, {
      elevatorId: initElevatorId,
      minFloorsDiff: MAX_FLOOR,
    });

  return nearestElevatorId;
}

const calculateQueuedFloorsDiff = (initialFloor: number, floors: number[]) => {
  const {diff} = floors.reduce((acc, floor: number) => {
    acc.diff += Math.abs(floor - acc.prevFloor);
    acc.prevFloor = floor;

    return acc;
  }, {
    prevFloor: initialFloor,
    diff: 0,
  });

  return diff;
}