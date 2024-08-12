export const formatUnitlessValue = (value, unit = 'px') => {
  if (!`${value}`.includes(unit)) {
    value = `${value}${unit}`
  }

  return value
}

export const sluggify = (e) => {
  if (e) {
    return e
      .normalize('NFD') // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, '-') // separator
  }
}

export const getConfigFromAttributes = (attributes) => {
  return Object.fromEntries(Object.entries(attributes).filter(([key]) => key !== 'blockId'))
}

export const delay = (n) => {
  n = n || 2000
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}

export const sortStickyPosts = (posts) => {
  return posts.sort((a, b) => {
    if (a.sticky) {
      return -1
    }
    if (b.sticky) {
      return 1
    }
    return 0
  })
}

export const isColorLight = (hexColor = '', threshold = 128) => {
  hexColor = hexColor.substring(1) // strip #
  const rgb = parseInt(hexColor, 16) // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >> 8) & 0xff // extract green
  const b = (rgb >> 0) & 0xff // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma < threshold ? 'dark' : 'light'
}

export const sortObject = (object) =>
  Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})
