import apiFetch from '@wordpress/api-fetch'
import { useEffect, useRef, useState } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'

export default function QueryData(url) {
  // are we loading the posts?
  const [isLoading, setLoading] = useState(true)
  // the posts we're displaying
  const [posts, setPosts] = useState([])
  // we don't want to update state on an unmounted component
  const isStillMounted = useRef()

  useEffect(() => {
    isStillMounted.current = true
    apiFetch({
      // TODO: custom url for other query points
      path: addQueryArgs('/wp/v2/posts', {})
    })
      .then((data) => {
        if (isStillMounted.current) {
          if (data.length) {
            data = data.filter((post) => !!post.meta.lat && !!post.meta.lng)
          }
          setPosts(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isStillMounted.current) {
          setPosts([])
          setLoading(false)
        }
      })
  }, [setPosts, setLoading, isStillMounted])

  return {
    mounted: isStillMounted,
    loading: isLoading,
    posts
  }
}
