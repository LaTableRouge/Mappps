import '../styles/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

import Controls from './components/Controls'
import Loader from './components/Loader'
import AlterBlockProps from './utils/AlterBlockProps'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()
  const alteredProps = AlterBlockProps(blockProps, attributes)

  return (
    <div {...alteredProps}>
      <Controls attributes={attributes} setAttributes={setAttributes} />

      <div className="loader__helper-text" data-status="loading">
        {__('Waiting for data to be loaded', 'mappps')}
        <span className="helper-text__animate">.</span>
        <span className="helper-text__animate">.</span>
        <span className="helper-text__animate">.</span>
      </div>

      <div className="loader__helper-text" data-status="idle">
        {__('Click me to load the block', 'mappps')}
      </div>

      <Loader />
    </div>
  )
}
