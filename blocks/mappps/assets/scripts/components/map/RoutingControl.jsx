import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

import { createControlComponent } from '@react-leaflet/core'
import L from 'leaflet'

import Icon from './Icon'

const createRoutineMachineLayer = ({ color, position, vehicle = 'foot', waypoints = [] }) => {
  const instance = L.Routing.control({
    waypointMode: 'connect',
    router: new L.Routing.OSRMv1({
      serviceUrl: `https://routing.openstreetmap.de/routed-${vehicle}/route/v1`,
      language: navigator.language,
      profile: 'foot',
      useHints: false
    }),
    position,
    waypoints,
    lineOptions: {
      styles: [
        {
          color,
          weight: 9
        }
      ]
    },
    createMarker: function (i, waypoint) {
      const marker = L.marker(waypoint.latLng, {
        bounceOnAdd: false,
        icon: Icon('', '40px', false, false)
      })
      return marker
    }
  })

  return instance
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine

// http://router.project-osrm.org/match/v1/foot/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?overview=false
// https://router.project-osrm.org/match/v1/foot/5.564620156866192,43.52390661569973;5.569644460682694,43.52891447827957;5.568646706583539,43.53004472740702;5.5672987444254325,43.53134087862774;5.571181326812017,43.53317278909519;5.578499570754197,43.53167406954244;5.580488761796884,43.53086233907482?overview=false&alternatives=true&steps=true&hints=;;;;;;
