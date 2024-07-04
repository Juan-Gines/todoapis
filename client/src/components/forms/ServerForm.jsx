// src/components/ServerForm.jsx
import { useState, useEffect, useContext } from 'react';
import Select from './elements/Select.jsx';
import Button from './elements/Button.jsx';
import { ERROR_MSG } from '../../constants/errorMsgs.js';
import { SELECTION_TEXT } from '../../constants/selectionText.js';
import { HTML_MSG } from '../../constants/htmlMsgs.js';
import { AppContext } from '../../context/AppContext.jsx';

const ServerForm = () => {
	const { error, handleError, handleForm } = useContext(AppContext);
	const [api, setApi] = useState('');
	const [bbdd, setBbdd] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === SELECTION_TEXT.API) {
			setApi(value);
		} else if (name === SELECTION_TEXT.BBDD) {
			setBbdd(value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const servers = [];
		const bbdds = [];
		HTML_MSG.SELECT_FORM_DATA.forEach((s) => {
			s.id === SELECTION_TEXT.API
				? s.options.forEach((o) => servers.push(o.value))
				: s.options.forEach((o) => bbdds.push(o.value));
		});
		if (!servers.includes(api) || !bbdds.includes(bbdd)) {
			handleError(ERROR_MSG.SERVER_FORM);
			return;
		}
		handleForm({ api, bbdd });
		localStorage.setItem(SELECTION_TEXT.API, api);
		localStorage.setItem(SELECTION_TEXT.BBDD, bbdd);
		handleError('');
	};

	useEffect(() => {
		if (typeof globalThis !== SELECTION_TEXT.UNDEFINED) {
			const api = localStorage.getItem(SELECTION_TEXT.API);
			const bbdd = localStorage.getItem(SELECTION_TEXT.BBDD);
			if (api && bbdd) {
				setApi(api);
				setBbdd(bbdd);
			}
		}
	}, []);

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-sm mx-auto mb-7'
		>
			<div className='flex gap-4'>
				{HTML_MSG.SELECT_FORM_DATA.map((select) => (
					<Select
						key={select.id}
						{...select}
						value={select.id === SELECTION_TEXT.API ? api : bbdd}
						onchange={handleChange}
					/>
				))}
			</div>			
			<div className='flex place-content-center'>
				<Button
					title={HTML_MSG.SERV_BBDD_BUTTON}
				/>
			</div>
		</form>
	);
};

export default ServerForm;
