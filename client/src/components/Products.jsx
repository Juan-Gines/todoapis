import { useState, useEffect, StrictMode } from 'react'
import HeaderProducts from './HeaderProducts.jsx'
import ProductList from './ProductsList.jsx'
import ServerForm from './forms/ServerForm.jsx'

const Products = () => {
	const [formData, setformData] = useState({
		api: '', 
		bbdd: ''})	
	
	const handleForm = (data) => {
		setformData(data)
	}

	useEffect(() => {
		if (typeof globalThis !== 'undefined') {
			const api = localStorage.getItem('api');
			const bbdd = localStorage.getItem('bbdd');
			if (api && bbdd) {
				setformData({ api, bbdd });
			}
		}
		
	}, []);

	return (
		<StrictMode>
			<div className='max-w-3xl min-w mx-auto'>
				<ServerForm onFormSubmit={handleForm}/>
				<HeaderProducts />
				<ProductList {...formData}/>
			</div>
		</StrictMode>
	)
}

export default Products