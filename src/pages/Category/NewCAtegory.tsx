import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from "../../axios";
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';



const NewCategory = () => {
  const {user} = useAuthStore();
  const [productDetails, setProductDetails] = useState({
    name: '',
    stock: '',
    image: null,
    tag: '',
    description: '',
    metaTitle: '',
    metaKeyword: '',
    metaDescription: '',
  });


  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductDetails({ ...productDetails, image: e.target.files![0] });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(productDetails).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'category/', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      toast.success("Category Created")
      console.log('Category created:', response.data);
  
      setProductDetails({
        name: '',
        stock: '',
        image: null,
        tag: '',
        description: '',
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
      });
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error("Error creating category");
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setProductDetails({
      name: '',
      stock: '',
      image: null,
      tag: '',
      description: '',
      metaTitle: '',
      metaKeyword: '',
      metaDescription: '',
    });
  };




  return (
    <div className="flex flex-col space-y-4 px-4 md:px-0">
      <h2 className="text-xl font-bold text-gray-400 shadow-lg dark:border-gray-600 dark:bg-gray-800">
        CREATE CATEGORY
      </h2>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4 rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 p-4">
          <img
        
            src={productDetails.image ? URL.createObjectURL(productDetails.image) : " "}
            alt={productDetails.image ? productDetails.image.name : " "}
            className="w-full h-32 object-cover rounded-3xl mb-2"
          />
          <div className="flex space-x-2 mb-2">
            <span>
              Created By:
              <span className="font-bold">{user.name}</span>
            </span>
          </div>
          <div className="border-t border-gray-300 mb-2 dark:border-gray-700"></div>
          <div className="flex justify-between">
          
            <button
              onClick={handleCancel}
              className="bg-orange-500 text-white rounded-xl px-4 py-1 transition duration-300 ease-in-out hover:bg-orange-700"
            >
              Cancel
            </button>
            <button
          onClick={handleSubmit}
          className={`bg-transparent border-2 border-gray-300 dark:border-gray-700 text-black rounded-lg px-4 py-2 transition duration-300 ease-in-out ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
          } dark:text-white`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
          </div>
        </div>

        <div className="w-full md:w-3/4 rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 p-4">
          <h5 className="text-lg font-semibold mb-2">Upload Thumbnail Image</h5>
          <div className="border border-gray-200 mb-4 dark:border-gray-700"></div>
          <div className="border-dashed border-2 border-gray-200 dark:border-gray-700 p-6 h-48 flex items-center justify-center relative">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                id='image'
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="text-center">
                <FaUpload className="text-3xl mb-2 text-orange-500 mx-auto" />
                <p className="text-black text-lg dark:text-white">
                  <strong>Drop your images here, or </strong>
                  <span className="text-orange-500">
                    <strong>click to browse</strong>
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-white">
                  1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are
                  allowed.
                </p>
              </div>
            </label>
            {productDetails.image && (
              <p className="mt-2">Selected: {productDetails.image.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="w-full md:w-3/4 space-y-4">
          <div className="rounded-3xl border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 p-4">
            <h5 className="text-lg font-semibold mb-2">General Information</h5>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-4"></div>

            <form>
              <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block mb-1">Category Title</label>
                  <input
                    type="text"
                    name="name"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 rounded-lg w-full p-2"
                    placeholder="Enter Title"
                  />
                </div>
                {/* <div className="flex-1">
                  <label className="block mb-1">Created By</label>
                  <select
                    name="createdBy"
                    value={productDetails.createdBy}
                    onChange={handleInputChange}
                    className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                  >
                    <option value="Select Creator">Select Creator</option>
                    <option value="Admin">Admin</option>
                    <option value="Seller">Seller</option>
                    <option value="Other">Other</option>
                  </select>
                </div> */}
              </div>

              <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={productDetails.stock}
                    onChange={handleInputChange}
                    className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                    placeholder="Quantity"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Tag ID</label>
                  <input
                    type="text"
                    name="tag"
                    value={productDetails.tag}
                    onChange={handleInputChange}
                    className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                    placeholder="#******"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={productDetails.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                  rows={4}
                  placeholder="Type description..."
                />
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 p-4">
            <h5 className="text-lg font-semibold mb-2">Meta Options</h5>
            <div className="border-b border-gray-300 mb-4 dark:border-gray-700"></div>

            <form>
              <div className="mb-4">
                <label className="block mb-1">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={productDetails.metaTitle}
                  onChange={handleInputChange}
                  className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                  placeholder="Enter Title"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Meta Tag Keyword</label>
                <input
                  type="text"
                  name="metaKeyword"
                  value={productDetails.metaKeyword}
                  onChange={handleInputChange}
                  className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                  placeholder="Enter word"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="metaDescription"
                  value={productDetails.metaDescription}
                  onChange={handleInputChange}
                  className="border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 rounded-lg w-full p-2"
                  rows={4}
                  placeholder="Type description..."
                />
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 text-white p-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-orange-500 text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-orange-700 mr-4"
              >
                Cancel
              </button>
              <button
          onClick={handleSubmit}
          className={`bg-transparent border-2 border-gray-300 dark:border-gray-700 text-black rounded-lg px-4 py-2 transition duration-300 ease-in-out ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
          } dark:text-white`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
