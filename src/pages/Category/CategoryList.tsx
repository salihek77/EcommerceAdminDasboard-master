import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import config from '../../config';
import { toast } from 'sonner';

const productData: Product[] = []

const CategoryList = () => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [categoryData, setCatgeoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('category/categories')
      .then(response => {
        setCategories(response.data.categories);
        setCatgeoryData(response.data.categories); // Save full category data for filtering
        console.log(response.data)
      })
      .catch(error => {
        toast.error("Error fetching categories");
      });
  }, []);

  // Filter categories based on the search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = categoryData.filter(category =>
      category?.name?.toLowerCase().includes(lowercasedQuery) || 
      category?.category?.toLowerCase().includes(lowercasedQuery) // Check if category exists
    );
    setFilteredData(filtered);
  }, [searchQuery, categoryData]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (productId: number) =>
    navigate(`/Category/EditCategory/${productId}`);
  const handleViewClick = (productId: number) =>
    navigate(`/Category/ListViewCategory/${productId}`);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : [];

  const handleDeleteClick = (category: category) => {
    setProductToDelete(category);
    setIsModalOpen(true);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const confirmDelete = () => {
    if (productToDelete) {
      axios
        .delete(`category/delete/${productToDelete._id}`)
        .then(() => {
          setCategories(prevCategories =>
            prevCategories.filter(category => category._id !== productToDelete._id)
          );
          setIsModalOpen(false);
          setProductToDelete(null);
          toast.success("Category deletion success!");
        })
        .catch((error) => {
          console.error('Error deleting category:', error);
          setIsModalOpen(false);
          toast.error("Category deletion failed!");
        });
    }
  };

  const handleAddNewCategory = () => {
    navigate('/Category/NewCategory');
  };

  return (
    <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
      <div className="flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Category List</h4>
      </div>
   <div className='flex justify-between '>

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
      </div>

      {/* Add New Category Button positioned near the products */}
      <div className="py-4 px-4 mb-4 mt-5 flex justify-start">
        <button
          onClick={handleAddNewCategory}
          className="bg-orange-500 text-white py-2 px-4 rounded-md transition duration-200 hover:bg-orange-600"
        >
          Add New Category
        </button>
      </div> 

   </div>

      <div className="py-4 px-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Category List</h5>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-3 text-left p-4"></th>
                <th className="py-2 text-left">Category Name</th>
                <th className="py-2 text-left">Stock</th>
                <th className="py-2 text-left">TagID</th>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((category, key) => (
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 dark:bg-gray-800" key={key}>
                  <td className="py-2">
                    {/* <img src={`${config.API_URL}${category?.image}`} alt={category?.name} className="w-10 h-10 rounded-md" /> */}
                    <img src={category?.image} alt={category?.name} className="w-10 h-10 rounded-md" />
                  </td>
                  
                  <td className="py-2">{category?.name}</td>
                  <td className="py-2">{category?.stock}</td>
                  <td className="py-2">{category?.tag ? category.tag : "N/A"}</td>
                  <td className="py-2">{new Date(category?.createdAt).toLocaleDateString()}</td>
                  <td className="py-2">{category?.stock > 0 ? "In Stock" : "Out of Stock"}</td>
                  <td className="mt-5 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      onClick={() => handleViewClick(category._id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 transition"
                      onClick={() => handleEditClick(category._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDeleteClick(category)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm mx-auto">
            <h3 className="text-black dark:text-black font-semibold">Are you sure you want to delete this category?</h3>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-4 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white py-2 px-4 rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white py-2 px-4 rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
