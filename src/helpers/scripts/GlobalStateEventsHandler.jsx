import { useEffect } from '@wordpress/element'

export default function GlobalStateEventsHandler(blockId = '', state, setState, stateName = '', eventName = '', additionalEvent = () => false) {
  useEffect(() => {
    async function event(e) {
      await e
      const details = e.detail
      if (details.id === blockId) {
        setState(details[stateName])
      }
    }

    document.addEventListener(eventName, event)
    return () => {
      document.removeEventListener(eventName, event)
    }
  }, [])

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          id: blockId,
          stateName: state
        }
      })
    )

    additionalEvent()
  }, [state])

  return null
}
