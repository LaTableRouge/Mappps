import { useEffect } from '@wordpress/element'

export default function GlobalStateEventsHandler(blockId = '', state, setState, stateName = '', additionalEvent = () => false) {
	const eventName = `mppps-${stateName}`

	// Listen for global events and sync them into local state.
	// This mirrors the original behavior, but without the invalid `await e`
	// that was causing long-running async generators and timeouts.
	useEffect(() => {
		function handleEvent(e) {
			const details = e.detail
			if (!details || details.id !== blockId) {
				return
			}

			setState(details[stateName])
		}

		document.addEventListener(eventName, handleEvent)
		return () => {
			document.removeEventListener(eventName, handleEvent)
		}
	}, []) // keep behavior identical to original: only wire listener once

	// Broadcast local state changes as global events.
	useEffect(() => {
		const detailObject = {
			id: blockId
		}
		detailObject[stateName] = state

		document.dispatchEvent(
			new CustomEvent(eventName, {
				detail: detailObject
			})
		)

		additionalEvent()
	}, [state]) // keep semantics: fire whenever `state` changes

	return null
}
