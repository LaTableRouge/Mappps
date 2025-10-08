export default function Title({ text }) {
	return <div className="article__title" dangerouslySetInnerHTML={{ __html: text }} />
}
