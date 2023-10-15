export default function FullScaleIcon(props: {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			version="1.1"
			className={`${props.className ?? ""}`}
			style={props.style ?? {}}
			onClick={() => props.onClick?.()}
		>
			<title>
				navigation / 11 - navigation, expand, enter, full screen, fullscreen
				icon
			</title>
			<g
				id="Free-Icons"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<g
					transform="translate(-895.000000, -748.000000)"
					id="Group"
					stroke="#000000"
					strokeWidth="2"
				>
					<g transform="translate(893.000000, 746.000000)" id="Shape">
						<path d="M9,21 L3,21 L3,15 M21,15 L21,21 L15,21 M15,3 L21,3 L21,9 M3,9 L3,3 L9,3"></path>
					</g>
				</g>
			</g>
		</svg>
	);
}
