import DeleteProductForm from './forms/DeleteProductForm.jsx';
import UpdateProductForm from './forms/UpdateProductForm.jsx'

const Product = ({ id, name, onbasket = false }) => (
	<li
		className='flex items-center justify-between p-2 gap-5 bg-gray-100 dark:bg-gray-800/70 rounded-md'
	>
		<span>{name}</span>
		<div className='flex items-center justify-center gap-3'>		
			<UpdateProductForm
				product={{ id, onbasket }}					
			/> 
			<DeleteProductForm
				product={{ id }}
			/>
		</div>
	</li>
);


export default Product
