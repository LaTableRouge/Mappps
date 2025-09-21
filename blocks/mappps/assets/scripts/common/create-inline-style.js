export const createInlineStyle = (object, id = '') => {
	let styleString = ''

	styleString += `#${id} {`

	if (Object.keys(object).length) {
		for (const key in object) {
			if (Object.hasOwnProperty.call(object, key)) {
				styleString += `--${key}: ${object[key]};`
			}
		}
	}

	styleString += '}'

	return styleString
}
