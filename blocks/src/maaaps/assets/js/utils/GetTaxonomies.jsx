import apiFetch from '@wordpress/api-fetch'
import { useEffect, useRef, useState } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'

export default function GetTaxonomies() {
  const [taxonomies, setTaxonomies] = useState([])
  // we don't want to update state on an unmounted component
  const isStillMounted = useRef()

  useEffect(() => {
    isStillMounted.current = true
    apiFetch({
      path: addQueryArgs('/wp/v2/taxonomies', {})
    })
      .then((data) => {
        if (isStillMounted.current) {
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              const element = data[key]
              taxonomies.push({
                name: element.name,
                slug: element.slug,
                types: element.types
              })
            }
          }
          if (taxonomies.length) {
            setTaxonomies(taxonomies)
          }
        }
      })
      .catch(() => {
        if (isStillMounted.current) {
          setTaxonomies([])
        }
      })
  }, [setTaxonomies, isStillMounted])

  return taxonomies
}
