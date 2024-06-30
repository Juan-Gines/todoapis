import { useState, useContext } from 'react';
import Button from './elements/Button';
import Input from './elements/Input';
import { AppContext } from '../../context/AppContext';
import { HTML_MSG } from '../../constants/htmlMsgs';
import { SELECTION_TEXT } from '../../constants/selectionText';
import { ERROR_MSG } from '../../constants/errorMsgs';

const AddProductForm = () => {
	const { formData, handleReload } = useContext(AppContext);
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { value } = e.target;
		setName(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		if (!name) {
			setError(ERROR_MSG.INPUT_EMPTY);
			return;
		}
		fetch(import.meta.env.PUBLIC_NODE_SERVER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-db-type': formData.bbdd,
			},
			body: JSON.stringify({ name }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					handleReload();
				}
			})
			.catch((err) => setError(err.message));

		handleReload();
		setName('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-sm mx-auto mb-7'
		>
			<div className='flex gap-4 items-center justify-center'>
				<Input
					placeholder={HTML_MSG.NEW_PRODUCT}
					name={SELECTION_TEXT.NAME}
					value={name}
					onChange={handleChange}
				/>
				<Button
					title={HTML_MSG.ADD_BUTTON}
				/>
			</div>
			{error && <p className='text-red-500 text-left'>*{error}</p>}
		</form>
	);
};

export default AddProductForm;
