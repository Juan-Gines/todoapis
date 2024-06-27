// src/components/ServerForm.jsx
import { useState, useEffect } from 'react';
import Select from './Select.jsx';
import Button from './Button.jsx';
import { serverSelectData, servBbddButton } from './serverFormData';

const ServerForm = ({onFormSubmit}) => {
	const [api, setApi] = useState('');
	const [bbdd, setBbdd] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'api') {
      setApi(value);
    } else if (name === 'bbdd') {
      setBbdd(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();		
    const servers = [];
    const bbdds = [];
    serverSelectData.forEach((s) => {
      s.id === 'api'
        ? s.options.forEach((o) => servers.push(o.value))
        : s.options.forEach((o) => bbdds.push(o.value));
    });
    if (!servers.includes(api) || !bbdds.includes(bbdd)) {
      setError('Por favor selecciona un servidor API y una base de datos.');
      return;
    }
		onFormSubmit({ api, bbdd });
		localStorage.setItem('api', api);
		localStorage.setItem('bbdd', bbdd);
    setError('');
  };

	useEffect(() => {
		if (typeof globalThis !== 'undefined') {
			const api = localStorage.getItem('api');
			const bbdd = localStorage.getItem('bbdd');
			if (api && bbdd) {
				setApi(api);
				setBbdd(bbdd);
			}
		}
	}
	, []);

  return (
    <form onSubmit={handleSubmit} className='max-w-sm mx-auto mb-7'>
      <div className='flex gap-4'>
        {serverSelectData.map((select) => (
          <Select
            key={select.id}
            {...select}
            value={select.id === 'api' ? api : bbdd}
            onchange={handleChange}
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
