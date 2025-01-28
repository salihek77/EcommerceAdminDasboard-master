import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import axios from '../../axios';
import config from "../../config"
import {toast} from "sonner";

const List = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productData, setProductData] = useState([]); // Add state for product data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  

  useEffect(() => {

    axios.get('product/listproducts')
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
        toast.error("Error Fetching Product Details");
      });
  }, []);


  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = productData.filter(product =>
      product.productName.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, productData]);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  

  const handleEditClick = (productId) =>
    navigate(`/ProductDetails/Edit/${productId}`);

  const handleViewClick = (productId) =>
    navigate(`/ProductDetails/View/${productId}`);
  
  // Open modal to confirm deletion
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };


  const confirmDelete = () => {
    if (productToDelete) {
      axios
        .delete(`product/delete/${productToDelete._id}`)
        .then(() => {

          setProductData(prevData =>
            prevData.filter(product => product._id !== productToDelete._id)
          );
          setIsModalOpen(false);
          setProductToDelete(null);
          toast.success("Product deletion success!");
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          setIsModalOpen(false);
          toast.error("Product deletion failed!");
        });
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };



  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };




  return (
    <>
      {/* Top Control Bar */}
      <div className="flex justify-between items-center py-5 px-4 text bg-slate-100 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-white">Showing</span>
          <select
            className="dark:bg-gray-700 dark:text-white rounded-md p-1"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span className="text-gray-600 dark:text-white">entries</span>
        </div>
        <div className="flex items-center space-x-2">
             <input
            type="text"
            placeholder="Search by name or category..."
            className="px-4 py-2 rounded-md dark:bg-gray-700 dark:text-white text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-gray-500 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.415l4.328 4.327a1 1 0 01-1.414 1.415l-4.328-4.327zM8 14A6 6 0 108 2a6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => navigate('/ProductDetails/Create')}
        >
          + Add New
        </button>
      </div>
      {/* Header */}
      <h4 className="text-3xl font-semibold text-black dark:text-white py-5 px-4">
        Product List
      </h4>

      {/* Header row */}
      <div className="w-full grid grid-cols-[50px_3fr_2fr_1fr_1fr_2fr_1fr] gap-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark">
        <div></div>
        <div className="flex items-center">
          <p className="font-medium">Image & Product Name</p>
        </div>
        <div className="hidden items-center justify-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Status</p>
        </div>
        
        <div className="flex items-center justify-center">
          <p className="font-medium">Created Date</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {/* Product rows */}
      {currentData.map((product) => (
        <div
          className="w-full grid grid-cols-[50px_3fr_2fr_1fr_1fr_2fr_1fr] gap-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark"
          key={product.id} // Use a unique key here
        >
          <div className="flex items-center justify-center">
            <input type="checkbox" className="form-checkbox h-4 w-4" />
          </div>
          <div className="flex items-center">
            <div className="flex gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img
                  // src={`${config.API_URL}${product.images[0]}`}
                  src={product.images[0]}
                  alt={product.productName}
                  className="h-12.5 w-15 rounded-md"
                />

              </div>
              <p className="text-sm text-black dark:text-white">
                {product.productName}
              </p>
            </div>
          </div>
          <div className="hidden items-center justify-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-black dark:text-white">
              {product.status}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-black dark:text-white">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              className="text-gray-500 hover:text-green-700"
              onClick={() => handleViewClick(product._id)}
            >
              <FaEye />
            </button>
            <button
              className="text-gray-500 hover:text-blue-700"
              onClick={() => handleEditClick(product._id)}
            >
              <FaEdit />
            </button>
            <button
              className="text-gray-500 hover:text-red-700"
              onClick={() => handleDeleteClick(product)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}


      {/* Pagination */}
      <div className="flex justify-end items-center py-4 mr-2 text-black">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-gray-200 rounded-md hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-gray-200 rounded-md hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold dark:text-strokedark">
              Confirm Deletion
            </h2>
            <p>Are you sure you want to delete {productToDelete?.name}?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
