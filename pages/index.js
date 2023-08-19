import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export default function Home() {
	const [angle1, setAngle1] = useState(0);
	const [angle2, setAngle2] = useState(180); // Start with different angles for distinction
	const [activeBall, setActiveBall] = useState(null);

	const [isDragging, setIsDragging] = useState(false);
	const circleRef = useRef(null);
	const radius = 100; // 120 es la mitad del nuevo tamaño del círculo, 40 es el grosor del borde y 20 es la mitad del tamaño de la pelotita

	useEffect(() => {
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
	}, [isDragging]);

	const handleBallMouseDown = (e, ballId) => {
		e.preventDefault();
		setIsDragging(true);
		setActiveBall(ballId);
		updatePosition(e.type === "touchstart" ? e.touches[0] : e);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setActiveBall(null);
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		updatePosition(e);
	};

	const updatePosition = (e) => {
		if (!circleRef.current) return;
		const rect = circleRef.current.getBoundingClientRect();

		// Sumamos la mitad del grosor del borde para obtener el centro del "camino"
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const atan = Math.atan2(e.clientY - centerY, e.clientX - centerX);
		const deg = (atan * (180 / Math.PI) + 360) % 360;
		const closestAngle = Math.round(deg / 7.5) * 7.5;

		if (activeBall === 1) {
			setAngle1(closestAngle);
		} else if (activeBall === 2) {
			setAngle2(closestAngle);
		}
	};

	function fromAngleToTime(angle) {
		let hours = Math.floor(angle / 15);
		const minutes = Math.floor((angle / 15 - hours) * 60);
		hours = hours + 6;
		if (hours > 23) hours = hours - 24;

		return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
	}

	return (
		<>
			<ion-content>
				<Title>Circadian Sync</Title>

				<br/>
				<p>Bedtime: {fromAngleToTime(angle2)}</p>
				<p>Wake up: {fromAngleToTime(angle1)}</p>
				<br/>
				<p>Hours of sleep: {Math.abs((angle2 - angle1) / 15)}</p>

				<Container>
					<Circle ref={circleRef}>
						<Ball
							top={
								100 +
								radius * Math.sin(angle2 * (Math.PI / 180))
							}
							left={
								100 +
								radius * Math.cos(angle2 * (Math.PI / 180))
							}
							onMouseDown={(e) => handleBallMouseDown(e, 2)}
							onTouchStart={(e) => handleBallMouseDown(e, 2)}
						>
							🛏️
						</Ball>
						<Ball
							top={
								100 +
								radius * Math.sin(angle1 * (Math.PI / 180))
							}
							left={
								100 +
								radius * Math.cos(angle1 * (Math.PI / 180))
							}
							onMouseDown={(e) => handleBallMouseDown(e, 1)}
							onTouchStart={(e) => handleBallMouseDown(e, 1)}
						>
							⏰
						</Ball>

						<span
							style={{ position: "absolute", top: 10, left: 75 }}
						>
							0
						</span>
						<span
							style={{ position: "absolute", right: 10, top: 70 }}
						>
							6
						</span>
						<span
							style={{
								position: "absolute",
								bottom: 10,
								left: 70,
							}}
						>
							12
						</span>
						<span
							style={{ position: "absolute", left: 10, top: 70 }}
						>
							18
						</span>
					</Circle>
				</Container>
			</ion-content>
		</>
	);
}

const Title = styled.h1`
	font-size: 2rem;
	font-weight: 700;
	margin-left: 20px;
	padding-top: 20px;
	margin-bottom: -20px;
	color: white;
`;

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80%;
	overflow: hidden;
	pointer-events: all !important;
	/* background-color: #2c2c2e; */
`;
export const Circle = styled.div`
	transform: scale(1.2);
	width: 240px; // Aumentamos el tamaño del círculo
	height: 240px;
	border-radius: 50%;
	border: 40px solid #000; // Hacemos el "camino" más grueso
	position: relative;
	box-sizing: border-box;
	color: #fff;
	font-weight: 500;
	//dont allow to select text
	user-select: none;
`;

export const Ball = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: blue;
	position: absolute;
	top: ${(props) => props.top - 36}px;
	left: ${(props) => props.left - 36}px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
