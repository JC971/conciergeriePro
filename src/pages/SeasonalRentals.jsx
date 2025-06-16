import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { seasonalRentalsService, uploadService } from "../utils/api";
import "../styles/SeasonalRentals.css";

const SeasonalRentals = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		date: "",
		address: "",
		guestsCount: "",
		arrivalTime: "",
		departureDate: "",
		generalState: "",
		bedrooms: "",
		bathrooms: "",
		toilets: "",
		bbqState: "ok",
		terraceState: "ok",
		trashEmptied: "yes",
		ovenState: "ok",
		dishwasherEmptied: "yes",
		windowsState: "ok",
		comments: "",
		arrivalPhotos: [],
		departurePhotos: [],
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = async (e, photoType) => {
		const files = Array.from(e.target.files);
		if (files.length === 0) return;

		try {
			setLoading(true);
			const uploadResponse = await uploadService.uploadMultiple(files);

			setFormData((prev) => ({
				...prev,
				[photoType]: uploadResponse.files,
			}));

			setMessage("Photos téléchargées avec succès");
			setTimeout(() => setMessage(""), 3000);
		} catch (error) {
			console.error("Erreur lors du téléchargement:", error);
			setMessage("Erreur lors du téléchargement des photos");
			setTimeout(() => setMessage(""), 3000);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await seasonalRentalsService.createReport({
				...formData,
				status: "completed",
			});

			setMessage("Rapport enregistré avec succès!");

			// Réinitialiser le formulaire
			setFormData({
				date: "",
				address: "",
				guestsCount: "",
				arrivalTime: "",
				departureDate: "",
				generalState: "",
				bedrooms: "",
				bathrooms: "",
				toilets: "",
				bbqState: "ok",
				terraceState: "ok",
				trashEmptied: "yes",
				ovenState: "ok",
				dishwasherEmptied: "yes",
				windowsState: "ok",
				comments: "",
				arrivalPhotos: [],
				departurePhotos: [],
			});

			setTimeout(() => setMessage(""), 3000);
		} catch (error) {
			console.error("Erreur lors de l'enregistrement:", error);
			setMessage("Erreur lors de l'enregistrement du rapport");
			setTimeout(() => setMessage(""), 3000);
		} finally {
			setLoading(false);
		}
	};

	const renderSelectField = (name, label, options) => (
		<div className="form-group">
			<label className="form-label" htmlFor={name}>
				{label}
			</label>
			<select
				id={name}
				name={name}
				value={formData[name]}
				onChange={handleInputChange}
				className="form-select"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);

	const stateOptions = [
		{ value: "ok", label: t("common.ok") },
		{ value: "average", label: t("common.average") },
		{ value: "bad", label: t("common.bad") },
		{ value: "na", label: t("common.na") },
	];

	const yesNoOptions = [
		{ value: "yes", label: t("common.yes") },
		{ value: "no", label: t("common.no") },
	];

	return (
		<div className="page-container">
			<div className="container">
				<div className="card">
					<div className="card-header">
						<h2 className="card-title">{t("seasonal_rentals.title")}</h2>
					</div>

					{message && (
						<div
							className={`alert ${
								message.includes("succès") ? "alert-success" : "alert-danger"
							}`}
						>
							{message}
						</div>
					)}

					<form onSubmit={handleSubmit} className="seasonal-form">
						<section className="form-section">
							<h3 className="section-title">
								{t("seasonal_rentals.general_info")}
							</h3>

							<div className="grid grid-cols-2">
								<div className="form-group">
									<label className="form-label" htmlFor="date">
										{t("seasonal_rentals.date")}
									</label>
									<input
										type="date"
										id="date"
										name="date"
										value={formData.date}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="address">
										{t("seasonal_rentals.address")}
									</label>
									<input
										type="text"
										id="address"
										name="address"
										value={formData.address}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="guestsCount">
										{t("seasonal_rentals.guests_count")}
									</label>
									<input
										type="number"
										id="guestsCount"
										name="guestsCount"
										value={formData.guestsCount}
										onChange={handleInputChange}
										className="form-input"
										min="1"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="arrivalTime">
										{t("seasonal_rentals.arrival_time")}
									</label>
									<input
										type="time"
										id="arrivalTime"
										name="arrivalTime"
										value={formData.arrivalTime}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="departureDate">
										{t("seasonal_rentals.departure_date")}
									</label>
									<input
										type="date"
										id="departureDate"
										name="departureDate"
										value={formData.departureDate}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>
							</div>
						</section>

						<section className="form-section">
							<h3 className="section-title">
								{t("seasonal_rentals.arrival_checklist")}
							</h3>

							<div className="form-group">
								<label className="form-label" htmlFor="generalState">
									{t("seasonal_rentals.general_state")}
								</label>
								<textarea
									id="generalState"
									name="generalState"
									value={formData.generalState}
									onChange={handleInputChange}
									className="form-textarea"
									rows="3"
								/>
							</div>

							<div className="grid grid-cols-3">
								<div className="form-group">
									<label className="form-label" htmlFor="bedrooms">
										{t("seasonal_rentals.bedrooms")}
									</label>
									<input
										type="number"
										id="bedrooms"
										name="bedrooms"
										value={formData.bedrooms}
										onChange={handleInputChange}
										className="form-input"
										min="0"
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="bathrooms">
										{t("seasonal_rentals.bathrooms")}
									</label>
									<input
										type="number"
										id="bathrooms"
										name="bathrooms"
										value={formData.bathrooms}
										onChange={handleInputChange}
										className="form-input"
										min="0"
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="toilets">
										{t("seasonal_rentals.toilets")}
									</label>
									<input
										type="number"
										id="toilets"
										name="toilets"
										value={formData.toilets}
										onChange={handleInputChange}
										className="form-input"
										min="0"
									/>
								</div>
							</div>

							<div className="form-group">
								<label className="form-label" htmlFor="arrivalPhotos">
									{t("seasonal_rentals.arrival_photos")}
								</label>
								<input
									type="file"
									id="arrivalPhotos"
									name="arrivalPhotos"
									onChange={(e) => handleFileChange(e, "arrivalPhotos")}
									className="form-input"
									multiple
									accept="image/*"
								/>
								{formData.arrivalPhotos.length > 0 && (
									<div className="uploaded-files">
										{formData.arrivalPhotos.length} photo(s) téléchargée(s)
									</div>
								)}
							</div>
						</section>

						<section className="form-section">
							<h3 className="section-title">
								{t("seasonal_rentals.detailed_checklist")}
							</h3>

							<div className="grid grid-cols-2">
								{renderSelectField(
									"bbqState",
									t("seasonal_rentals.bbq_state"),
									stateOptions
								)}
								{renderSelectField(
									"terraceState",
									t("seasonal_rentals.terrace_state"),
									stateOptions
								)}
								{renderSelectField(
									"trashEmptied",
									t("seasonal_rentals.trash_emptied"),
									yesNoOptions
								)}
								{renderSelectField(
									"ovenState",
									t("seasonal_rentals.oven_state"),
									stateOptions
								)}
								{renderSelectField(
									"dishwasherEmptied",
									t("seasonal_rentals.dishwasher_emptied"),
									yesNoOptions
								)}
								{renderSelectField(
									"windowsState",
									t("seasonal_rentals.windows_state"),
									stateOptions
								)}
							</div>

							<div className="form-group">
								<label className="form-label" htmlFor="comments">
									{t("seasonal_rentals.comments")}
								</label>
								<textarea
									id="comments"
									name="comments"
									value={formData.comments}
									onChange={handleInputChange}
									className="form-textarea"
									rows="4"
								/>
							</div>
						</section>

						<section className="form-section">
							<h3 className="section-title">
								{t("seasonal_rentals.end_validation")}
							</h3>

							<div className="form-group">
								<label className="form-label" htmlFor="departurePhotos">
									{t("seasonal_rentals.departure_photos")}
								</label>
								<input
									type="file"
									id="departurePhotos"
									name="departurePhotos"
									onChange={(e) => handleFileChange(e, "departurePhotos")}
									className="form-input"
									multiple
									accept="image/*"
								/>
								{formData.departurePhotos.length > 0 && (
									<div className="uploaded-files">
										{formData.departurePhotos.length} photo(s) téléchargée(s)
									</div>
								)}
							</div>
						</section>

						<div className="form-actions">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={loading}
							>
								{loading ? "Enregistrement..." : t("seasonal_rentals.submit")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SeasonalRentals;
