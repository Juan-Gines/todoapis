import checkIcon from './assets/icons/Check.svg'
import uncheckIcon from './assets/icons/Uncheck.svg'
import deleteIcon from './assets/icons/Delete.svg'

const Product = ({ name, onbasket }) => (
<li
	className='flex items-center justify-between p-2 gap-5 bg-gray-100 dark:bg-gray-800/70 rounded-md'
>
	<span>{name}</span>
	<div className='flex items-center justify-center gap-3'>
		<button
			className={`px-2 py-1 rounded-md ${
				onbasket ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
			}`}
		>
			{onbasket ? <img src={checkIcon.src} className='size-5 text-white' /> : <img src={uncheckIcon.src} className='size-5' />}
		</button>
		<button className='px-2 py-1 bg-red-500 text-white rounded-md'>
			<img src={deleteIcon.src} className='size-5' />
		</button>
	</div>
</li>
)

export default Product
