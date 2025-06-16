import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarComponent from "../components/CalendarComponent";
import { seasonalRentalsService, caretakingService } from "../utils/api";

const Dashboard = () => {
	const { t } = useTranslation();
	const [seasonalRentalEvents, setSeasonalRentalEvents] = useState([]);
	const [caretakingEvents, setCaretakingEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);

				// Récupérer les événements des 3 prochains mois
				const startDate = new Date();
				const endDate = new Date();
				endDate.setMonth(endDate.getMonth() + 3);

				const params = {
					startDate: startDate.toISOString().split("T")[0],
					endDate: endDate.toISOString().split("T")[0],
				};

				const [seasonalResponse, caretakingResponse] = await Promise.all([
					seasonalRentalsService.getCalendarEvents(params),
					caretakingService.getCalendarEvents(params),
				]);

				// Transformer les données pour react-big-calendar
				const seasonalEvents = seasonalResponse.events.map((event) => ({
					...event,
					start: new Date(event.start),
					end: new Date(event.end),
					className: "seasonal-rental",
				}));

				const caretakingEventsFormatted = caretakingResponse.events.map(
					(event) => ({
						...event,
						start: new Date(event.start),
						end: new Date(event.end),
						className: "caretaking",
					})
				);

				setSeasonalRentalEvents(seasonalEvents);
				setCaretakingEvents(caretakingEventsFormatted);
			} catch (error) {
				console.error("Erreur lors du chargement des événements:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const handleSeasonalEventSelect = (event) => {
		console.log("Événement location sélectionné:", event);
		// Ici, vous pourriez naviguer vers le formulaire de rapport correspondant
		// ou ouvrir une modal avec les détails
	};

	const handleCaretakingEventSelect = (event) => {
		console.log("Événement gardiennage sélectionné:", event);
		// Ici, vous pourriez naviguer vers le formulaire de rapport correspondant
		// ou ouvrir une modal avec les détails
	};

	if (loading) {
		return (
			<div className="page-container">
				<div className="container">
					<div className="card">
						<div className="card-header">
							<h2 className="card-title">{t("app.dashboard")}</h2>
						</div>
						<div style={{ textAlign: "center", padding: "2rem" }}>
							Chargement des événements...
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="page-container">
			<div className="container">
				<div className="card">
					<div className="card-header">
						<h2 className="card-title">{t("app.dashboard")}</h2>
					</div>

					<div className="grid grid-cols-1">
						<CalendarComponent
							events={seasonalRentalEvents}
							onSelectEvent={handleSeasonalEventSelect}
							title={t("dashboard.seasonal_calendar")}
						/>

						<CalendarComponent
							events={caretakingEvents}
							onSelectEvent={handleCaretakingEventSelect}
							title={t("dashboard.caretaking_calendar")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
