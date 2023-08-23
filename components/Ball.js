import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const radius = 160; // 120 es la mitad del nuevo tamaño del círculo, 40 es el grosor del borde y 20 es la mitad del tamaño de la pelotita

const Ball = (props) => {
	// const [showTooltip, setshowTooltip] = useState(false);
	// const [tooltipPosition, setTooltipPosition] = useState("above");

	// const ballRef = useRef();
	// const tooltipRef = useRef();

	// useEffect(() => {
	// 	if (ballRef.current) {
	// 		const rect = ballRef.current.getBoundingClientRect();
	// 		if (rect.top < tooltipRef.current.offsetHeight) {
	// 			setTooltipPosition("below");
	// 		} else {
	// 			setTooltipPosition("above");
	// 		}
	// 	}
	// }, [showTooltip]);
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
				// onClick={() => {
				// 	if (ballRef.current) {
				// 		const rect = ballRef.current.getBoundingClientRect();
				// 		const viewportHeight =
				// 			window.innerHeight ||
				// 			document.documentElement.clientHeight;
				// 		if (rect.top - tooltipRef.current.offsetHeight < 0) {
				// 			setTooltipPosition("below");
				// 		} else if (
				// 			rect.bottom + tooltipRef.current.offsetHeight >
				// 			viewportHeight
				// 		) {
				// 			setTooltipPosition("above");
				// 		}
				// 	}
				// 	setshowTooltip(!showTooltip);
				// }}
				// ref={ballRef}
			>
				{props.emoji}

				<InvisibleSEOText>
					{props.title} {props.description}
				</InvisibleSEOText>
			</BallContainer>

			{/* <Tooltip
				ref={tooltipRef}
				position={tooltipPosition}
				style={{
					visibility: showTooltip ? "visible" : "hidden",
				}}
			>
				{props.description}
			</Tooltip> */}
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

	// little animation on click
	transition: transform 0.2s ease-in-out;
	z-index: 2;
	&:active {
		/* transform: scale(1.5); only if color different to blue */
		transform: ${({ color }) =>
			color === "blue" ? "scale(1)" : "scale(1.5)"};
	}

	&:hover ${Tooltip} {
		visibility: visible;
		opacity: 1;
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
