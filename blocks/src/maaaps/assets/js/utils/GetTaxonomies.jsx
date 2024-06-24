import { useSelect } from '@wordpress/data'

export default function GetTaxonomies(postType = '') {
  const fetchedTaxonomies = useSelect(
    (select) => {
      const { getTaxonomies } = select('core')

      return getTaxonomies({ type: postType })
    },
    [postType]
  )

  return fetchedTaxonomies
}
