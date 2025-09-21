import '../styles/editor.scss'

import { BlockContextProvider, useBlockProps } from '@wordpress/block-editor'
import { memo, useEffect, useMemo, useState } from '@wordpress/element'

import Controls from './components/Controls'
import Header from './components/post/Header'
import PostTemplateInnerBlocks from './components/PostTemplateInnerBlocks'
import PostTemplatePreview from './components/PostTemplatePreview'
import AlterBlockProps from './utils/AlterBlockProps'
import GetBlocks from './utils/GetBlocks'

export default function Edit({ attributes, clientId, context, isSelected, setAttributes }) {
	const blockId = context['mppps/blockId']

	const blockProps = useBlockProps()

	const [activeBlockContextId, setActiveBlockContextId] = useState()
	const [posts, setPosts] = useState([])
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		async function eventSetPosts(e) {
			await e
			const details = e.detail
			if (details.id === blockId) {
				setPosts(details.posts)
			}
		}

		document.addEventListener('mppps-queried-posts', eventSetPosts)
		return () => {
			document.removeEventListener('mppps-queried-posts', eventSetPosts)
		}
	}, [blockId])

	const blockContexts = useMemo(
		() =>
			posts.slice(0, 1).map((post) => ({
				postType: post.type,
				postId: post.id
			})),
		[posts]
	)

	const MemorizedPostTemplateBlockPreview = memo(PostTemplatePreview)

	const blocks = GetBlocks(clientId)

	useEffect(() => {
		if (!isSelected) {
			setIsExpanded(false)
		}
	}, [isSelected])

	return (
		<div {...AlterBlockProps(blockProps, attributes)} data-expanded={isExpanded}>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			{blockContexts
				&& blockContexts.map((blockContext) => (
					<BlockContextProvider key={blockContext.postId} value={blockContext}>
						<Header isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

						{/* Editable block */}
						{blockContext.postId === (activeBlockContextId || blockContexts[0]?.postId) ? <PostTemplateInnerBlocks /> : null}
						{/* Other blocks just for the preview */}
						<MemorizedPostTemplateBlockPreview blockContextId={blockContext.postId} blocks={blocks} isHidden={blockContext.postId === (activeBlockContextId || blockContexts[0]?.postId)} setActiveBlockContextId={setActiveBlockContextId} />
					</BlockContextProvider>
				))}
		</div>
	)
}
