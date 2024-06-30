import { StrictMode } from 'react';
import { AppProvider } from '../context/AppContext.jsx';
import HeaderProducts from './HeaderProducts.jsx';
import ProductList from './ProductsList.jsx';
import ServerForm from './forms/ServerForm.jsx';
import AddProductForm from './forms/AddProductForm.jsx';

const Products = () => {
	
	return (
		<StrictMode>
			<AppProvider>
				<div className='max-w-3xl min-w mx-auto'>
					<ServerForm	/>
					<HeaderProducts />
					<AddProductForm	/>
					<ProductList />
				</div>
			</AppProvider>
		</StrictMode>
	);
};

export default Products;
