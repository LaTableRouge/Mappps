import { __ } from '@wordpress/i18n'

import Article from './sidebar/Article'
import Search from './sidebar/Search'

export default function Sidebar({
  displayFilters,
  displaySearch,
  filtersOpen,
  limitedSearch,
  postRefs,
  posts,
  selectedFiltersCounter,
  selectedPost,
  setFiltersOpen,
  setMobileIsMapDisplayed,
  setSearchValue,
  setSelectedPost,
  setSelectedSearchResult
}) {
  return (
    <aside className="maaaps__sidebar">
      <header className="sidebar__heading">
        {displaySearch && (
          <Search
            limitedSearch={limitedSearch}
            setMobileIsMapDisplayed={setMobileIsMapDisplayed}
            setSearchValue={setSearchValue}
            setSelectedSearchResult={setSelectedSearchResult}
          />
        )}

        {displayFilters && (
          <>
            <div className="sidebar__filters-wrapper">
              <button
                aria-label={filtersOpen ? __('Close filters', 'maaaps') : __('Open filters', 'maaaps')}
                className="custom-button custom-button__with-icon filters-wrapper__toggle"
                title={filtersOpen ? __('Close filters', 'maaaps') : __('Open filters', 'maaaps')}
                onClick={(e) => {
                  e.preventDefault()

                  setFiltersOpen(!filtersOpen)
                  setSelectedPost({})
                }}
              >
                {__('Filters', 'maaaps')}
                {!!selectedFiltersCounter && <span className="counter">{selectedFiltersCounter}</span>}
                <span className="icon-maaaps-filter"></span>
              </button>
            </div>
          </>
        )}
      </header>

      <div className="sidebar__articles-wrapper">
        {posts.map((post, index) => (
          <Article
            key={index}
            post={post}
            postRef={postRefs.current[index]}
            selectedPost={selectedPost}
            setFiltersOpen={setFiltersOpen}
            setMobileIsMapDisplayed={setMobileIsMapDisplayed}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </div>
    </aside>
  )
}
