/* Copyright (c) 2012 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http:// en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http:// en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
*/
import L from 'leaflet'
;(function () {
  L.QuickHull = {
    /*
     * @param {Object} cpt a point to be measured from the baseline
     * @param {Array} bl the baseline, as represented by a two-element
     *   array of latlng objects.
     * @returns {Number} an approximate distance measure
     */
    getDistant: function (cpt, bl) {
      const vY = bl[1].lat - bl[0].lat
      const vX = bl[0].lng - bl[1].lng
      return vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng)
    },

    /*
     * @param {Array} baseLine a two-element array of latlng objects
     *   representing the baseline to project from
     * @param {Array} latLngs an array of latlng objects
     * @returns {Object} the maximum point and all new points to stay
     *   in consideration for the hull.
     */
    findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
      let maxD = 0
      let maxPt = null
      const newPoints = []
      let i
      let pt
      let d

      for (i = latLngs.length - 1; i >= 0; i--) {
        pt = latLngs[i]
        d = this.getDistant(pt, baseLine)

        if (d > 0) {
          newPoints.push(pt)
        } else {
          continue
        }

        if (d > maxD) {
          maxD = d
          maxPt = pt
        }
      }

      return { maxPoint: maxPt, newPoints: newPoints }
    },

    /*
     * Given a baseline, compute the convex hull of latLngs as an array
     * of latLngs.
     *
     * @param {Array} latLngs
     * @returns {Array}
     */
    buildConvexHull: function (baseLine, latLngs) {
      let convexHullBaseLines = []
      const t = this.findMostDistantPointFromBaseLine(baseLine, latLngs)

      if (t.maxPoint) {
        //  if there is still a point "outside" the base line
        convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints))
        convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints))
        return convexHullBaseLines
      } else {
        //  if there is no more point "outside" the base line, the current base line is part of the convex hull
        return [baseLine[0]]
      }
    },

    /*
     * Given an array of latlngs, compute a convex hull as an array
     * of latlngs
     *
     * @param {Array} latLngs
     * @returns {Array}
     */
    getConvexHull: function (latLngs) {
      //  find first baseline
      let maxLat = false
      let minLat = false
      let maxLng = false
      let minLng = false
      let maxLatPt = null
      let minLatPt = null
      let maxLngPt = null
      let minLngPt = null
      let maxPt = null
      let minPt = null
      let i

      for (i = latLngs.length - 1; i >= 0; i--) {
        const pt = latLngs[i]
        if (maxLat === false || pt.lat > maxLat) {
          maxLatPt = pt
          maxLat = pt.lat
        }
        if (minLat === false || pt.lat < minLat) {
          minLatPt = pt
          minLat = pt.lat
        }
        if (maxLng === false || pt.lng > maxLng) {
          maxLngPt = pt
          maxLng = pt.lng
        }
        if (minLng === false || pt.lng < minLng) {
          minLngPt = pt
          minLng = pt.lng
        }
      }

      if (minLat !== maxLat) {
        minPt = minLatPt
        maxPt = maxLatPt
      } else {
        minPt = minLngPt
        maxPt = maxLngPt
      }

      const ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs), this.buildConvexHull([maxPt, minPt], latLngs))
      return ch
    }
  }
})()

L.MarkerCluster.include({
  getConvexHull: function () {
    const childMarkers = this.getAllChildMarkers()
    const points = []
    let p
    let i

    for (i = childMarkers.length - 1; i >= 0; i--) {
      p = childMarkers[i].getLatLng()
      points.push(p)
    }

    return L.QuickHull.getConvexHull(points)
  }
})
