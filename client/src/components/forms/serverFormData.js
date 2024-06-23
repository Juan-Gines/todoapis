export const serverSelectData = Object.freeze([
	{
		id: 'api',
		label: 'Selecciona un servidor',
		options: [
			{ value: 'node', label: 'Servidor node' },
			{ value: 'laravel', label: 'Servidor laravel' },
		],
	},

	{
		id: 'bbdd',
		label: 'Selecciona una bbdd',
		options: [
			{ value: 'mysql', label: 'MySQL' },
			{ value: 'postgres', label: 'PostgreSQL' },
		],
	},
]);

export const servBbddButton = 'Seleccionar';
