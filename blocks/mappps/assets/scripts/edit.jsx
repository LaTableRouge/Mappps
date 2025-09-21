import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useState } from '@wordpress/element'

import Controls from './components/Controls'
import Wizard from './components/Wizard'
import Main from './main'
import AlterBlockProps from './utils/AlterBlockProps'
import GetPostTypes from './utils/GetPostTypes'

export default function Edit({ attributes, isSelected, setAttributes }) {
	// ---------- attributes are the states stored by Wordpress
	// They are defined in the block.json
	// ----------

	// ---------- BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
	const blockProps = useBlockProps()
	// ----------

	// ----------States that aren't stored by Wordrpess
	// They are only usefull for the preview
	const [queriedPosts, setQueriedPosts] = useState([]) // all posts fetched by the query
	// ----------

	// ---------- Other variables
	const postTypes = GetPostTypes()
	// ----------

	if (attributes.selectedPosts.length) {
		return (
			<section {...AlterBlockProps(blockProps, attributes)}>
				<Controls attributes={attributes} postTypes={postTypes} queriedPosts={queriedPosts} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />

				<Main attributes={attributes} inEditor={true} isSelected={isSelected} queriedPosts={queriedPosts} />
			</section>
		)
	} else {
		return (
			<section {...AlterBlockProps(blockProps, attributes)}>
				<Wizard attributes={attributes} postTypes={postTypes} setAttributes={setAttributes} setQueriedPosts={setQueriedPosts} />
			</section>
		)
	}
}
