import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";


const Button = ({ title }) => {
	const { formActive } = useContext(AppContext);
	return (
		<button
			className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed'
			type='submit'
			disabled={!formActive}
		>
			{title}
		</button>
	);
}

export default Button;
