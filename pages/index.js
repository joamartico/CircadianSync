import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Ball from "../components/Ball";
import IonModal from "../components/IonModal";

export default function Home() {
	const [angleWake, setAngleWake] = useState(0);
	const [angleBed, setAngleBed] = useState(240);
	const circleRef = useRef(null);

	const [selectedBall, setSelectedBall] = useState(false);
	const [showAddModal, setShowAddModal] = useState(0);
	const [addedBalls, setAddedBalls] = useState([]);

	const extraBalls = [
		{
			emoji: "☕️",
			title: "Coffee",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 90,
			angle: angleWake + 30,
			wrongColor: "#f00",
		},
		{
			emoji: "🧉",
			title: "Mate",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 90,
			angle: angleWake + 30,
			wrongColor: "#f00",
		},
		{
			emoji: "🫖",
			title: "Tea",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 90,
			angle: angleWake + 30,
			wrongColor: "#f00",
		},
		{
			emoji: "🫖",
			title: "Herbal Tea",
			minAngleWakeOffset: 180,
			minAngleBedOffset: 0,
			angle: angleBed - 40,
			wrongColor: "#ff0",
		},
		{
			emoji: "🏋️‍♂️",
			title: "Gym",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 30,
			angle: angleWake + 135,
			wrongColor: "#f00",
		},
		{
			emoji: "🏃‍♂️",
			title: "Running",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 30,
			angle: angleWake + 135,
			wrongColor: "#f00",
		},
		{
			emoji: "🍽️",
			title: "Eating",
			wrongColor: "#f00",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 30,
			angle: angleWake + 90,
		},
		{
			emoji: "💤",
			title: "Nap",
			wrongColor: "#f00",
			angle: angleWake + 100,
			minAngleWakeOffset: 75,
			minAngleBedOffset: 90,
		},
		{
			emoji: "📚",
			title: "Mental Work",
			wrongColor: "#ff0",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 90,
			angle: angleWake + 60,
		},
		{
			emoji: "🛀",
			title: "Hot Shower",
			minAngleWakeOffset: 180,
			minAngleBedOffset: 0,
			angle: angleBed - 15,
			wrongColor: "#ff0",
		},
		{
			emoji: "🛀",
			title: "Cold Shower",
			minAngleWakeOffset: 0,
			minAngleBedOffset: 75,
			angle: angleWake + 55,
			wrongColor: "#f00",
		},
	];

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
					<p>Bedtime: {fromAngleToTime(angleBed)}</p>
					<p>Wake up: {fromAngleToTime(angleWake)}</p>
					{/* <p>
						Hours of sleep:{" "}
						{calculateHoursOfSleep(angleBed, angleWake)}
					</p> */}
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
							title="Testosterone peak & Cortisol rise"
							description="During the latter parts of sleep, primarily during REM phases leading up to waking, there's a noticeable release of testosterone. This hormone is crucial for energy, muscle development, and libido. Exercising near this peak can maximize workout benefits, optimizing muscle growth and fat burning. Concurrently, cortisol levels climb, readying you for alertness. As this occurs, your body temperature experiences a swift increase, working in tandem with these hormonal changes to facilitate a natural and energized awakening. Together, these physiological processes ensure you're primed to start the day with energy and focus."
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={angleWake + 75}
							color="#fff"
							emoji="🧠"
							title="Cognitive peak"
							description="Five hours after waking, your cognitive functions hit a peak, thanks to a convergence of physiological processes. The rise in body temperature enhances alertness and reaction time, while balanced levels of key neurotransmitters, like dopamine and serotonin, foster mental clarity and mood stability. Furthermore, the body's natural circadian rhythm boosts alertness, complemented by a low homeostatic sleep pressure. This combination sets the stage for a window of heightened focus, making it an opportune time for tasks that demand mental precision and creativity"
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={angleBed - 30}
							color="#fff"
							emoji="🌙"
							title="Melatonin rise"
							description="Around two hours before your bedtime, the production of melatonin, the 'sleep hormone', increases, prepping your body for rest. This aligns with your body's ongoing decrease in temperature. For optimal melatonin production and enhanced sleep readiness, it's best to have an environment with dim lighting and a slightly cool room temperature (around 65°F or 18°C). Avoiding screens is crucial, as the blue light they emit can interfere with melatonin production. Taking a hot shower can also aid sleep; the quick cooldown from the warmth to a cooler room further encourages the body's natural inclination towards sleep."
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={angleBed + 30}
							color="#fff"
							emoji="🦴"
							title="Growth hormone peak"
							description="About two hours after bedtime, as you enter deep, non-REM sleep, there's a pronounced release of growth hormone. This deep sleep phase is particularly conducive to this hormone's secretion. Growth hormone facilitates tissue repair, muscle development, and bone health. Ensuring uninterrupted sleep during this period maximizes their benefits, promoting overall rejuvenation and vitality. Additionally, our body temperature keeps dropping, signaling to the body that it's time to rest."
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={180}
							color="#fff"
							emoji="🌅"
							title="Sunset"
							description="Watching the sunset serves more than just an aesthetic purpose, it's a cue for your body. The reduction in blue light from the setting sun helps prime your eyes for nighttime, decreasing sensitivity to blue light from devices which can suppress melatonin. The warm hues of the sunset also signal a drop in cortisol levels, making you feel more relaxed and preparing your body for rest. Engaging in this simple act can aid in aligning with your natural circadian rhythm and promote better sleep."
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={angleWake + 22.5}
							color="#fff"
							emoji="☀️"
							title="Sunlight & Cortisol peak"
							description={`Exposure to morning sunlight for about 20-30 minutes and before ${fromAngleToTime(
								angleWake + 30
							)} is essential for synchronizing your circadian clock, improving sleep, and regulating your body's wakefulness. This light, rich in blue wavelengths, signals the suprachiasmatic nucleus (SCN) to inhibit melatonin production, the 'sleep hormone', helping you to fully awaken and further elevate body temperature. The SCN's activity also boosts the morning cortisol peak at this time as much as 50%, aiding alertness. This is also an optimal time for a cup of coffee, as caffeine enhances this natural cortisol boost. Additionally, sunlight spurs serotonin synthesis, boosting your mood.`}
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={angleWake - 45}
							// very light blue:
							color="#e0f1ff"
							// color="#fff"
							// border="#00FFFF"
							emoji="❄️"
							title="Lowest body temperature"
							description="Between two and three hours prior to your wakeup hour, your body reaches its lowest core temperature of the day. This temperature dip is intrinsically linked to your circadian rhythm, coinciding with the deepest stages of restorative sleep. Cellular repair and memory consolidation are optimized during this cool phase. As wakefulness approaches, the body begins its gradual warm-up, signaling a transition from sleep to activity. A conducive sleeping environment can further enhance this natural temperature drop, bolstering the quality of your rest."
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={angleWake + 150}
							// very light red
							color="#ffd0d0"
							// color="#fff"
							// border="#f00"
							emoji="🔥"
							title="Highest body temperature"
							description="About ten hours after waking, your body reaches its peak core temperature of the day, influenced by your circadian rhythm and metabolic processes. This heightened temperature promotes optimal muscle function and flexibility. Engaging in physical activities or exercises during this period is advantageous; injury risks decrease while performance potential amplifies. Moreover, your metabolism is at a relative high, supporting efficient digestion and energy utilization. After this peak, your body temperature will begin its gradual descent, preparing you for the upcoming rest phase."
							onClick={(e) => setSelectedBall(e)}
							circleRef={circleRef}
						/>

						<Ball
							angle={240}
							onDragging={(newAngle) => {
								setAngleBed(newAngle);
							}}
							emoji="🛏️"
							color="blue"
							draggable
							circleRef={circleRef}
						/>

						<Ball
							angle={0}
							onDragging={(newAngle) => {
								setAngleWake(newAngle);
							}}
							emoji="⏰"
							color="blue"
							draggable
							circleRef={circleRef}
						/>

						{addedBalls.map((ball, index) => (
							<Ball
								key={index}
								angle={ball.angle}
								emoji={ball.emoji}
								color={"#fff"}
								withBorder
								onDragging={(angle, setBorder) => {
									if (
										angle >
											angleWake +
												ball.minAngleWakeOffset &&
										angle <
											angleBed - ball.minAngleBedOffset
									) {
										setBorder("#0f0");
									} else {
										setBorder(ball.wrongColor);
									}
								}}
								circleRef={circleRef}
								draggable
							/>
						))}

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
							<img
								src="/clock.png"
								style={{
									position: "absolute",
									width: "calc(100% + 10px)",
									height: "100%",
									left: -1,
									top: 0.2,
									borderRadius: "50%",
									transform: 'scale(1.03)',
								}}
							/>
						</InnerCircle>
					</Circle>
				</Container>

				<ion-fab
					vertical="bottom"
					horizontal="end"
					style={{ bottom: 30, right: 30, pointerEvents: "all" }}
					onClick={() => setShowAddModal((prev) => prev + 1)}
				>
					<ion-fab-button>
						<ion-icon name="add"></ion-icon>
					</ion-fab-button>
				</ion-fab>
			</ion-content>

			<IonModal
				open={selectedBall}
				setOpen={setSelectedBall}
				style={{
					flexDirection: "column",
					justifyContent: "space-between",
					height: "100%",
				}}
			>
				<ion-header translucent>
					<ion-toolbar>
						<ion-buttons slot="start">
							<ion-button
								onClick={() =>
									console.log("notification outline")
								}
							>
								<ion-icon name="notifications-outline"></ion-icon>
							</ion-button>
						</ion-buttons>
						<ion-buttons slot="end">
							<ion-button onClick={() => setSelectedBall(false)}>
								Close
							</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				{selectedBall && (
					<>
						<ion-content fullscreen>
							<ion-card-header>
								<ion-card-title
									style={{ color: "#737373", fontSize: 30 }}
								>
									{fromAngleToTime(selectedBall.angle)}
								</ion-card-title>
								<ion-card-title
									style={{
										marginTop: 15,
										fontSize: 25,
										color: "#000",
									}}
								>
									{selectedBall.emoji} {selectedBall.title}
								</ion-card-title>
							</ion-card-header>

							<ion-card-content
								style={{ fontSize: 17, lineHeight: 1.7 }}
							>
								{selectedBall.description}
							</ion-card-content>
						</ion-content>
					</>
				)}
			</IonModal>

			<IonModal
				open={showAddModal}
				setOpen={setShowAddModal}
				style={{
					flexDirection: "column",
					justifyContent: "space-between",
					height: "100%",
				}}
			>
				<ion-header translucent>
					<ion-toolbar>
						<ion-title>Add Routine Activity</ion-title>
						<ion-buttons slot="end">
							<ion-button onClick={() => setShowAddModal(false)}>
								Close
							</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>

				<ion-content>
					<ion-list>
						{/* <ion-item>
							<ion-label>
								<h2>☕️{"   "}Coffee</h2>
							</ion-label>
						</ion-item> */}

						{extraBalls.map((ball, index) => (
							<ion-item
								key={index}
								button
								detail="false"
								onClick={() => {
									setAddedBalls([...addedBalls, ball]);
									setShowAddModal(false);
								}}
							>
								<ion-avatar slot="start">
									<EmojiAvatar>{ball.emoji}</EmojiAvatar>
								</ion-avatar>
								<ion-label>
									<h2>{ball.title}</h2>
								</ion-label>
							</ion-item>
						))}
					</ion-list>
				</ion-content>
			</IonModal>
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

const EmojiAvatar = styled.span`
	font-size: 2rem; /* Adjust the size as needed */
	display: inline-block;
	vertical-align: middle;
	/* Add any other styles you want */
`;
