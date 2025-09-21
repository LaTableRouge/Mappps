import { useEffect } from '@wordpress/element'

export default function GlobalStateEventsHandler(blockId = '', state, setState, stateName = '', additionalEvent = () => false) {
	const eventName = `mppps-${stateName}`

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
	}, [state])

	return null
}
