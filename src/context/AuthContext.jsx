import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Vérifier si l'utilisateur est déjà connecté (token dans localStorage)
		const token = localStorage.getItem("token");
		if (token) {
			// Valider le token avec l'API
			authService
				.getProfile()
				.then((response) => {
					setUser(response.user);
				})
				.catch(() => {
					// Token invalide, le supprimer
					localStorage.removeItem("token");
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (credentials) => {
		try {
			const response = await authService.login(credentials);
			localStorage.setItem("token", response.token);
			setUser(response.user);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Erreur de connexion",
			};
		}
	};

	const register = async (userData) => {
		try {
			const response = await authService.register(userData);
			localStorage.setItem("token", response.token);
			setUser(response.user);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Erreur d'inscription",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	const value = {
		user,
		login,
		register,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
