import { useSelect } from '@wordpress/data'
import { useMemo } from '@wordpress/element'

const POST_TYPES_TO_EXCLUDE = [
  'page',
  'attachment',
  'nav_menu_item',
  'wp_block',
  'wp_template',
  'wp_template_part',
  'wp_navigation',
  'wp_global_styles',
  'wp_font_family',
  'wp_font_face'
]

export default function GetPostTypes() {
  const postTypes = useSelect((select) => select('core').getPostTypes({ per_page: -1 }), [])

  const result = useMemo(() => {
    if (!postTypes) {
      return {
        types: null,
        resolved: false
      }
    }

    return {
      types: postTypes.filter((postType) => !POST_TYPES_TO_EXCLUDE.includes(postType.slug)),
      resolved: true
    }
  }, [postTypes])

  return result
}
