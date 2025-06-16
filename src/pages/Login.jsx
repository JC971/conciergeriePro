// src/pages/Login.jsx
/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
    const { login } = useAuth();
    
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3001/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Échec de la connexion");
			}

			const data = await response.json();
			localStorage.setItem("token", data.token); // ou passe ça à ton contexte
			navigate("/"); // redirige vers le dashboard
		} catch (err) {
			setError("Identifiants incorrects");
		}
	};

	return (
		<div className="login-page">
			<h2>Connexion</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <p className="error">{error}</p>}
				<button type="submit">Se connecter</button>
			</form>
		</div>
	);
};

export default Login;*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { login } = useAuth(); // ✅ utilise le login du contexte

	const handleSubmit = async (e) => {
		e.preventDefault();
		const credentials = { email, password };

		const result = await login(credentials); // ✅ appel propre au contexte

		if (result.success) {
			navigate("/"); // ✅ redirection après login
		} else {
			setError(result.error); // ✅ gestion de l'erreur
		}
	};

	return (
		<div className="login-page">
			<h2>Connexion</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <p className="error">{error}</p>}
				<button type="submit">Se connecter</button>
			</form>
		</div>
	);
};

export default Login;
