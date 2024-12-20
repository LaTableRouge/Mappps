import '../styles/editor.scss'

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { useMemo } from '@wordpress/element'

import Controls from './components/Controls'
import { AlterBlockProps } from './utils/AlterBlockProps'

const TEMPLATE = [
  ['mppps/searchbar', {}],
  ['mppps/filters-toggle', {}],
  ['mppps/post-template', {}]
]

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()
  const modifiedProps = useMemo(() => AlterBlockProps(blockProps, attributes), [blockProps, attributes])

  return (
    <aside {...modifiedProps}>
      <Controls attributes={attributes} setAttributes={setAttributes} />
      <InnerBlocks template={TEMPLATE} templateLock={false} />
    </aside>
  )
}
