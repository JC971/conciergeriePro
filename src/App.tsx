import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SeasonalRentals from "./pages/SeasonalRentals.jsx";
import Caretaking from "./pages/Caretaking.jsx";
import Login from "./pages/Login.jsx";
import "./utils/i18n";
import "./styles/global.css";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <div>Chargement...</div>;
	}

	if (!user && location.pathname !== "/login") {
		return <Navigate to="/login" replace />;
	}

	return children;
};

const AppContent = () => {
	const location = useLocation();
	const hideLayout = location.pathname === "/login";

	return (
		<div className="app">
			{!hideLayout && <Header />}
			{!hideLayout && <Navigation />}
			<main className="main-content">
				<Routes>
					{/* ✅ Ajout de la route login */}
					<Route path="/login" element={<Login />} />

					{/* ✅ Routes protégées */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/seasonal-rentals"
						element={
							<ProtectedRoute>
								<SeasonalRentals />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/caretaking"
						element={
							<ProtectedRoute>
								<Caretaking />
							</ProtectedRoute>
						}
					/>

					{/* Redirection générale */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
		</div>
	);
};

function App() {
	return (
		<AuthProvider>
			<Router>
				<AppContent />
			</Router>
		</AuthProvider>
	);
}

export default App;
