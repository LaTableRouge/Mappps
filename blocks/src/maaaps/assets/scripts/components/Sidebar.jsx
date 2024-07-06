import { InnerBlocks, RichText } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

import Search from './sidebar/Search'

export default function Sidebar({ displaySearch, limitedSearch, posts, selectedPost, setAttributes, setFilteredPosts, setSelectedPost, setSelectedSearchResult, title }) {
  return (
    <aside className="maaaps__sidebar">
      <header className="sidebar__heading">
        <RichText
          allowedFormats={['core/bold', 'core/italic']}
          className="heading__title"
          placeholder={__('Your map', 'maaaps')}
          tagName="h2"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
        />

        {displaySearch && (
          <Search limitedSearch={limitedSearch} posts={posts} setAttributes={setAttributes} setFilteredPosts={setFilteredPosts} setSelectedSearchResult={setSelectedSearchResult} />
        )}
      </header>

      <InnerBlocks template={[['mps/post-template', {}]]} />
      {/* <div className="sidebar__articles-wrapper">
        {posts.map((post, index) => (
          <Article key={index} post={post} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
        ))}
      </div> */}
    </aside>
  )
}
