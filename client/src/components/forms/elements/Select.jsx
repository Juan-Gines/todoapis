
const Select = ({ id, label, options, titleSelection, value, onchange }) => { 	
	
	return (		
		<div className='flex flex-col'>
			<label
				htmlFor={id}
				className='block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white'
			>
				{label}
			</label>
			<select
				id={id}
				name={id}
				value={value}
				className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				onChange={onchange}
			>
				<option
					value=''
					disabled
				>
					{titleSelection}
				</option>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export default Select
