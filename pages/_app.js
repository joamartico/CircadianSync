import React, { useEffect, useState } from "react";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";

/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

import "../index.css";

import Context from "../Context";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		ionDefineCustomElements(window);
	});
	return (
		<>
			<Head>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				{/* SEO  */}
				<title>Circadian Watch</title>
				<meta
					name="description"
					content="Optimize your body's natural circadian rhythm with Circadian Watch. Boost energy, sleep better, and elevate productivity. Align with nature. Sync with success."
				/>
				<meta
					name="keywords"
					content="circadian rhythm, boost energy, sleep optimization, productivity, natural alignment, Circadian Watch, wellness, health optimization, sleep improvement, energy enhancement"
				/>
				<meta
					name="google-site-verification"
					content="3XoSVdS7QLQWutddbE1sJ60XT3mFR-WXrP80V4AharU"
				/>

				{/*  PWA  */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="default"
				/>
				<meta name="theme-color" content="#2c2c2e"></meta>
			</Head>
			<Context>
				<ion-app>
					<Component {...pageProps} />
				</ion-app>
			</Context>
		</>
	);
}

export default MyApp;
