// src/components/ServerForm.jsx
import { useState } from 'react';
import Select from './Select.jsx';
import Button from './Button.jsx';
import { serverSelectData, servBbddButton } from './serverFormData';

const ServerForm = () => {
	const [formData, setFormData] = useState({
		api: '',
		bbdd: '',
	});

	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { api, bbdd } = formData;
		const servers = [];
		const bbdds = [];
		serverSelectData.forEach((s) => {
			s.id === 'api'
				? s.options.forEach((o) => servers.push(o.value))
				: s.options.forEach((o) => bbdds.push(o.value));
		});
		if (!servers.includes(formData.api) || !bbdds.includes(formData.bbdd)) {
			setError('Por favor selecciona un servidor API y una base de datos.');
			return;
		}
		setError('');
		console.log('Form submitted:', formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-sm mx-auto mb-7'
		>
			<div className='flex gap-4'>
				{serverSelectData.map((select, i) => (
					<Select
						key={select.id}
						{...select}
						value={formData[select.id]}
						onchange={handleChange}
						selected={i === 0 ? 'true' : 'false'}
					/>
				))}
			</div>
			{error && <p className='text-red-500 text-sm text-center pb-4'>*{error}</p>}
			<div className='flex place-content-center'>
				<Button title={servBbddButton} />
			</div>
		</form>
	);
};

export default ServerForm;
