import L from 'leaflet'

const createMarkerSvg = (markerSize) => `
  <svg
    version="1.1"
    xmlns:serif="http://www.serif.com/"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 40 40"
    width="${markerSize}"
    height="${markerSize}"
    style="enable-background:new 0 0 40 40;"
    xml:space="preserve"
  >
    <path
      d="M20,2.6c-7.2,0-13.3,5.8-13.3,13.3c0,3,2.1,7.4,6,13c3,4,6,7.2,6,7.4l1.2,1.2l1.2-1.2c0.2-0.2,3-3.3,6-7.4 c4.2-5.6,6-10,6-13C33.3,8.4,27.2,2.6,20,2.6z M20,20.5c-2.6,0-4.9-2.1-4.9-4.9s2.1-4.9,4.9-4.9s4.9,2.1,4.9,4.9S22.6,20.5,20,20.5z"
    />
  </svg>
`

const createClusterSvg = (markerSize) => `
  <svg
    version="1.1"
    xmlns:serif="http://www.serif.com/"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 40 40"
    width="${markerSize}"
    height="${markerSize}"
    style="enable-background:new 0 0 40 40;"
    xml:space="preserve"
  >
    <path
      d="M33.3,15.2c0-7.4-6-13.3-13.3-13.3S6.7,7.8,6.7,15.2c0,3.7,1.5,7.1,4,9.5c2.5,2.5,4.8,5.8,6.5,8.5S20,38,20,38
      s1.1-2.1,2.8-4.8c1.7-2.7,4-6.1,6.5-8.5S33.3,18.9,33.3,15.2z M20,20.6c-2.9,0-5.2-2.3-5.2-5.2c0-2.8,2.3-5.2,5.2-5.2
      s5.2,2.3,5.2,5.2C25.2,18.2,22.9,20.6,20,20.6z"
    />
    <circle cx="20" cy="15.4" r="8.1" />
  </svg>
`

export default function Icon(type, markerSize = '40px', cluster, isSelected = false) {
  // let isInCluster = false
  // const clusterChildMarkers = cluster.getAllChildMarkers()
  // if (isSelected) {
  //   for (const clusterChildMarker of clusterChildMarkers) {
  //     if (clusterChildMarker.options.data.id === isSelected.id) {
  //       isInCluster = true
  //     }
  //   }
  // }

  const markerSizeInt = parseInt(markerSize, 10)
  const isClusterType = type === 'cluster'

  const html = `
    <div class="marker-icon">
      ${isClusterType ? createClusterSvg(markerSize) : createMarkerSvg(markerSize)}
      ${isClusterType ? `<div class="marker-icon__child-count">${cluster.getChildCount()}</div>` : ''}
      <div class="marker-icon__pulse"></div>
    </div>
  `

  const className = `custom-marker ${type ? `custom-marker--${type}` : ''} ${isSelected ? 'custom-marker--active' : ''}`

  return L.divIcon({
    html,
    iconSize: [markerSizeInt, markerSizeInt],
    iconAnchor: [markerSizeInt / 2, markerSizeInt],
    className: className.trim(),
    popupAnchor: [0, -markerSizeInt]
  })
}
