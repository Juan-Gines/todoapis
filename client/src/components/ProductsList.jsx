// src/components/ProductsList.jsx
import { useContext, useEffect, useState } from 'react';
import Product from './Product.jsx';
import { ERROR_MSG } from '../constants/errorMsgs.js';
import { SELECTION_TEXT } from '../constants/selectionText.js';
import { HTML_MSG } from '../constants/htmlMsgs.js';
import { AppContext } from '../context/AppContext.jsx';

const ProductsList = () => {
	const { formData, reload, handleFormActive } = useContext(AppContext);
	const [productList, setProductList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const selectServer = (api) => {
		if (api) {
			let url = '';
			if (api === SELECTION_TEXT.NODE) {
				url = import.meta.env.PUBLIC_NODE_SERVER;
				return url;
			} else if (api === SELECTION_TEXT.LARAVEL) {
				return import.meta.env.PUBLIC_LARAVEL_SERVER;
			}
		}
	};

	useEffect(() => {
		setError(null);
		setLoading(true);
		handleFormActive(false);
		const { api, bbdd } = formData;		
		const url = selectServer(api);
		const fetchProducts = () => {
			fetch(url, {
				headers: {
					Accept: 'application/json',
					'x-db-type': bbdd,
				},
			})
				.then((res) => res.json())
				.then((data) => data.error ? setError(data.error) : setProductList(data))
				.catch((err) => console.error(err))
				.finally(() => {
					setLoading(false);
					handleFormActive(true);
				});
		};
		if (api && bbdd) {
			fetchProducts();
		} else {
			setLoading(false);
			handleFormActive(true);
			setError(ERROR_MSG.NO_SERVER_OR_BD);
		}
	}, [formData.api, formData.bbdd, reload]);

	if (error) {
		return <div className='text-red-600'>* {error}</div>;
	}

	if (loading) {
		return <div>{HTML_MSG.LOADING}</div>;
	}

	return (
		<ul className='space-y-2'>
			{productList.length > 0 ? (
				productList.map((product) => (
					<Product
						key={product.id.toString()}
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
