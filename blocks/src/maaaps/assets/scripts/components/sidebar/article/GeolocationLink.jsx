import { __ } from '@wordpress/i18n'

export default function GeolocationLink({ lat, lng }) {
  return (
    <a className="article__geolocation-link" href={`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`} rel="noreferrer" target="_blank">
      <span className="icon-maaaps-marker"></span>
      <span>{__('View itinerary', 'maaaps')}</span>
    </a>
  )
}
