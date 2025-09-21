export default function Tiles({ inEditor, mapTiles, selectedTiles }) {
	if (!inEditor) {
		return <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className="mapTiles" url={selectedTiles} />
	} else {
		return (
			<LayersControl position="topright">
				{mapTiles.map(({ label, value }, index) => (
					<LayersControl.Overlay key={index} checked={selectedTiles === value} name={label}>
						<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' className="mapTiles" url={value} />
					</LayersControl.Overlay>
				))}
			</LayersControl>
		)
	}
}
