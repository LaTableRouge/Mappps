export default function Excerpt({ text }) {
  return text && <div className="article__excerpt" dangerouslySetInnerHTML={{ __html: text }} />
}
