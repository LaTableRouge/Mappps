import { useSelect } from '@wordpress/data'
import { useEffect } from '@wordpress/element'

export default function GetTaxonomies(postType = '', attributes, setAttributes) {
  const fetchedTaxonomies = useSelect(
    (select) => {
      const { getTaxonomies } = select('core')

      return getTaxonomies({ type: postType })
    },
    [postType]
  )

  useEffect(() => {
    if (fetchedTaxonomies) {
      if (attributes.taxonomies !== fetchedTaxonomies) {
        setAttributes({ taxonomies: fetchedTaxonomies })
      }
    }
  }, [fetchedTaxonomies])
}
