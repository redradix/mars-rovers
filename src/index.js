const isMoving = command => command === 'f' || command === 'b'
const isTurning = command => command === 'l' || command === 'r'

const getTurnedOrientation = (command, orientation) => {
  const TURNED_ORIENTATIONS = {
    l: {
      N: 'W',
      S: 'E',
      E: 'N',
      W: 'S'
    }, 
    r: {
      N: 'E',
      S: 'W',
      E: 'S',
      W: 'N'
    }
  }

  return TURNED_ORIENTATIONS[command][orientation]
}

const getVariation = (command, orientation) => {
  const VARIATIONS = {
    f: {
      N: [0, 1],
      S: [0, -1],
      E: [1, 0],
      W: [-1, 0]
    },
    b: {
      N: [0, -1],
      S: [0, 1],
      E: [-1, 0],
      W: [1, 0]
    }
  }

  return VARIATIONS[command][orientation]
}

const getNewCoordinate = (prevCoordinate, variation, gridSize) => {
  const [prevCoordinateX, prevCoordinateY] = prevCoordinate
  const [variationX, variationY] = variation

  let [newCoordinateX, newCoordinateY] = [prevCoordinateX + variationX, prevCoordinateY + variationY]

  if (newCoordinateX > gridSize || newCoordinateX < 0) {
    newCoordinateX = prevCoordinateX
  }
  
  if (newCoordinateY > gridSize || newCoordinateY < 0) {
    newCoordinateY = prevCoordinateY
  }

  return [newCoordinateX, newCoordinateY]
}

const move = (position, commands, gridSize) => {
  if (!commands.length) return position

  const [command, ...rest] = commands.split('')

  const [x, y, orientation] = position
  const coordinate = [x, y]

  if (isMoving(command)) {
    const variation = getVariation(command, orientation)
    const newCoordinate = getNewCoordinate(coordinate, variation, gridSize)
    return move([...newCoordinate, orientation], rest.join(''), gridSize)
  }

  if (isTurning(command)) {
    const newOrientation = getTurnedOrientation(command, orientation)
    return move([...coordinate, newOrientation], rest.join(''), gridSize)
  }
}

module.exports = move