export default function ArrowLeftSelectionIcon(props: { className?: string, style? : React.CSSProperties }) {
	return (
		<svg
			className={`arrow-left-circle ${props.className ?? ""}`}
			fill="none"
			height="24"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			style={props.style ?? {}}
		>
			<polyline points="15 4 9 12 15 20" />
		</svg>
	);
}
