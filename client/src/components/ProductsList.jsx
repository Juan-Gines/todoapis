// src/components/ProductsList.jsx
import { useContext } from 'react';
import Product from './Product.jsx';
import { HTML_MSG } from '../constants/htmlMsgs.js';
import { AppContext } from '../context/AppContext.jsx';

const ProductsList = () => {
	const { loading, productList, error } = useContext(AppContext);

	if (error) {
		return <div className='text-red-600'>* {error}</div>;
	}

	if (loading) {
		return <div>{HTML_MSG.LOADING}</div>;
	}
	console.log(productList)
	return (
		<ul className='space-y-2'>
			
			{
				productList.length > 0 ? (
					
				productList.map((product) => (
					<Product
						key={product.id}
						id={product.id}
						name={product.name}						
						onbasket={product.onbasket}
					/>
				))
			) : (
				<li>{HTML_MSG.NO_PRODUCTS}</li>
			)}
		</ul>
	);
};

export default ProductsList;
