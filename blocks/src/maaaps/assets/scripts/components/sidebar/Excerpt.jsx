export default function Excerpt({ text }) {
  return text && <div className="article__excerpt">{text}</div>
}
