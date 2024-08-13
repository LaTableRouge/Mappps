import { useInnerBlocksProps } from '@wordpress/block-editor'

export default function PostTemplateInnerBlocks() {
  const TEMPLATE = [
    [
      'core/group',
      {},
      [
        [
          'core/post-featured-image',
          {
            aspectRatio: '1',
            style: {
              border: {
                radius: '5px'
              }
            }
          }
        ],
        [
          'core/post-title',
          {
            level: 3,
            style: {
              typography: {
                fontSize: '15px'
              },
              padding: {
                left: '20px',
                right: '20px'
              }
            }
          }
        ]
      ]
    ]
  ]

  const innerBlocksProps = useInnerBlocksProps({ className: 'post-details__record' }, { template: TEMPLATE, __unstableDisableLayoutClassNames: true })
  return <div {...innerBlocksProps} />
}
