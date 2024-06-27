export const serverSelectData = Object.freeze([
	{
		id: 'api',
		label: 'Selecciona un servidor',
		options: [
			{ value: 'node', label: 'Servidor Node' }
		],
	},

	{
		id: 'bbdd',
		label: 'Selecciona una bbdd',
		options: [
			{ value: 'mysql', label: 'MySQL' },
			{ value: 'postgres', label: 'PostgreSQL' },
			{ value: 'sqlserver', label: 'SqlServer' },
			{ value: 'mongodb', label: 'Mongodb' },
		],
	},
])

export const servBbddButton = 'Seleccionar'
