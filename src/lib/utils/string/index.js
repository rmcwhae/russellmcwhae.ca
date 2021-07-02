export function createTitle(filename) {
  return filename.substring(0, filename.indexOf('_')).replaceAll('-', ' ')
}

export function extractDate(filename) {
  return filename.substring(filename.indexOf('_') + 1).replace('-', ' ')
}