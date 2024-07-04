import { useContext } from 'react'
import deleteIcon from '../assets/icons/Delete.svg'
import { AppContext } from '../../context/AppContext';

const DeleteProductForm = ({ product }) => {
  const { formData, formActive, handleError, handleProductList } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(import.meta.env.PUBLIC_NODE_SERVER + '/' + product.id , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-db-type': formData.bbdd,
      }      
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          handleError(data.error)
        } else {
          console.log('Product deleted')
          handleProductList(data)
        }
      })
      .catch((err) => handleError(err.message))
  }
  return (
    <form onSubmit={handleSubmit}>
      <button 
        type='submit' 
        className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2 py-1 text-center disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={!formActive}
        >
        <img src={deleteIcon.src} className='size-5 text-white' />      
      </button>
    </form>
  )
}

export default DeleteProductForm