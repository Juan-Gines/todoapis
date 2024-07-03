export const HTML_MSG = Object.freeze({
	TITLE: 'La cesta de la compra',
	SELECT_FORM_DATA: Object.freeze([
		{
			id: 'api',
			label: 'Selecciona un servidor',
			titleSelection: 'Selecciona una opción',
			options: [
				{ value: 'node', label: 'Servidor Node' },
				{ value: 'laravel', label: 'Servidor Laravel' },				
			],
		},
		{
			id: 'bbdd',
			label: 'Selecciona una bbdd',
			titleSelection: 'Selecciona una opción',
			options: [
				{ value: 'mysql', label: 'MySQL' },
				{ value: 'postgres', label: 'PostgreSQL' },
				{ value: 'sqlserver', label: 'SqlServer' },
				{ value: 'mongodb', label: 'Mongodb' },
			],
		},
	]),
	SERV_BBDD_BUTTON: 'Seleccionar',
	HEADER_PRODUCTS: 'Listado de productos',
	LOADING: 'Cargando productos...',
	NO_PRODUCTS: 'No hay productos en la cesta',
	NEW_PRODUCT: 'Nuevo producto',
	ADD_BUTTON: 'Añadir',
});
