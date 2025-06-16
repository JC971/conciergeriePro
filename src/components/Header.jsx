import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

const Header = () => {
	const { t, i18n } = useTranslation();
	const { user, logout } = useAuth();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header-content">
					<h1 className="header-title">{t("app.title")}</h1>
					<div className="header-actions">
						<div className="language-selector">
							<label htmlFor="language">{t("app.language")}:</label>
							<select
								id="language"
								value={i18n.language}
								onChange={(e) => changeLanguage(e.target.value)}
							>
								<option value="fr">Français</option>
								<option value="en">English</option>
							</select>
						</div>
						{user && (
							<button className="btn btn-secondary" onClick={logout}>
								{t("navigation.logout")}
							</button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
