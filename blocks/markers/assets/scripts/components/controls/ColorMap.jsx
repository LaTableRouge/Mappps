import { PanelColorSettings } from '@wordpress/block-editor'

export default function ColorMap({ settings }) {
	return <PanelColorSettings className="mappps-control-markers-color" colorSettings={settings} />
}
