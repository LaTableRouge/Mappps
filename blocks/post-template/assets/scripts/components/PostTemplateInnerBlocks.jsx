import { useInnerBlocksProps } from '@wordpress/block-editor'
import { memo } from '@wordpress/element'

const TEMPLATE = [
	[
		'core/columns',
		{
			verticalAlignment: 'center',
			isStackedOnMobile: false,
			style: {
				spacing: {
					padding: {
						right: '2rem',
						left: '2rem',
						top: '10px',
						bottom: '10px'
					},
					margin: { top: '0', bottom: '0' }
				},
				border: {
					top: {
						color: 'var(--color-gray-100)',
						width: '1px'
					}
				}
			}
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
						'core/post-date',
						{
							style: {
								spacing: { margin: { top: '0', bottom: '0' } },
								typography: { fontSize: '14px' }
							},
							metadata: {
								bindings: {
									datetime: {
										source: 'core/post-data',
										args: {
											key: 'date'
										}
									}
								}
							}
						}
					],
					[
						'core/post-title',
						{
							level: 3,
							style: {
								spacing: { margin: { top: '0', bottom: '0' } },
								typography: {
									fontSize: '1rem',
									fontWeight: 700
								}
							}
						}
					]
				]
			]
		]
	]
]

function PostTemplateInnerBlocks() {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'post-template__record' },
		{
			template: TEMPLATE,
			__unstableDisableLayoutClassNames: true
		}
	)

	return <li {...innerBlocksProps} />
}

export default memo(PostTemplateInnerBlocks)
