import styled from "styled-components";

const radius = 160; // 120 es la mitad del nuevo tamaño del círculo, 40 es el grosor del borde y 20 es la mitad del tamaño de la pelotita

const Ball = (props) => {
	return (
		<>
			<BallContainer
				color={props.color}
				top={120 + radius * Math.sin(props.angle * (Math.PI / 180))}
				left={120 + radius * Math.cos(props.angle * (Math.PI / 180))}
				onMouseDown={props.onDraging}
				onTouchStart={props.onDraging}
				onClick={() => {
					if (props.onClick) {
						props.onClick(props);
					}
				}}
			>
				{props.emoji}

				<InvisibleSEOText>
					{props.title} {props.description}
				</InvisibleSEOText>
			</BallContainer>
		</>
	);
};

export default Ball;
export const Tooltip = styled.div`
	visibility: hidden;
	width: 400px; // you can adjust width as per your requirements
	max-width: 80vw;
	margin-left: -15px;
	background-color: #555;
	color: #fff;
	text-align: center;
	padding: 10px;
	border-radius: 4px;
	position: absolute;
	left: 0;
	z-index: 100;
	/* bottom: 125%; // will display above the ball, adjust if necessary */
	/* left: 50%; */
	/* margin-left: -100px; // half of width to center tooltip */
	/* left: 0; */
	/* opacity: 0; */
	bottom: ${(props) => (props.position === "above" ? "125%" : "unset")};
	top: ${(props) => (props.position === "below" ? "125%" : "unset")};
	transition: opacity 0.3s;
	z-index: 99;
	text-align: left;

	::after {
		content: "";
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #555 transparent transparent transparent;
	}
`;

export const BallContainer = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: blue;
	position: absolute;
	top: ${(props) => props.top}px;
	left: ${(props) => props.left}px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ color }) => color};

	z-index: 2;

	&:active {
		transform: ${({ color }) =>
			color === "blue" ? "scale(1)" : "scale(1.3)"};
		transition: transform 0.1s ease-in-out;
		z-index: 999 !important;
	}

	transition: transform 0.1s ease-in-out;
	@media (min-width: 768px) {
		&:hover {
			transform: ${({ color }) =>
				color === "blue" ? "scale(1)" : "scale(1.4)"};
			z-index: 999 !important;
		}

		&:active {
			transform: ${({ color }) =>
				color === "blue" ? "scale(1)" : "scale(0.9)"};
			transition: transform 0.2s ease-in-out;
		}
	}
`;

export const InvisibleSEOText = styled.span`
	position: absolute !important;
	clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
	clip: rect(1px, 1px, 1px, 1px);
	padding: 0 !important;
	border: 0 !important;
	height: 1px !important;
	width: 1px !important;
	overflow: hidden;
`;
