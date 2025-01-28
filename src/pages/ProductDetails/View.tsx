import { useEffect, useState } from 'react';
import UserTwo from '../../images/user/user-02.png';
import UserFive from '../../images/user/user-05.png';
import { toast } from "sonner";
import { useParams } from 'react-router-dom';
import axios from "../../axios"
import config from "../../config";


const View = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [productImages, setProductImages] = useState([]);
  const colors = ['red', 'black', 'blue', 'brown'];
  const sizes = ['sm', 'md', 'lg', 'xl', 'xxl'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`product/products/${id}`);

        setProduct(response.data);
        setSelectedColor(response.data.colors[0]); // Default color
        setSelectedSize(response.data.sizes[0]); // Default size
        setImages(response.data.images || []);

        if (response.data.images && response.data.images.length > 0) {
          setProductImages(response.data.images);
        }
        console.log(productImages)

      } catch (error) {
        // toast.error("Failed to load product details");
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


  useEffect(() => {
    const interval = setInterval(() => {
      if (product && product.images) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [product]);



  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {/* Container for Left and Right Sections */}
      <div className="flex flex-col md:flex-row p-6 bg-gray-10 md:space-x-8 h-full dark:border-strokedark dark:bg-black-100">
        {/* Left Side - Product Image Gallery */}
        <div className="flex-2 bg-white p-6 rounded-lg shadow-lg h-full dark:border-strokedark dark:bg-boxdark">
          <div className="w-80 h-80 flex items-center justify-center border rounded-lg mb-6 bg-gray-100">
            {/* Image Display Section */}
            <img
              // src={`${config.API_URL}${product.images[currentImageIndex]}`}
              src={product.images[currentImageIndex]}
              alt={`Product ${currentImageIndex}`}
              className="h-full w-auto"
            />
          </div>

          {/* Image Preview Section */}
          <div className="flex space-x-4 justify-center mb-8">
            {product.images.length > 0 &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 border rounded-lg cursor-pointer ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
          </div>

        </div>

        {/* Right Side - Product Details */}
        <div className="flex-1 bg-white p-6 space-y-9 rounded-lg shadow-lg h-full dark:border-strokedark dark:bg-boxdark">
          <button className="bg-green-500 text-white text-sm font-medium py-1 px-3 rounded">
            New Arrival
          </button>
          <h2 className="text-2xl text-black font-bold dark:text-white">
            {product.productName}
          </h2>

          {/* Rating */}
          <div className="flex items-center space-x-1 text-yellow-500">
            <span className="text-lg">★★★★☆</span>
            <span className="text-gray-500">(4.5)</span>
            <span className="text-gray-400">55 Reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-black dark:text-white">${product.price}</span>
            <span className="text-gray-500 line-through">${product.compareAtPrice}</span>
            <span className="text-red-500">
              ({Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% Off)
            </span>
          </div>

          {/* Colors and Sizes */}
          <div className="flex flex-row space-x-8 mt-4">
            <div className="flex flex-col">
              <p className="font-medium text-black mb-2 dark:text-white">
                Colors &gt; <span className="font-medium text-gray-500 dark:text-white">{selectedColor || product.color}</span>
              </p>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center ${selectedColor === color
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
            </div>
            {/* Sizes */}
            <div className="flex flex-col">
              <p className="font-medium text-black mb-2 dark:text-white">
                Size &gt; <span className="font-medium text-gray-500 dark:text-white">{selectedSize || product.size}</span>
              </p>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border text-gray-700 font-semibold ${selectedSize === size
                      ? 'bg-gray-300 border-transparent'
                      : 'bg-gray-100 border-transparent'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-4 mt-4">
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
          </div>


          {/* Availability and Offer */}
          <div className="space-y-2 text-sm text-gray-700 mt-4 dark:text-white">
            <p>✅ {product.status === 'available' ? 'In Stock' : 'Out of Stock'}</p>
            <p>✅ Free delivery available</p>
            <p>✅ Sales 10% Off. Use Code: <span className="font-semibold text-black">CODE123</span></p>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-medium font-medium text-black dark:text-white">Description:</h3>
            <p className="text-gray-700 dark:text-white">
              Top in sweatshirt fabric made from a cotton blend with a soft
              brushed inside. Relaxed fit with dropped shoulders, long sleeves
              and ribbing around the neckline, cuffs, and hem. Small metal text
              applique.
            </p>
          </div>

          {/* Available offers */}
          <div className="mt-4">
            <h3 className="text-medium font-medium text-black dark:text-white">
              Available offers:
            </h3>
            <p className="text-gray-700 dark:text-white">
              ✅ Bank Offer: 10% instant discount on Bank Debit Cards, up to $30
              on orders of $50 and above
            </p>
            <p className="text-gray-700 dark:text-white">
              ✅ Bank Offer: Grab our 5% Cashback with Code: FIRSTBUY
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-start space-x-6">
          {/* Free Shipping */}
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
              <p className="text-gray-500 text-sm dark:text-white">Only in this week</p>
            </div>
          </div>

          {/* Special Discounts */}
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
                  d="M12 8c.828 0 1.5.672 1.5 1.5S12.828 11 12 11s-1.5-.672-1.5-1.5S11.172 8 12 8zM21 12l-9 9-9-9"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-white">
                Special discounts for customers
              </p>
              <p className="text-gray-500 text-sm dark:text-white">Coupons up to $100</p>
            </div>
          </div>

          {/* Free Gift Wrapping */}
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
                  d="M3 8l7.293 7.293a1 1 0 001.414 0L19 8M5 20h14M7 12V5.5a2.5 2.5 0 015 0V12M7 12h10M5 20h14"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-white">Free gift wrapping</p>
              <p className="text-gray-500 text-sm dark:text-white">
                With 100 letters custom note
              </p>
            </div>
          </div>

          {/* Expert Customer Service */}
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
                  d="M9 12h6m-3-3v6m-5 4h10a2 2 0 002-2v-1a5 5 0 00-5-5H9a5 5 0 00-5 5v1a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-white">
                Expert Customer Service
              </p>
              <p className="text-gray-500 text-sm dark:text-white">8:00 - 20:00, 7days/week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Container for Items Detail and Reviews Section */}
      <div className="flex flex-col md:flex-row p-6 bg-gray-10 md:space-x-8 h-full mt-5 dark:border-strokedark dark:bg-black-100">
        {/* Items Detail Section */}
        <div className="flex-1 bg-white space-y-1 p-6 rounded-lg shadow-lg h-full dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
            Items Detail
          </h2>
          <p>
            <span className="font-medium text-black dark:text-white">Product Dimensions</span> :
            53.3 x 40.6 x 6.4 cm; 500 Grams
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Date First Available</span>{' '}
            : 22 September 2023
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Department</span> : Men
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Manufacturer</span> :
            Greensboro, NC 27401 Prospa-Pal
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">ASIN</span> : B0CJMML118
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Item model number</span> :
            1137AZ
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Country of Origin</span> :
            U.S.A
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Packer</span> : Apt. 726
            80915 Hung Stream, Rowetown, WV 44364
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Importer</span> : Apt. 726
            80915 Hung Stream, Rowetown, WV 44364
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Item Weight</span> : 500 g
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">
              Item Dimensions LxWxH
            </span>{' '}
            : 53.3 x 40.6 x 6.4 Centimeters
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Generic Name</span> :
            T-Shirt
          </p>
          <p>
            <span className="font-medium text-black dark:text-white">Best Sellers Rank</span> : #13 in
            Clothing & Accessories
          </p>
          <p className="text-orange-500 font-medium cursor-pointer">
            View More Details &rarr;
          </p>
        </div>

        {/* Top Review From World Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md dark:border-strokedark dark:bg-boxdark ">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">
            Top Reviews From World
          </h2>
          {/* Review 1 */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <img
                src={UserTwo}
                alt="Henny K. Mark"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Henny K. Mark</p>
                <p className="text-yellow-500">★★★★☆</p>
                <p className="text-blue-600 font-medium">Excellent Quality</p>
              </div>
            </div>
            <p className="text-medium text-black dark:text-white">
              Reviewed in Canada on 16 November 2023
            </p>
            <p className="text-sm text-gray-700 dark:text-white">
              Medium thickness. Did not shrink after wash. Good elasticity. XL
              size Perfectly fit for 5.10 height and heavy body. Did not fade
              after wash. Only for maroon colour t-shirt colour lightly gone in
              first wash but not faded. I bought 5 tshirt of different colours.
              Highly recommended in so low price.
            </p>
            <div className="flex space-x-4 mt-2 text-sm text-blue-500">
              <p className="cursor-pointer">Helpful</p>
              <p className="cursor-pointer">Report</p>
            </div>
          </div>

          <hr />

          {/* Review 2 */}
          <div className="mt-6">
            <div className="flex items-center space-x-4 mb-2">
              <img
                src={UserFive}
                alt="Jorge Herry"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Jorge Herry</p>
                <p className="text-yellow-500">★★★★☆</p>
                <p className="text-blue-600 font-medium">Good Quality</p>
              </div>
            </div>
            <p className="text-medium text-black">
              Reviewed in U.S.A on 21 December 2023
            </p>
            <p className="text-sm text-gray-700 dark:text-white">
              I liked the tshirt, it's pure cotton & skin friendly, but the size
              is smaller to compare standard size. Best rated.
            </p>
            <div className="flex space-x-4 mt-2 text-sm text-blue-500">
              <p className="cursor-pointer">Helpful</p>
              <p className="cursor-pointer">Report</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
