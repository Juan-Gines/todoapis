import { createContext, useState, useEffect } from 'react';
import { SELECTION_TEXT } from '../constants/selectionText.js';
import { ERROR_MSG } from '../constants/errorMsgs.js';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [formData, setformData] = useState({
		api: '',
		bbdd: '',
	});
	const [formActive, setformActive] = useState(true);
	const [productList, setProductList] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFormActive = (active) => {
		setformActive(active);
	};

	const handleForm = (data) => {
		setformData(data);
	};
	
	const handleProductList = (data) => {		
		setProductList(data);
	};
	
	const handleError = (error) => {
		setError(error);
	}

	const selectServer = (api) => {
		if (api) {
			let url = '';
			if (api === SELECTION_TEXT.NODE) {
				url = import.meta.env.PUBLIC_NODE_SERVER;
				return url;
			} else if (api === SELECTION_TEXT.LARAVEL) {
				return import.meta.env.PUBLIC_LARAVEL_SERVER;
			} else if (api === SELECTION_TEXT.NET) {
				return import.meta.env.PUBLIC_NET_SERVER;
			}
		}
	};

	useEffect(() => {
		if (typeof globalThis !== SELECTION_TEXT.UNDEFINED) {
			const api = localStorage.getItem(SELECTION_TEXT.API);
			const bbdd = localStorage.getItem(SELECTION_TEXT.BBDD);
			if (api && bbdd) {
				setformData({ api, bbdd });
			}
		}
	}, []);

	useEffect(() => {
		handleError(null);
		setLoading(true);
		handleFormActive(false);
		const { api, bbdd } = formData;		
		const url = selectServer(api);
		const credentials = (api === SELECTION_TEXT.Laravel) ? 'include' : 'omit';
		const fetchProducts = () => {
			fetch(url, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					accept: 'application/json',
					'content-type': 'application/json',
					'x-db-type': bbdd,
				},
				credentials,
			})
				.then((res) => res.json())
				.then((data) => data.error ? handleError(data.error) : handleProductList(data))
				.catch((err) => handleError(err.message || JSON.stringify))
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
			handleError(ERROR_MSG.NO_SERVER_OR_BD);
		}
	}, [formData.api, formData.bbdd]);

  return (
    <AppContext.Provider value={{ formData, formActive, productList, error, loading, handleProductList, handleError, handleForm, handleFormActive }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };