import L from 'leaflet'

export default function IconCustom({ cluster, haveShadow = false, isSelected = false, markerSize = 40, picture, type = '' }) {
  const aspectRatio = 1
  const markerSizeInt = parseInt(markerSize, 10)
  const isClusterType = type === 'cluster'

  // Calculate dimensions based on aspect ratio
  const width = markerSizeInt
  const height = Math.round(markerSizeInt / aspectRatio)

  // Calculate icon size and anchor based on the actual dimensions
  const iconSize = [width, height]
  const iconAnchor = [width / 2, height]

  const html = `
    <div class="marker-icon">
      <img
        src="${picture.url}"
        alt="${picture.alt}"
        width="${width}"
        height="${height}"
        class="marker-icon__image"
      />
      ${isClusterType ? `<div class="marker-icon__child-count">${cluster.getChildCount()}</div>` : ''}
      ${haveShadow ? '<div class="marker-icon__pulse"></div>' : ''}
    </div>
  `

  const className = `custom-marker ${type ? `custom-marker--${type}` : ''} ${isSelected ? 'custom-marker--active' : ''}`

  return L.divIcon({
    html,
    iconSize,
    iconAnchor,
    className: className.trim(),
    popupAnchor: [0, -height]
  })
}
