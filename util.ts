export const api = {
  key: 'e3ffd189a0c01d5be48924b6d0ea6af7',
  base: 'https://api.openweathermap.org/data/2.5/',
}

export const getBackground = (temperature?: number) => {
  let background = 'hot'
  if (temperature) {
    if (temperature < 5) {
      background = 'cold'
    } else if (temperature < 15) {
      background = 'cool'
    } else if (temperature < 25) {
      background = 'warm'
    }
  }
  return background
}
