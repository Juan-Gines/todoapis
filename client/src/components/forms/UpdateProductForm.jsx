import { useContext } from 'react'
import checkIcon from '../assets/icons/Check.svg'
import uncheckIcon from '../assets/icons/Uncheck.svg'
import { AppContext } from '../../context/AppContext';

const UpdateProductForm = ({ product }) => {
  const { formData, formActive, handleError, handleProductList } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(import.meta.env.PUBLIC_NODE_SERVER + '/' + product.id , {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-db-type': formData.bbdd,
      },
      body: JSON.stringify({ id: product.id, onbasket: !product.onbasket }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          handleError(data.error)
        } else {
          console.log('Product updated')
          handleProductList(data)
        }
      })
      .catch((err) => handleError(err.message))
  }
  return (
    <form onSubmit={handleSubmit}>
      <button
        type='submit'
        className={`text-white bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 focus:outline-none
          ${product.onbasket ? 
            'from-green-400 via-green-500 to-green-600 focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80'
            :
            'from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80'
            }
          shadow-lg font-medium rounded-lg text-sm px-2 py-1 text-center disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!formActive}
      >
        {product.onbasket ? 
          <img src={checkIcon.src} className='size-5 text-white' />
          :
          <img src={uncheckIcon.src} className='size-5 text-white' />
        }
      </button>
    </form>
  )
}

export default UpdateProductForm