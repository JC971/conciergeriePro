import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/CalendarComponent.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, onSelectEvent, title }) => {
	return (
		<div className="calendar-container">
			<h3 className="calendar-title">{title}</h3>
			<div className="calendar-wrapper">
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
					onSelectEvent={onSelectEvent}
					views={["month", "week", "day"]}
					defaultView="month"
					popup
					messages={{
						next: "Suivant",
						previous: "Précédent",
						today: "Aujourd'hui",
						month: "Mois",
						week: "Semaine",
						day: "Jour",
						agenda: "Agenda",
						date: "Date",
						time: "Heure",
						event: "Événement",
						noEventsInRange: "Aucun événement dans cette période",
						showMore: (total) => `+ ${total} de plus`,
					}}
				/>
			</div>
		</div>
	);
};

export default CalendarComponent;
