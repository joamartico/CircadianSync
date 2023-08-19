import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export default function Home() {
	const [angle, setAngle] = useState(0);
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

	const handleBallMouseDown = (e) => {
    e.preventDefault(); // Add this to prevent any default touch behaviors
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
		if (!circleRef.current) return;
		const rect = circleRef.current.getBoundingClientRect();

		// Sumamos la mitad del grosor del borde para obtener el centro del "camino"
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const atan = Math.atan2(e.clientY - centerY, e.clientX - centerX);
		const deg = (atan * (180 / Math.PI) + 360) % 360;
		const closestAngle = Math.round(deg / 7.5) * 7.5;

		setAngle(closestAngle);
	};

	const x = 100 + radius * Math.cos(angle * (Math.PI / 180)); // Ajusta para el centro de la pelotita
	const y = 100 + radius * Math.sin(angle * (Math.PI / 180)); // Ajusta para el centro de la pelotita

	return (
		<>
			<ion-content>
				<Title>Circadian Sync</Title>

				<Container>
					<Circle ref={circleRef}>
						<Ball
							top={y}
							left={x}
							onMouseDown={handleBallMouseDown}
							onTouchStart={handleBallMouseDown}
						/>
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
	width: 32px; // Aumentamos el tamaño de la pelotita
	height: 32px;
	border-radius: 50%;
	background-color: blue;
	position: absolute;
	top: ${(props) =>
		props.top - 36}px; // Ajustamos la posición al nuevo tamaño
	left: ${(props) => props.left - 36}px;
	cursor: pointer;
`;
