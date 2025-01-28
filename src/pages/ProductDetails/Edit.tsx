import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios";
import config from "../../config";
import { toast } from 'sonner';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState('');

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {
        const response = await axios.get(`product/products/${id}`);
        const product = response.data;

        setProductName(product.productName);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory(product.category);
        setColor(product.color);
        setSize(product.size);
        setGender(product.gender);
        setCompareAtPrice(product.compareAtPrice);
        setImages(product.images || []);
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error("Error fetching product details!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



  const handleContentChange = (value: string) => {
    setDescription(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };


  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('color', color);
    formData.append('size', size);
    formData.append('gender', gender);
    formData.append('price', price);
    formData.append('compareAtPrice', compareAtPrice);
  


    images.forEach((image) => {

      formData.append('images', image);

    });



    try {

      const token = localStorage.getItem('token');
      console.log(formData);
      await axios.put(`product/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },

      });
      toast.success("Product updation success!");
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Error updating product details!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <>
      <Breadcrumb pageName="Edit Product" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Details
              </h3>
              <p className="font-small text-black dark:text-white">
                Title,short description,image...
              </p>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>


              {/* Text Section */}
              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Content
                </label>
                <div className="mb-6">
                  <label
                    htmlFor="content"
                    className="block text-lg font-medium mb-2"
                  ></label>
                  <ReactQuill
                    value={description}
                    onChange={handleContentChange}
                    placeholder="Write Something Here"
                    className="h-65"
                  />
                </div>
              </div>

              {/* Images Section */}
              <div>
                <label className="mb-3 mt-3 block font-medium text-black dark:text-white">
                  Images
                </label>
                <div className="flex justify-center items-center w-full">
                  <label
                    htmlFor="images"
                    className="flex flex-col justify-center items-center w-full h-75 border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="w-10 h-10 mb-3 text-gray-400"
                      >
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>

                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Drag and drop</span> a
                        file here or click
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG  (Max 800x400px)
                      </p>
                    </div>
                    <input
                      id="images"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {/*Preview Selected Images*/}
                {images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 mt-3 block font-medium text-black dark:text-white">
                      Selected Images
                    </h4>
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                          <img
                            // src={
                            //   typeof image === "string"
                            //     ? `${config.API_URL}${image}` // Backend image path
                            //     : URL.createObjectURL(image) // Local file object
                            // }
                            src={
                              typeof image === "string"
                                ? image // Backend image path
                                : URL.createObjectURL(image) // Local file object
                            }
                            alt={`Selected ${typeof image === "string" ? `URL ${index}` : image.name || "Image"}`}
                            className="w-full h-full object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-red-300 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Properties
              </h3>
              <p className="font-small text-black dark:text-white">
                Additional functions and attributes...
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6">


              {/* Quantity */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Quantity
                </label>
                <input
                  type="text"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option>Shirt</option>
                  <option>Pants</option>
                  <option>Accessories</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Color
                </label>

                <select
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option>Red</option>
                  <option>Green</option>
                  <option>Yellow</option>
                </select>
              </div>

              {/* Sizes */}
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Sizes
                </label>

                <select
                  id="sizes"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option>sm</option>
                  <option>md</option>
                  <option>lg</option>
                  <option>xl</option>
                  <option>xxl</option>
                </select>
              </div>



              {/* Gender */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender *
                </label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      Male
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      Female
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="kids"
                      checked={gender === 'kids'}
                      onChange={(e) => setGender(e.target.value)}
                      className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      Kids
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            {/* <!-- Pricing Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Pricing
                </h3>
                <p className="font-small text-black dark:text-white">
                  Price related inputs
                </p>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="$0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Compare at Price
                  </label>
                  <input
                    type="text"
                    placeholder="$0.00"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleSubmit}
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-0 px-2 w-30 h-10 rounded text-sm absolute right-0">
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
