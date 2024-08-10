import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEntityRecord } from '@wordpress/core-data'

import Controls from './components/Controls'
import Main from './main'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Edit({ attributes, context, isSelected, setAttributes }) {
  const postType = context['mps/postType']
  const postIDs = context['mps/postIDs']

  // BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps()

  // attributes are the states stored by Wordpress
  // They are defined in the block.json

  const posts = []
  if (postIDs.length) {
    postIDs.slice(0, 3).forEach((id) => {
      const { record } = useEntityRecord('postType', postType, id)
      if (record) {
        posts.push({
          title: record.title.raw,
          id: record.id,
          meta: record.meta,
          excerpt: record.excerpt.raw
        })
      }
    })
  }

  return (
    <div {...AlterBlockProps(blockProps, attributes)}>
      {!!posts.length && (
        <>
          <Controls attributes={attributes} setAttributes={setAttributes} />
          <Main attributes={attributes} queriedPosts={posts} />
        </>
      )}
    </div>
  )
}
