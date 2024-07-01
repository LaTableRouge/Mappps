export default function Thumbnail({ title, url }) {
  if (!url) {
    return ''
  }

  return (
    <div className="article__picture-wrapper">
      <img src={url} alt={title} width={60} height={60}></img>
    </div>
  )
}
