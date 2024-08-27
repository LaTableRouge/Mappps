import { __ } from '@wordpress/i18n'

export default function Terms({ termList }) {
  if (!termList.length) {
    return ''
  }

  return (
    <ul className="article__terms-wrapper">
      {termList.map((term, key) =>
        term.categories.map((category, subkey) => (
          <li key={subkey} className={`terms-wrapper__term terms-wrapper__term--${key}`}>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a className="custom-button custom-button__normal" href={category.link} target="_blank" title={__('Open in new tab', 'mappps')}>
              {category.name}
            </a>
          </li>
        ))
      )}
    </ul>
  )
}
