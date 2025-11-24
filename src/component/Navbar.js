/** @format */
import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
	{ to: "/", label: "Home" },
	{ to: "/about", label: "About" },
	{ to: "/work", label: "Recent Work" },
	{ to: "/skills", label: "Skills" },
	{ to: "/project", label: "Projects" },
	{ to: "/certificate", label: "Certificate" },
	{ to: "/contact", label: "Get In Touch" },
	{ to: "/login", label: "Me😊" },
];

function Navbar() {
	const audioCtxRef = useRef(null);

	const playNavSound = useCallback(() => {
		if (typeof window === "undefined") return;
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!AudioCtx) return;

		if (!audioCtxRef.current) {
			audioCtxRef.current = new AudioCtx();
		}
		const ctx = audioCtxRef.current;

		const fireTone = () => {
			const oscillator = ctx.createOscillator();
			const gain = ctx.createGain();
			oscillator.type = "triangle";
			oscillator.frequency.setValueAtTime(560, ctx.currentTime);
			gain.gain.setValueAtTime(0.25, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

			oscillator.connect(gain).connect(ctx.destination);
			oscillator.start();
			oscillator.stop(ctx.currentTime + 0.18);
		};

		if (ctx.state === "suspended") {
			ctx.resume().then(fireTone).catch(() => {});
		} else {
			fireTone();
		}
	}, []);

	useEffect(() => {
		return () => {
			if (audioCtxRef.current) {
				audioCtxRef.current.close();
			}
		};
	}, []);

	return (
		<div className="navbar">
			{navLinks.map(({ to, label }) => (
				<div key={to}>
					<Link to={to} onClick={playNavSound}>
						{label}
					</Link>
				</div>
			))}
		</div>
	);
}

export default Navbar;
