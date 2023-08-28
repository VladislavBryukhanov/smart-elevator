const MAX_FLOOR = 999;

export const findBestLocatedElevator = (
  queuedFloors: Record<string, number[]>,
  activeFloors: Record<string, number>,
  targetFloor: number,
) => {
  const queuedFloorsArray = Object.entries(queuedFloors);
  const [[initElevatorId, initFloorsList]] = queuedFloorsArray;

  const concurrentElevators = queuedFloorsArray.filter(([elevatorIdA, floorsA]) =>
    queuedFloorsArray.some(
      ([elevatorIdB, floorsB]) => elevatorIdA !== elevatorIdB && floorsA.length === floorsB.length
    )
  );
  
  const {elevatorId: leastQueuedElevatorId} = queuedFloorsArray
    .reduce((acc, [elevatorId, floors]) => {
      if (floors.length < acc.minFloorsLength) {
        acc.elevatorId = elevatorId;
        acc.minFloorsLength = floors.length;
      }
      acc.prevFloorsLength = floors.length;

      return acc;
    }, {
      elevatorId: '',
      prevFloorsLength: initFloorsList.length,
      minFloorsLength: MAX_FLOOR,
    });

  const [[, concurrentFloors] = []]= concurrentElevators;

  if (leastQueuedElevatorId && (
    !concurrentElevators.length || queuedFloors[leastQueuedElevatorId].length < concurrentFloors!.length
  )) {
    return leastQueuedElevatorId;
  }

  const {elevatorId: nearestElevatorId} = concurrentElevators
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