import { useEffect, useState } from 'react';
import axios from "../../axios";
import config from '../../config';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';


const ListViewCategory = () => {

  const {id} = useParams();
  // const [quantity, setQuantity] = useState(1);
  // const [selectedColor, setSelectedColor] = useState('black');
  // const [selectedSize, setSelectedSize] = useState('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
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
 
  // const colors = ['black', 'gray', 'white', 'blue', 'red'];
  // const sizes = ['sm','md', 'Lg', 'XL', 'XXL'];
 

  // const increaseQuantity = () => setQuantity((prev) => prev + 1);
  // const decreaseQuantity = () =>
  //   setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {

        const response = await axios.get(`category/categories/${id}`);

        const data = response.data

        setProductDetails({
          name: data.category.name || '',
          stock: data.category.stock || '',
          image: data.category.image || null,
          tag: data.category.tag || '',
          description: data.category.description || '',
          metaTitle: data.category.metaTitle || '',
          metaKeyword: data.category.metaKeyword || '',
          metaDescription: data.category.metaDescription || '',
        });
        setInitialLoading(false);
      } catch (error) {
        console.error('Error fetching category details:', error);
        toast.error("Failed to load category details");
      }
    };
    fetchCategoryDetails();
  }, [id]);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex(
  //       (prevIndex) => (prevIndex + 1) % productDetails.image.length,
  //     );
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, [productDetails.image.length]);

  return (
    <>
      <div className="flex flex-col md:flex-row p-6 bg-gray-10 md:space-x-8 h-full dark:border-strokedark dark:bg-black-100">
        <div className="flex-2 bg-white p-6 rounded-lg shadow-lg h-full dark:border-strokedark dark:bg-boxdark">
          <div className="w-80 h-80 flex items-center justify-center border rounded-lg mb-6 bg-gray-100">
          {/* <img
              src={`${config.API_URL}${productDetails.image}`}
              alt={`Product ${currentImageIndex}`}
              className="h-full w-auto"
            /> */}
               <img
              src={productDetails.image}
              alt={`Product ${currentImageIndex}`}
              className="h-full w-auto"
            />
          </div>
          {/* <div className="flex space-x-4 justify-center mb-8">
            {productImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Thumbnail"
                className="w-16 h-16 border rounded-lg cursor-pointer"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div> */}
        </div>

        <div className="flex-1 bg-white p-6 space-y-9 rounded-lg shadow-lg h-full dark:border-strokedark dark:bg-boxdark">
          <button className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded">
            New Category
          </button>
          <h2 className="text-2xl text-black font-bold dark:text-white">
         {productDetails.name}
          </h2>

          <div className="flex items-center space-x-1 text-yellow-500">
            <span className="text-lg">★★★★☆</span>
            <span className="text-gray-500">(4.5)</span>
            <span className="text-gray-400">55 Reviews</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-black dark:text-white">Available Stocks {productDetails.stock}</span>
            <span className="text-gray-500 ">Tag Id : {productDetails.tag}</span>
            <span className="text-red-500">Meta Title : {productDetails.metaTitle}</span>
          </div>

          <div className="flex flex-row space-x-8 mt-4">
            {/* <div className="flex flex-col">
              <p className="font-medium text-black mb-2 dark:text-white">
                Colors &gt; <span className="font-medium text-gray-500 dark:text-white">Black</span>
              </p>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center ${
                      selectedColor === color
                        ? 'border-gray-500'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* <div className="flex items-center space-x-4 mt-4">
            <p className="font-medium text-black dark:text-white">Quantity:</p>
            <div className="flex items-center border rounded-full px-2 bg-gray-100">
              <button onClick={decreaseQuantity} className="px-3 py-1 text-gray-500 font-semibold">
                -
              </button>
              <span className="px-4 font-medium text-black">{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-1 text-gray-500 font-semibold">
                +
              </button>
            </div>
          </div> */}

          <div className="space-y-2 text-sm text-gray-700 mt-4 dark:text-white">
            <p>✅ In Stock</p>
            <p>✅ Free delivery available</p>
            <p>
              ✅ Sales 20% Off. Use Code:{' '}
              <span className="font-semibold text-gray-500">DEAL20</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-medium font-medium text-black dark:text-white">Description:</h3>
            <p className="text-gray-700 dark:text-white">
             {productDetails.description}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-medium font-medium text-black dark:text-white">Meta Description:</h3>
            <p className="text-gray-700 dark:text-white">
             {productDetails.metaDescription}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-medium font-medium text-black dark:text-white">
              Available offers:
            </h3>
            <p className="text-gray-700 dark:text-white">
              ✅ Bank Offer: 10% instant discount on Bank Debit Cards, up to $30 on orders of $50
              and above
            </p>
            <p className="text-gray-700 dark:text-white">
              ✅ Bank Offer: Grab our 5% Cashback with Code: FIRSTBUY
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-start space-x-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m5-8h4m-4 0l-2 8m6-8l2 8m-6-16h.01M13 5h.01M15 20a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-white">
                Free shipping for all orders over $200
              </p>
              <p className="text-gray-500 text-sm dark:text-white">Only this week</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m4 4l4-4m0 0l-4-4"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-white">
                30-day return policy
              </p>
              <p className="text-gray-500 text-sm dark:text-white">
                See return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListViewCategory;
