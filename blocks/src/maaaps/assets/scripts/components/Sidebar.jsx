import { RichText } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

import Article from './sidebar/Article'
import Filters from './sidebar/Filters'
import Search from './sidebar/Search'

export default function Sidebar({
  displaySearch,
  limitedSearch,
  posts,
  selectedFilters,
  selectedPost,
  setAttributes,
  setSearchValue,
  setSelectedFilters,
  setSelectedPost,
  setSelectedSearchResult,
  title
}) {
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

        {displaySearch && <Search limitedSearch={limitedSearch} setSearchValue={setSearchValue} setSelectedSearchResult={setSelectedSearchResult} />}

        <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </header>

      <div className="sidebar__articles-wrapper">
        {posts.map((post, index) => (
          <Article key={index} post={post} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
        ))}
      </div>
    </aside>
  )
}
