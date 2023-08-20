import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export default function Home() {
	const [angle1, setAngle1] = useState(0);
	const [angle2, setAngle2] = useState(240); // Start with different angles for distinction
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

	// if(startAngle > 359) startAngle = startAngle - 360;
	// if(endAngle > 359) endAngle = endAngle - 360;
	// if(startAngle < 0) startAngle = startAngle + 360;
	// if(endAngle < 0) endAngle = endAngle + 360;

	let correctAngle1 = angle1 + 90 > 359 ? angle1 - 270 : angle1 + 90;
	let correctAngle2 = angle2 + 90 > 359 ? angle2 - 270 : angle2 + 90;

	const convertToConic = (angle) => {
		// Convert from your system to conic-gradient's system.
		return (450 - angle) % 360;
	};

	const startAngle = convertToConic(angle1 < angle2 ? angle1 : angle2);
	const endAngle = convertToConic(angle1 < angle2 ? angle2 : angle1);

	const hourToDegree = (hour) => hour * 15;

	function createGradient(startDegree, endDegree) {
		// const startDegree = bedTime * 15;
		// const endDegree = wakeUpTime * 15;

		console.log("startDegree", startDegree);
		console.log("endDegree", endDegree);

		if (startDegree < endDegree) {
			return `conic-gradient(
				#0000 0deg,
				#0000 ${startDegree - 0.1}deg,
				blue ${startDegree}deg,
				blue ${endDegree}deg,
				#0000 ${endDegree + 0.1}deg
			)`;
		} else {
			return `conic-gradient(
				#0000 0deg,
				blue 0.1deg,
				blue ${endDegree}deg,
				#0000 ${endDegree + 0.1}deg,
				#0000 ${startDegree - 0.1}deg,
				blue ${startDegree}deg
			)`;
		}
	}

	function calculateHoursOfSleep(startDegree, endDegree) {
		if (startDegree < endDegree) {
			return Math.abs((endDegree - startDegree) / 15);
		} else {
			return Math.abs((360 - startDegree + endDegree) / 15);
		}
	}

	return (
		<>
			<ion-content>
				<Title>Circadian Sync</Title>

				<br />
				<p>
					Bedtime: {fromAngleToTime(angle2)} {correctAngle2}deg
				</p>
				<p>
					Wake up: {fromAngleToTime(angle1)} {correctAngle1}deg
				</p>
				<br />
				<p>Hours of sleep: {calculateHoursOfSleep(angle2, angle1)}</p>

				<Container>
					<Circle
						ref={circleRef}
						startAngle={angle1 + 90}
						endAngle={angle2 + 90}
						bedtime={hourToDegree(1)}
						wakeup={hourToDegree(7)}
						bedAngle={correctAngle2}
						wakeAngle={correctAngle1}
						gradient={createGradient(correctAngle2, correctAngle1)}
					>
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

						<Ball
							top={
								100 +
								radius *
									Math.sin((angle1 + 150) * (Math.PI / 180))
							}
							left={
								100 +
								radius *
									Math.cos((angle1 + 150) * (Math.PI / 180))
							}
							color="#fff"
						>
							🔥
						</Ball>

						<Ball
							top={
								100 +
								radius *
									Math.sin((angle1 - 30) * (Math.PI / 180))
							}
							left={
								100 +
								radius *
									Math.cos((angle1 - 30) * (Math.PI / 180))
							}
							color="#fff"
						>
							❄️
						</Ball>

						<InnerCircle>
							<span
								style={{
									position: "absolute",
									top: 10,
									left: 75,
								}}
							>
								0
							</span>
							<span
								style={{
									position: "absolute",
									top: 30,
									right: 30,
								}}
							>
								3
							</span>
							<span
								style={{
									position: "absolute",
									right: 10,
									top: 70,
								}}
							>
								6
							</span>
							<span
								style={{
									position: "absolute",
									bottom: 30,
									right: 30,
								}}
							>
								9
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
								style={{
									position: "absolute",
									bottom: 30,
									left: 30,
								}}
							>
								15
							</span>
							<span
								style={{
									position: "absolute",
									left: 10,
									top: 70,
								}}
							>
								18
							</span>
							<span
								style={{
									position: "absolute",
									top: 30,
									left: 30,
								}}
							>
								21
							</span>
						</InnerCircle>
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
	pointer-events: none !important;
	/* background-color: #2c2c2e; */
`;
export const Circle = styled.div`
	transform: scale(1.4);
	width: 240px; // Aumentamos el tamaño del círculo
	height: 240px;
	border-radius: 50%;
	border: 40px solid #0000; // Hacemos el "camino" más grueso
	position: relative;
	box-sizing: border-box;
	color: #fff;
	font-weight: 500;
	user-select: none;
	background: ${(props) => {
		if (props.bedAngle > props.wakeAngle) {
			return `conic-gradient(
				blue 0% ${props.wakeAngle}deg,
				#000 ${props.wakeAngle}deg ${props.bedAngle}deg,
				blue ${props.bedAngle}deg 100%
			)`;
		} else {
			return `conic-gradient(
				#000 0% ${props.bedAngle}deg,
				blue ${props.bedAngle}deg ${props.wakeAngle}deg,
				#000 ${props.wakeAngle}deg 100%
			)`;
		}
	}};
	background-size: 200% 200%;
	background-position: center !important;
	background-repeat: no-repeat;
	pointer-events: all !important;
	margin-top: -200px;
`;

const InnerCircle = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	/* border: 4px solid #000; */
	background-color: #2c2c2e;
	font-size: 0.9rem;
	position: relative;
`;

export const Ball = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: blue;
	position: absolute;
	top: ${(props) => props.top - 40}px;
	left: ${(props) => props.left - 40}px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ color }) => color || "blue"};
`;
