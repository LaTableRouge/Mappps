export default function Thumbnail({ title, url }) {
  if (!url) {
    return ''
  }

  return (
    <div className="article__picture-wrapper">
      <img alt={title} height={60} src={url} width={60}></img>
    </div>
  )
}
