export default function Thumbnail({ alt, height, url, width }) {
  if (!url) {
    return
  }

  return (
    <div className="article__picture-wrapper">
      <img alt={alt} height={height} src={url} width={width}></img>
    </div>
  )
}
