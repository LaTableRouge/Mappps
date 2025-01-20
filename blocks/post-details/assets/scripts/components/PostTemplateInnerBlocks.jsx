import { useInnerBlocksProps } from '@wordpress/block-editor'
import { memo } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

const TEMPLATE = [
  [
    'core/group',
    {
      style: {
        spacing: {
          blockGap: '2rem'
        }
      }
    },
    [
      [
        'core/post-featured-image',
        {
          aspectRatio: '16/9',
          style: {
            border: {
              radius: '0px'
            }
          }
        }
      ],
      [
        'core/group',
        {
          style: {
            spacing: {
              padding: {
                right: '2rem',
                left: '2rem'
              }
            }
          }
        },
        [
          [
            'core/post-title',
            {
              level: 3,
              style: {
                typography: {
                  fontSize: '1.5rem',
                  fontStyle: 'normal',
                  fontWeight: 700
                }
              }
            }
          ],
          ['core/post-terms', { term: 'category' }],
          ['core/post-terms', { term: 'post_tag' }],
          [
            'core/post-excerpt',
            {
              moreText: __('Read more', 'mappps'),
              excerptLength: 100
            }
          ]
        ]
      ]
    ]
  ]
]

function PostTemplateInnerBlocks() {
  const innerBlocksProps = useInnerBlocksProps(
    { className: 'post-details__record' },
    {
      template: TEMPLATE,
      __unstableDisableLayoutClassNames: true,
      templateLock: false
    }
  )

  return <div {...innerBlocksProps} />
}

export default memo(PostTemplateInnerBlocks)
