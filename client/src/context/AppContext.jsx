import { createContext, useState, useEffect } from 'react';
import { SELECTION_TEXT } from '../constants/selectionText.js';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [formData, setformData] = useState({
		api: '',
		bbdd: '',
	});
	const [formActive, setformActive] = useState(true);
	const [reload, setReload] = useState(false);

	const handleFormActive = (active) => {
		setformActive(active);
	};

	const handleForm = (data) => {
		setformData(data);
	};

	const handleReload = () => {
		setReload(!reload);
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

  return (
    <AppContext.Provider value={{ formData, reload, formActive, handleForm, handleFormActive, handleReload }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };