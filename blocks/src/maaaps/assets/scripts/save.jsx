import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet/dist/leaflet.css'
import '@changey/react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { useBlockProps } from '@wordpress/block-editor'

import Loader from './components/Loader'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save()

  return (
    <section {...AlterBlockProps(blockProps, attributes)} data-attributes={JSON.stringify(attributes)}>
      <Loader />
    </section>
  )
}
