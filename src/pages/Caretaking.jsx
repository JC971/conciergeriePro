import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Caretaking.css";

const Caretaking = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		visitDate: "",
		ownerArrival: "",
		ownerDeparture: "",
		peopleCount: "",
		interiorComment: "",
		exteriorComment: "",
		interiorPhotos: [],
		exteriorPhotos: [],
		specificComments: [],
	});

	const [newComment, setNewComment] = useState({
		area: "",
		comment: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e, photoType) => {
		const files = Array.from(e.target.files);
		setFormData((prev) => ({
			...prev,
			[photoType]: files,
		}));
	};

	const handleAddComment = () => {
		if (newComment.area && newComment.comment) {
			setFormData((prev) => ({
				...prev,
				specificComments: [
					...prev.specificComments,
					{ ...newComment, id: Date.now() },
				],
			}));
			setNewComment({ area: "", comment: "" });
		}
	};

	const handleRemoveComment = (id) => {
		setFormData((prev) => ({
			...prev,
			specificComments: prev.specificComments.filter(
				(comment) => comment.id !== id
			),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Données du formulaire:", formData);
		// Ici, vous enverriez les données à votre API
		alert("Rapport enregistré avec succès!");
	};

	return (
		<div className="page-container">
			<div className="container">
				<div className="card">
					<div className="card-header">
						<h2 className="card-title">{t("caretaking.title")}</h2>
					</div>

					<form onSubmit={handleSubmit} className="caretaking-form">
						<section className="form-section">
							<h3 className="section-title">{t("caretaking.general_info")}</h3>

							<div className="grid grid-cols-2">
								<div className="form-group">
									<label className="form-label" htmlFor="visitDate">
										{t("caretaking.visit_date")}
									</label>
									<input
										type="date"
										id="visitDate"
										name="visitDate"
										value={formData.visitDate}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="peopleCount">
										{t("caretaking.people_count")}
									</label>
									<input
										type="number"
										id="peopleCount"
										name="peopleCount"
										value={formData.peopleCount}
										onChange={handleInputChange}
										className="form-input"
										min="1"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="ownerArrival">
										{t("caretaking.owner_arrival")}
									</label>
									<input
										type="date"
										id="ownerArrival"
										name="ownerArrival"
										value={formData.ownerArrival}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="ownerDeparture">
										{t("caretaking.owner_departure")}
									</label>
									<input
										type="date"
										id="ownerDeparture"
										name="ownerDeparture"
										value={formData.ownerDeparture}
										onChange={handleInputChange}
										className="form-input"
										required
									/>
								</div>
							</div>
						</section>

						<section className="form-section">
							<h3 className="section-title">
								{t("caretaking.condition_report")}
							</h3>

							<div className="condition-subsection">
								<h4 className="subsection-title">{t("caretaking.interior")}</h4>

								<div className="form-group">
									<label className="form-label" htmlFor="interiorComment">
										{t("caretaking.interior_comment")}
									</label>
									<textarea
										id="interiorComment"
										name="interiorComment"
										value={formData.interiorComment}
										onChange={handleInputChange}
										className="form-textarea"
										rows="4"
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="interiorPhotos">
										{t("caretaking.interior_photos")}
									</label>
									<input
										type="file"
										id="interiorPhotos"
										name="interiorPhotos"
										onChange={(e) => handleFileChange(e, "interiorPhotos")}
										className="form-input"
										multiple
										accept="image/*"
									/>
								</div>
							</div>

							<div className="condition-subsection">
								<h4 className="subsection-title">{t("caretaking.exterior")}</h4>

								<div className="form-group">
									<label className="form-label" htmlFor="exteriorComment">
										{t("caretaking.exterior_comment")}
									</label>
									<textarea
										id="exteriorComment"
										name="exteriorComment"
										value={formData.exteriorComment}
										onChange={handleInputChange}
										className="form-textarea"
										rows="4"
									/>
								</div>

								<div className="form-group">
									<label className="form-label" htmlFor="exteriorPhotos">
										{t("caretaking.exterior_photos")}
									</label>
									<input
										type="file"
										id="exteriorPhotos"
										name="exteriorPhotos"
										onChange={(e) => handleFileChange(e, "exteriorPhotos")}
										className="form-input"
										multiple
										accept="image/*"
									/>
								</div>
							</div>
						</section>

						<section className="form-section">
							<h3 className="section-title">
								{t("caretaking.specific_comments")}
							</h3>

							<div className="add-comment-form">
								<div className="grid grid-cols-2">
									<div className="form-group">
										<label className="form-label" htmlFor="commentArea">
											Partie de la villa
										</label>
										<input
											type="text"
											id="commentArea"
											value={newComment.area}
											onChange={(e) =>
												setNewComment((prev) => ({
													...prev,
													area: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Ex: Fuite robinet SDB"
										/>
									</div>

									<div className="form-group">
										<label className="form-label" htmlFor="commentText">
											Commentaire
										</label>
										<input
											type="text"
											id="commentText"
											value={newComment.comment}
											onChange={(e) =>
												setNewComment((prev) => ({
													...prev,
													comment: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Ex: léger goutte-à-goutte à surveiller"
										/>
									</div>
								</div>

								<button
									type="button"
									onClick={handleAddComment}
									className="btn btn-secondary"
									disabled={!newComment.area || !newComment.comment}
								>
									{t("caretaking.add_comment")}
								</button>
							</div>

							{formData.specificComments.length > 0 && (
								<div className="comments-list">
									<h4 className="subsection-title">Commentaires ajoutés:</h4>
									{formData.specificComments.map((comment) => (
										<div key={comment.id} className="comment-item">
											<div className="comment-content">
												<strong>{comment.area}:</strong> {comment.comment}
											</div>
											<button
												type="button"
												onClick={() => handleRemoveComment(comment.id)}
												className="btn btn-danger btn-sm"
											>
												{t("common.delete")}
											</button>
										</div>
									))}
								</div>
							)}
						</section>

						<div className="form-actions">
							<button type="submit" className="btn btn-primary">
								{t("caretaking.submit")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Caretaking;
