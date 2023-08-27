import {findBestLocatedElevator} from '.'

describe('findBestLocatedElevator', () => {
  test('should find least queued elevator', () => {
    expect(findBestLocatedElevator(
      {
        '1234': [1, 2, 3],
        '4321': [5, 6, 7],
        '999': [2],
        '0000': [1, 9]
      },
      {
        '1234': 1,
        '4321': 1,
        '0000': 1
      },
      8
    )).toEqual('999');

    expect(findBestLocatedElevator(
      {
        '1234': [1, 2, 3],
        '4321': [9, 1],
        '0000': [1, 7, 2]
      },
      {
        '1234': 1,
        '4321': 1,
        '0000': 1
      },
      4
    )).toEqual('4321');
  });

  test('should find better located queued elevator', () => {
    expect(
      findBestLocatedElevator(
        {
          '1234': [2, 5, 9],
          '4321': [2, 5, 8],
          '0000': [2, 4, 6]
        },
        {
          '1234': 1,
          '4321': 1,
          '0000': 1
        },
        7
      )
    ).toEqual('0000');

    expect(
      findBestLocatedElevator(
        {
          '1234': [1, 5, 9],
          '4321': [2, 5, 8],
          '0000': [1, 4, 6]
        },
        {
          '1234': 5,
          '4321': 1,
          '0000': 9
        },
        8
      )
    ).toEqual('4321');

    expect(
      findBestLocatedElevator(
        {
          '1234': [1, 2, 3],
          '4321': [2, 5, 8],
          '0000': [1, 9, 3]
        },
        {
          '1234': 2,
          '4321': 1,
          '0000': 1
        },
        4
      )
    ).toEqual('1234');
  });
})
