import { useEffect, useState } from "react";
import styled from "styled-components";

const radius = 160; // 120 es la mitad del nuevo tamaño del círculo, 40 es el grosor del borde y 20 es la mitad del tamaño de la pelotita

const Ball = (props) => {
	const [angle, setAngle] = useState(props.angle);
	const [isDragging, setIsDragging] = useState(false);
	const [border, setBorder] = useState(props.withBorder ? '#0f0'  : 'unset')

	useEffect(() => {
		setAngle(props.angle);
	}, [props.angle]);

	useEffect(() => {
		if (props.draggable) {
			const handleTouchMove = (e) => {
				if (isDragging) {
					e.preventDefault(); // Prevenir el desplazamiento
					updatePosition(e.touches[0]); // Utiliza el primer punto táctil
				}
			};

			if (window.matchMedia("(pointer: coarse)").matches) {
				// Detecta dispositivos táctiles
				if (isDragging) {
					document.addEventListener("touchmove", handleTouchMove);
					document.addEventListener("touchend", handleMouseUp);
				} else {
					document.removeEventListener("touchmove", handleTouchMove);
					document.removeEventListener("touchend", handleMouseUp);
				}

				return () => {
					document.removeEventListener("touchmove", handleTouchMove);
					document.removeEventListener("touchend", handleMouseUp);
				};
			} else {
				// Desktop
				if (isDragging) {
					document.addEventListener("mousemove", handleMouseMove);
					document.addEventListener("mouseup", handleMouseUp);
				} else {
					document.removeEventListener("mousemove", handleMouseMove);
					document.removeEventListener("mouseup", handleMouseUp);
				}

				return () => {
					document.removeEventListener("mousemove", handleMouseMove);
					document.removeEventListener("mouseup", handleMouseUp);
				};
			}
		}
	}, [isDragging]);

	const handleBallMouseDown = (e, ballId) => {
		if (!props.draggable) return;
		e.preventDefault();
		setIsDragging(true);
		updatePosition(e.type === "touchstart" ? e.touches[0] : e);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		updatePosition(e);
	};

	const updatePosition = (e) => {
		if (!props.circleRef.current) return;
		const rect = props.circleRef.current.getBoundingClientRect();

		// Sumamos la mitad del grosor del borde para obtener el centro del "camino"
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const atan = Math.atan2(e.clientY - centerY, e.clientX - centerX);
		const deg = (atan * (180 / Math.PI) + 360) % 360;
		const closestAngle = Math.round(deg / 7.5) * 7.5;

		setAngle(closestAngle);
		if (props.onDragging) props.onDragging(closestAngle, setBorder);
	};

	return (
		<>
			<BallContainer
				color={props.color}
				top={120 + radius * Math.sin(angle * (Math.PI / 180))}
				left={120 + radius * Math.cos(angle * (Math.PI / 180))}
				onMouseDown={(e) => handleBallMouseDown(e, props.id)}
				onTouchStart={(e) => handleBallMouseDown(e, props.id)}
				onClick={() => {
					if (props.onClick) {
						props.onClick(props);
					}
				}}
				style={{
					border: `2.8px solid ${border}`,
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
