import { __ } from '@wordpress/i18n'
export default function Header({ isExpanded, setIsExpanded }) {
  return (
    <div className="header__cta-wrapper">
      <button
        aria-label={isExpanded ? __('Shrink', 'mappps') : __('Expand', 'mappps')}
        className="custom-button custom-button__only-icon cta-wrapper__expand"
        title={isExpanded ? __('Shrink', 'mappps') : __('Expand', 'mappps')}
        onClick={(e) => {
          e.preventDefault()

          setIsExpanded(!isExpanded)
        }}
      >
        <span className={isExpanded ? 'icon-mappps-shrink' : 'icon-mappps-enlarge'}></span>
        <span className="screen-reader-text">{__('Expand/Shrink', 'mappps')}</span>
      </button>

      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a className="custom-button custom-button__only-icon cta-wrapper__new-tab" target="_blank" title={__('Open in new tab', 'mappps')}>
        <span className="icon-mappps-new-tab"></span>
        <span className="screen-reader-text">{__('Open in new tab', 'mappps')}</span>
      </a>

      <a className="custom-button custom-button__only-icon cta-wrapper__map" rel="noreferrer" target="_blank" title={__('View itinerary', 'mappps')}>
        <span className="icon-mappps-map"></span>
        <span className="screen-reader-text">{__('View itinerary', 'mappps')}</span>
      </a>

      <button aria-label={__('Close preview', 'mappps')} className="custom-button custom-button__only-icon cta-wrapper__close" title={__('Close preview', 'mappps')}>
        <span className="icon-mappps-cross"></span>
        <span className="screen-reader-text">{__('Close preview', 'mappps')}</span>
      </button>
    </div>
  )
}
