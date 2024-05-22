import { SelectControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function SelectTaxonomy(props) {
  const { setAttributes, taxonomies, allTaxonomies } = props

  const options = [{ label: __('All', 'maaaps'), value: 'all' }]
  taxonomies.forEach((slug) => {
    let associatedTaxonomy = allTaxonomies.filter((taxonomy) => taxonomy.slug === slug)
    if (associatedTaxonomy.length) {
      associatedTaxonomy = associatedTaxonomy[0]
    }

    options.push({ label: associatedTaxonomy.name, value: associatedTaxonomy.slug })
  })

  return (
    <SelectControl
      label={__('Taxonomies', 'maaaps')}
      options={options}
      onChange={(value, label) => {
        setAttributes({ taxonomy: value })
      }}
    />
  )
}
