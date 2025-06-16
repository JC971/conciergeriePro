import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Navigation.css";

const Navigation = () => {
	const { t } = useTranslation();

	return (
		<nav className="navigation">
			<div className="container">
				<ul className="nav-list">
					<li className="nav-item">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`nav-link ${isActive ? "active" : ""}`
							}
							end
						>
							{t("navigation.dashboard")}
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink
							to="/seasonal-rentals"
							className={({ isActive }) =>
								`nav-link ${isActive ? "active" : ""}`
							}
						>
							{t("navigation.seasonal_rentals")}
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink
							to="/caretaking"
							className={({ isActive }) =>
								`nav-link ${isActive ? "active" : ""}`
							}
						>
							{t("navigation.caretaking")}
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
