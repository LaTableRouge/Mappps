import { useSelect } from '@wordpress/data'
import { useMemo } from '@wordpress/element'

export default function GetTaxonomies(postType = '') {
  const fetchedTaxonomies = useSelect((select) => select('core').getTaxonomies({ type: postType }), [postType])

  const result = useMemo(() => {
    if (!fetchedTaxonomies) {
      return {
        taxonomies: null,
        resolved: false
      }
    }

    /* eslint-disable camelcase */
    return {
      taxonomies: fetchedTaxonomies.map(({ name, rest_base, slug }) => ({
        slug,
        name,
        rest_base
      })),
      resolved: true
    }
    /* eslint-enable camelcase */
  }, [fetchedTaxonomies])

  return result
}
