import { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import customerImage1 from "../../images/customer/customer1.jpeg";
import customerImage2 from "../../images/customer/customer2.jpeg";
import customerImage3 from "../../images/customer/customer3.jpeg";
import customerImage4 from "../../images/customer/customer4.jpeg";


const packageData = [
  { orderId: 'ORD123', customerName: 'John Doe', email: 'john@example.com', image: customerImage1, invoiceDate: 'Jan 13, 2023', invoiceTime: '10:00 AM', status: 'Paid', total: 0.0, paymentMethod: 'Credit Card' },
  { orderId: 'ORD124', customerName: 'Jane Smith', email: 'jane@example.com', image: customerImage2, invoiceDate: 'Jan 13, 2023', invoiceTime: '11:00 AM', status: 'Paid', total: 59.0, paymentMethod: 'PayPal' },
  { orderId: 'ORD125', customerName: 'Mike Johnson', email: 'mike@example.com', image: customerImage3, invoiceDate: 'Jan 13, 2023', invoiceTime: '12:00 PM', status: 'Unpaid', total: 99.0, paymentMethod: 'Bank Transfer' },
  { orderId: 'ORD126', customerName: 'Emily Davis', email: 'emily@example.com', image: customerImage4, invoiceDate: 'Jan 13, 2023', invoiceTime: '01:00 PM', status: 'Pending', total: 59.0, paymentMethod: 'Credit Card' },
  { orderId: 'ORD127', customerName: 'Sarah Lee', email: 'sarah@example.com', image: customerImage1, invoiceDate: 'Jan 14, 2023', invoiceTime: '02:00 PM', status: 'Paid', total: 49.0, paymentMethod: 'PayPal' },
  { orderId: 'ORD128', customerName: 'David Brown', email: 'david@example.com', image: customerImage2, invoiceDate: 'Jan 14, 2023', invoiceTime: '03:00 PM', status: 'Unpaid', total: 119.0, paymentMethod: 'Credit Card' },
  { orderId: 'ORD129', customerName: 'Laura White', email: 'laura@example.com', image: customerImage3, invoiceDate: 'Jan 15, 2023', invoiceTime: '04:00 PM', status: 'Paid', total: 39.0, paymentMethod: 'Bank Transfer' },
  { orderId: 'ORD130', customerName: 'James Wilson', email: 'james@example.com', image: customerImage4, invoiceDate: 'Jan 15, 2023', invoiceTime: '05:00 PM', status: 'Pending', total: 79.0, paymentMethod: 'Credit Card' },
  { orderId: 'ORD131', customerName: 'Chris Martin', email: 'chris@example.com', image: customerImage1, invoiceDate: 'Feb 01, 2023', invoiceTime: '06:00 PM', status: 'Paid', total: 89.0, paymentMethod: 'Credit Card' },
  { orderId: 'ORD132', customerName: 'Megan Green', email: 'megan@example.com', image: customerImage2, invoiceDate: 'Feb 02, 2023', invoiceTime: '07:00 PM', status: 'Unpaid', total: 79.0, paymentMethod: 'PayPal' },
  { orderId: 'ORD133', customerName: 'George Brown', email: 'george@example.com', image: customerImage3, invoiceDate: 'Feb 03, 2023', invoiceTime: '08:00 PM', status: 'Pending', total: 129.0, paymentMethod: 'Bank Transfer' },
  { orderId: 'ORD134', customerName: 'Anna White', email: 'anna@example.com', image: customerImage4, invoiceDate: 'Feb 04, 2023', invoiceTime: '09:00 PM', status: 'Paid', total: 99.0, paymentMethod: 'Credit Card' }
];

const TableWithFilters = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [selectedPackages, setSelectedPackages] = useState({});
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [choose, setChoose] = useState('All');
  const [productToDelete, setProductToDelete] = useState(null);

  const totalPages = Math.ceil(packageData.length / itemsPerPage);
  const filteredData = packageData.filter(
    (pkg) =>
      (status === 'All' || pkg.status === status) &&
      (choose === 'All' || pkg.paymentMethod === choose) &&
      (pkg.customerName.toLowerCase().includes(search.toLowerCase()) ||
        pkg.email.toLowerCase().includes(search.toLowerCase()))
  );
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const newSelected = {};
    currentData.forEach((pkg, index) => {
      newSelected[index] = checked;
    });
    setSelectedPackages(newSelected);
  };

  const handleSelect = (index) => {
    setSelectedPackages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDeleteClick = (pkg) => {
    setProductToDelete(pkg);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting order: ${productToDelete?.orderId}`);
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const handleViewClick = (orderId) => navigate(`/OrderDetails/View/${orderId}`);
  const handleEditClick = (orderId) => navigate(`/OrderDetails/Edit/${orderId}`);

  return (
    <>
      <div className="flex justify-between items-center py-5 px-4 text bg-slate-100 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-white">Search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Search customers"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="All">Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <select
            value={choose}
            onChange={(e) => setChoose(e.target.value)}
            className="px-4 py-2 rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="All">Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      <div className="w-full grid grid-cols-[50px_3fr_2fr_1fr_1fr_2fr_1fr] gap-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark">
        <div></div>
        <div className="flex items-center">
          <p className="font-medium">Customer</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Date</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Total</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Payment Method</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Order Status</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {currentData.map((pkg, index) => (
        <div
          key={pkg.orderId}
          className="w-full grid grid-cols-[50px_3fr_2fr_1fr_1fr_2fr_1fr] gap-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark"
        >
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={!!selectedPackages[index]}
              onChange={() => handleSelect(index)}
              className="checkbox"
            />
          </div>
          <div className="flex items-center space-x-2">
            <img src={pkg.image} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium">{pkg.customerName}</p>
              <p className="text-sm">{pkg.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xs text-gray-600">{pkg.invoiceDate}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-semibold">{pkg.total}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm">{pkg.paymentMethod}</p>
          </div>
          <div className="flex items-center justify-center">
            <span
              className={`px-3 py-1 rounded-md ${
                pkg.status === 'Paid'
                  ? 'bg-green-100 text-green-500'
                  : pkg.status === 'Unpaid'
                  ? 'bg-red-100 text-red-500'
                  : 'bg-yellow-100 text-yellow-500'
              }`}
            >
              {pkg.status}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <button
              className="text-gray-800 dark:text-gray-400"
              onClick={() => handleViewClick(pkg.orderId)}
            >
              <FaEye />
            </button>
            <button
              className="text-gray-800 dark:text-gray-400"
              onClick={() => handleEditClick(pkg.orderId)}
            >
              <FaEdit />
            </button>
            <button
              className="text-gray-800 dark:text-gray-400"
              onClick={() => handleDeleteClick(pkg)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-end items-center py-4 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-white text-black px-4 py-2 rounded dark:text-white dark:bg-gray-700"
        >
          Previous
        </button>
        <span className="text-gray-700 mx-4 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-white text-black px-4 py-2 rounded dark:text-white dark:bg-gray-700"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h3 className="font-medium text-lg">Confirm Deletion</h3>
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableWithFilters;
