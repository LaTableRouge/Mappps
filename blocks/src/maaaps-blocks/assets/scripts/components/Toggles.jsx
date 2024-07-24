import { __ } from '@wordpress/i18n'

export default function Toggles({ mobileIsMapDisplayed, setMobileIsMapDisplayed }) {
  return (
    <div className="maaaps__toggles-wrapper">
      {mobileIsMapDisplayed
        ? (
        <button
          className="toggles-wrapper__button toggles-wrapper__button--list"
          onClick={(e) => {
            e.preventDefault()
            setMobileIsMapDisplayed(false)
          }}
        >
          {__('See the list', 'maaaps')}
        </button>
          )
        : (
        <button
          className="toggles-wrapper__button toggles-wrapper__button--map"
          onClick={(e) => {
            e.preventDefault()
            setMobileIsMapDisplayed(true)
          }}
        >
          {__('See the map', 'maaaps')}
        </button>
          )}
    </div>
  )
}
