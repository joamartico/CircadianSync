import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Ball from "../components/Ball";

export default function Home() {
	const [angleWake, setAngleWake] = useState(0);
	const [angleBed, setAngleBed] = useState(240);
	const [activeBall, setActiveBall] = useState(null);

	const [isDragging, setIsDragging] = useState(false);
	const circleRef = useRef(null);

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
			setAngleWake(closestAngle);
		} else if (activeBall === 2) {
			setAngleBed(closestAngle);
		}
	};

	function fromAngleToTime(angle) {
		let hours = Math.floor(angle / 15);
		const minutes = Math.floor((angle / 15 - hours) * 60);
		hours = hours + 6;
		if (hours > 23) hours = hours - 24;

		return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
	}

	let correctAngleWake =
		angleWake + 90 > 359 ? angleWake - 270 : angleWake + 90;
	let correctAngleBed = angleBed + 90 > 359 ? angleBed - 270 : angleBed + 90;

	const hourToDegree = (hour) => hour * 15;

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
				<Header>
					<Title>Circadian Sync</Title>
					<p>
						Bedtime: {fromAngleToTime(angleBed)}
						{/* {correctAngleBed}deg */}
					</p>
					<p>
						Wake up: {fromAngleToTime(angleWake)}
						{/* {correctAngleWake}deg */}
					</p>
					<p>
						Hours of sleep:{" "}
						{calculateHoursOfSleep(angleBed, angleWake)}
					</p>
				</Header>

				<Container>
					<Circle
						ref={circleRef}
						bedAngle={correctAngleBed}
						wakeAngle={correctAngleWake}
					>
						<Ball
							angle={angleWake - 15}
							color="#fff"
							emoji="💪"
							title="Testosterone and Cortisol peak"
							description="It's a great period for physical activities like exercising, as testosterone can boost muscle growth and performance. Additionally, cortisol, our primary stress hormone, is highest in the morning, preparing us for the day's challenges."
						/>

						<Ball
							angle={angleWake + 75}
							color="#fff"
							emoji="🧠"
							title="Cognitive peak"
							description="This is when our cognitive abilities are at their peak. It's the best time for tasks that require deep concentration, problem-solving, or learning. Scientifically, our body temperature increases and so does our alertness and mental sharpness."
						/>

						<Ball
							angle={angleBed - 30}
							color="#fff"
							emoji="🌙"
							title="Melatonin rise"
							description="Melatonin, the sleep hormone, starts to rise during this period, signaling to the body that it's time to wind down and prepare for rest. Dimming lights and avoiding screens can further enhance this natural process, promoting better sleep."
						/>

						<Ball
							angle={angleBed + 30}
							color="#fff"
							emoji="🦴"
							title="Growth hormone peak"
							description="Growth hormone is released during this period, promoting tissue repair and muscle growth. It's a great time for recovery and healing. Additionally, our body temperature keeps dropping, signaling to the body that it's time to rest."
						/>

						<Ball
							angle={180}
							color="#fff"
							emoji="🌅"
							title="Sunset"
							description="Watching the sunset is a natural cue for our body to start transitioning from daytime to nighttime activities. It's an optimal time to begin relaxing routines and reducing exposure to blue light. Cortisol levels also start to drop, making us feel more relaxed."
						/>

						<Ball
							angle={angleWake + 18}
							color="#fff"
							emoji="☀️"
							title="Sunlight"
							description="Exposure to natural sunlight during this period is key to synchronizing your circadian rhythm, regulating sleep patterns, and enhancing mood. The light of the morning is particularly effective in stimulating the production of serotonin, a hormone that uplifts mood."
						/>

						<Ball
							angle={angleWake - 45}
							// very light blue:
							color="#e0f1ff"
							emoji="❄️"
							title="Lowest body temperature"
							description="Our body's core temperature drops to its lowest during this time. It's a cue for deep, restorative stages of sleep. Ensuring a cool environment can further optimize sleep quality."
						/>

						<Ball
							angle={angleWake + 150}
							// very light red
							color="#ffd0d0"
							emoji="🔥"
							title="Highest body temperature"
							description="Your body reaches its maximum core temperature, promoting optimal muscle function and flexibility. It's a great time for physical activities or exercises as injury risks are reduced and performance can be enhanced. Additionally, metabolism is relatively high, aiding in efficient digestion."
						/>

						<Ball
							angle={angleBed}
							onDraging={(e) => handleBallMouseDown(e, 2)}
							emoji="🛏️"
							color="blue"
						/>

						<Ball
							angle={angleWake}
							onDraging={(e) => handleBallMouseDown(e, 1)}
							emoji="⏰"
							color="blue"
						/>

						<InnerCircle>
							<span
								style={{
									position: "absolute",
									right: "50%",
									transform: "translateX(50%)",
									top: 25,
								}}
							>
								0
							</span>

							<span
								style={{
									position: "absolute",
									left: 25,
									top: "50%",
									transform: "translateY(-50%)",
								}}
							>
								18
							</span>
							<span
								style={{
									position: "absolute",
									right: "75%",
									bottom: "75%",
									transform: "translate(-50%, 50%)",
								}}
							>
								21
							</span>
							<span
								style={{
									position: "absolute",
									left: "75%",
									bottom: "75%",
									transform: "translate(50%, 50%)",
								}}
							>
								3
							</span>
							<span
								style={{
									position: "absolute",
									left: "75%",
									top: "75%",
									transform: "translate(50%, -50%)",
								}}
							>
								9
							</span>
							<span
								style={{
									position: "absolute",
									right: "75%",
									top: "75%",
									transform: "translate(-50%, -50%)",
								}}
							>
								15
							</span>

							<span
								style={{
									position: "absolute",
									top: "50%",
									transform: "translateY(-50%)",
									right: 25,
								}}
							>
								6
							</span>

							<span
								style={{
									position: "absolute",
									right: "50%",
									transform: "translateX(50%)",
									bottom: 25,
								}}
							>
								12
							</span>
						</InnerCircle>
					</Circle>
				</Container>
			</ion-content>
		</>
	);
}

const Header = styled.div`
	width: 100%;
	margin-left: 20px;
	color: white;
	padding-top: 20px;
`;

const Title = styled.h1`
	font-size: 2rem;
	font-weight: 700;
	background: linear-gradient(#fdf5bc, #f3ac77); 
	-webkit-background-clip: text !important; // makes the text itself have the gradient
	color: transparent !important; // necessary to make the gradient show
`;

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* height: 80%; */
	height: 480px;
	overflow: hidden;
	pointer-events: none !important;
`;

export const Circle = styled.div`
	width: 360px;
	height: 360px;
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
	&::after {
		content: "";
		background: #000;
		width: 100%;
		height: 100%;
		border: 46px solid #000;
		//center the circle
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		z-index: -1;
	}
`;

const InnerCircle = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 6px solid #000;
	background-color: #2c2c2e;
	font-size: 1rem;
	position: relative !important;
`;

const Hour = styled.span`
	position: absolute;
	top: 20%;
	left: 20%;
	width: 60%;
	height: 60%;
	transform-origin: center center;
	transform: rotate(${({ hour }) => hour * 15 + 45}deg);
	color: white;
	font-size: 1rem;
	z-index: 999;

	&::after {
		content: "${({ hour }) => hour}";
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(${({ hour }) => hour * -15 - 45}deg);
	}
`;
