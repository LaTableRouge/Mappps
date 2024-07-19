import { __ } from '@wordpress/i18n'
export default function Terms({ termList }) {
  if (!termList.length) {
    return ''
  }

  return (
    <ul className="article__terms-wrapper">
      {termList.map((term, key) => (
        <li key={key} className="terms-wrapper__term">
          <div className="term__title">{term.taxonomyName}</div>
          <ul className="term__list">
            {term.categories.map((category, key) => (
              <li key={key} className="list__category">
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href={category.link} target="_blank" title={__('Open in new tab', 'maaaps')}>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
