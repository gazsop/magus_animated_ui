export default function LogoutIcon(props: { className?: string, style? : React.CSSProperties, onClick?: () => void }) {
	return (
		<svg
			className={`${props.className ?? ""}`}
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
			onClick={props.onClick}
		>
				<path d="M12 4h-8a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h8" />
				<polyline points="16 6 22 12 16 18" />
				<line x1="8" x2="20" y1="12" y2="12" />
		</svg>
	);
}
