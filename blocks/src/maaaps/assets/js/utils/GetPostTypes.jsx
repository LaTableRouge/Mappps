import { useSelect } from '@wordpress/data'

// Get all post types and filter them with an array of unwanted ones
export default function GetPostTypes() {
  let postTypes = useSelect((select) => select('core').getPostTypes({ per_page: -1 })) ?? []
  const postTypesToExclude = ['page', 'attachment', 'nav_menu_item', 'wp_block', 'wp_template', 'wp_template_part', 'wp_navigation', 'wp_font_family', 'wp_font_face']
  if (postTypes.length) {
    postTypes = postTypes.filter((postType) => !postTypesToExclude.includes(postType.slug))
  }

  return postTypes
}
