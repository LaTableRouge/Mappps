import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { memo, useCallback, useEffect, useMemo, useState } from '@wordpress/element'

import PostTemplatePreview from './components/PostTemplatePreview'
import AlterBlockProps from './utils/AlterBlockProps'
import GetBlocks from './utils/GetBlocks'

const MemorizedPostTemplateBlockPreview = memo(PostTemplatePreview)

export default function Edit({ attributes, clientId, context, setAttributes }) {
	const blockId = context['mppps/blockId']
	const blockProps = useBlockProps()
	const blocks = GetBlocks(clientId)

	const [activeBlockContextId, setActiveBlockContextId] = useState()
	const [posts, setPosts] = useState([])

	const handlePostsEvent = useCallback(
		async (e) => {
			const details = e.detail
			if (details.id === blockId) {
				setPosts(details.posts)
			}
		},
		[blockId]
	)

	useEffect(() => {
		document.addEventListener('mppps-queried-posts', handlePostsEvent)
		return () => {
			document.removeEventListener('mppps-queried-posts', handlePostsEvent)
		}
	}, [handlePostsEvent])

	const blockContexts = useMemo(
		() =>
			posts.slice(0, 2).map((post) => ({
				postType: post.type,
				postId: post.id
			})),
		[posts]
	)

	const activePostId = activeBlockContextId || blockContexts[0]?.postId

	return (
		<nav {...AlterBlockProps(blockProps, attributes)}>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<ul>
				{blockContexts?.map((blockContext) => (
					<BlockContextProvider key={blockContext.postId} value={blockContext}>
						{blockContext.postId === activePostId && <PostTemplateInnerBlocks />}
						<MemorizedPostTemplateBlockPreview blockContextId={blockContext.postId} blocks={blocks} isHidden={blockContext.postId === activePostId} setActiveBlockContextId={setActiveBlockContextId} />
					</BlockContextProvider>
				))}
			</ul>
		</nav>
	)
}
