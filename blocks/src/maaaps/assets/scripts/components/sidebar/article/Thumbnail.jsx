export default function Thumbnail({ height, title, url, width }) {
  if (!url) {
    return ''
  }

  return (
    <div className="article__picture-wrapper">
      <img alt={title} height={height} src={url} width={width}></img>
    </div>
  )
}
