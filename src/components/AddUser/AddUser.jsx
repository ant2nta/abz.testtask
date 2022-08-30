import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getPositions } from "../../api/positions";
import { postUser } from "../../api/users";
import { regexEmail, regexPhone } from "./regExp";
import success from "../../images/success-image.svg";
import "./AddUser.scss";
import Loader from "../Loader/Loader";

const errorObj = {
	name: null,
	email: null,
	phone: null,
	file: null,
};

const AddUser = ({ addUser, token }) => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userPosition, setUserPosition] = useState('');
	const [photo, setPhoto] = useState();
	const [errors, setErrors] = useState(errorObj);

	const [positions, setPositions] = useState();
	const [isSubmited, setIsSubmited] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
    getPositions()
      .then(data => {
				setPositions(data);
				setUserPosition(data.positions[0].name);
			});
  }, []);
	
	const handleNameChange = (value) => {
		setUserName(value);

		setErrors({
			...errors,
			name: (value.length < 2 || value.length > 60) ? true : false,
		})
	};

	const handleEmailChange = (value) => {
		setUserEmail(value);

		setErrors({
			...errors,
			email: (!regexEmail.test(value)) ? true : false,
		})
	};

	const handleChangePhone = (value) => {
		setUserPhone(value);

		setErrors({
			...errors,
			phone: (!regexPhone.test(value)) ? true : false,
		})
	};

	const handleSetFile = (event) => {
		const file = event.target.files[0];
		setPhoto(file);

		setErrors({
			...errors,
			file: file.size > 5242880 ? 'size' : false,
		})

		if (!file.name.slice(-4).toLowerCase().includes('jpg')
		&& !file.name.slice(-4).toLowerCase().includes('jpeg')) {
			setErrors({
				...errors,
				file: 'extension',
			})
		} else {
			setErrors({
				...errors,
				file: false,
			})
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData();

		formData.append('name', userName);
    formData.append('email', userEmail);
    formData.append('phone', userPhone);
    formData.append('position_id', positions.positions.find(pos => pos.name === userPosition).id);
    formData.append('photo', photo);

    postUser(formData, token)
			.finally(() => {
				addUser(true);
				setIsSubmited(true);
			});

		setTimeout(() => setIsLoading(false), 1000)
	};

	return (
		<section className="addUser" id="signUp">
			{isLoading
				? <Loader />
				: isSubmited ? (
					<div className="addUser__success">
						<h1>User successfully registered</h1>

						<img src={success} alt="successful sign up" />
					</div>
				) : (
					<>
						<h1 className="addUser__title">
							Working with POST request
						</h1>
						<form className="addUser__form form" onSubmit={handleSubmit}>
							<label className='form__label' htmlFor="name">
								<input
									value={userName}
									onChange={(event) => handleNameChange(event.target.value)}
									className={
										classNames('form__input', {
											'form__input-error' : errors.name,
										})
									}
									placeholder=" "
								/>
								
								<span
									className={
										classNames('form__placeholder', {
											'form__placeholder-error' : errors.name,
										})
									}
								>
									Your name
								</span>

								{errors.name && (
									<p className='form__error'>
										{userName.length < 2 && ('The name must be at least 2 characters.')}
										{userName.length > 60 && ('The name must be at least 2 characters.')}
									</p>
								)}
							</label>

							<label
								className='form__label'
								htmlFor="email"
							>
								<input
									value={userEmail}
									onChange={(event) => handleEmailChange(event.target.value)}
									className={
										classNames('form__input', {
											'form__input-error': errors.email,
										})
									}
									placeholder=" "
								/>
								<span
									className={
										classNames('form__placeholder', {
											'form__placeholder-error': errors.email,
										})
									}
								>
									Email
								</span>
								
								{errors.email && (
									<p className='form__error'>
										The email must be a valid email address.
									</p>
								)}
							</label>

							<label className='form__label' htmlFor="phone" >
								<input
									value={userPhone}
									onChange={(event) => handleChangePhone(event.target.value)}
									className={
										classNames('form__input', {
											'form__input-error': errors.phone,
										})
									}
									placeholder=" "
								/>
								<span
									className={
										classNames('form__placeholder', {
											'form__placeholder-error': errors.phone,
										})
									}
								>
								Phone
								</span>

								<span className='form__help-phone'>
									+38 (XXX) XXX - XX - XX
								</span>
								
								{errors.phone && (
									<p className='form__error form__error-phone'>
										The phone field is required.
									</p>
								)}
							</label>

							<div className="form__position position">
								<h3 className='position__subtitle'>
									Select your position
								</h3>

								{positions?.positions.map(position => (
									<label
										className="position__radio"
										key={position.id}>
										<input
											className="position__radio-btn"
											type="radio"
											value={position.name}
											onChange={(event) => setUserPosition(event.target.value)}
											checked={position.name === userPosition}
										/>
										{position.name}
									</label>
								))}
							</div>

							<div className="form__upload upload">
								<label className="upload__label">
									<span className={
										classNames(
											'upload__btn',
											{'upload__btn-error': errors.photo}
										)
									}>
										Upload
									</span>
									
									<input
										className="upload__input"
										accept=".jpg, .jpeg"
										type="file"
										onChange={handleSetFile}
									/>

									<div className={
										classNames(
											'upload__filename-wrapper',
											{'upload__filename-wrapper-error': errors.photo}
										)}
									>
										<span className="upload__filename ellipsis">
											{
												photo ? photo.name : 'Upload your photo'
											}
										</span>
									</div>
									{errors.file && (
										<p className='form__error'>
											{errors.file === 'size' 
												? 'The photo may not be greater than 5 Mbytes.'
												: 'Image is invalid.'}
										</p>
									)}
								</label>

							</div>

							<button
								className={
									classNames('button', {
										'button-error' : !Object.values(errors).every(el => el === false),
									})
								}
								type="submit"
								disabled={!Object.values(errors).every(el => el === false)}
							>
								Sign up
							</button>
						</form>
					</>
				)}
		</section>
	);
};

export default AddUser;
