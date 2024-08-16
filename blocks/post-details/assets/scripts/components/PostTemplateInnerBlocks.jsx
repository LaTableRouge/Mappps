import { useInnerBlocksProps } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function PostTemplateInnerBlocks() {
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
            aspectRatio: '16/9'
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
            [
              'core/post-terms',
              {
                term: 'category'
              }
            ],
            [
              'core/post-terms',
              {
                term: 'post_tag'
              }
            ],
            [
              'core/post-excerpt',
              {
                moreText: __('Read more', 'maaaps'),
                excerptLength: 100
              }
            ]
          ]
        ]
      ]
    ]
  ]

  const innerBlocksProps = useInnerBlocksProps({ className: 'post-details__record' }, { template: TEMPLATE, __unstableDisableLayoutClassNames: true, templateLock: false })
  return <div {...innerBlocksProps} />
}
