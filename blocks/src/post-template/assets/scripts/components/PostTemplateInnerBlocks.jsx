import { useInnerBlocksProps } from '@wordpress/block-editor'

export default function PostTemplateInnerBlocks() {
  const TEMPLATE = [
    [
      'core/columns',
      {
        verticalAlignment: 'center',
        isStackedOnMobile: false
      },
      [
        [
          'core/column',
          {
            width: '33.33%',
            verticalAlignment: 'center'
          },
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
            ]
          ]
        ],
        [
          'core/column',
          {
            width: '66.66%',
            verticalAlignment: 'center'
          },
          [
            [
              'core/post-title',
              {
                level: 3,
                style: {
                  typography: {
                    fontSize: '15px'
                  }
                }
              }
            ]
          ]
        ]
      ]
    ]
  ]

  const innerBlocksProps = useInnerBlocksProps({ className: 'post-template__record' }, { template: TEMPLATE, __unstableDisableLayoutClassNames: true })
  return <li {...innerBlocksProps} />
}
