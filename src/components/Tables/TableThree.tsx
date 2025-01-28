import { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import customerImage1 from "../../images/customer/customer1.jpeg";
import customerImage2 from "../../images/customer/customer2.jpeg";
import customerImage3 from "../../images/customer/customer3.jpeg";
import customerImage4 from "../../images/customer/customer4.jpeg";


const packageData = [
  {
    orderId: 'ORD123',
    customerName: 'John Doe',
    email: 'john@example.com',
    image: customerImage1,
    invoiceDate: 'Jan 13, 2023',
    invoiceTime: '10:00 AM',
    status: 'Paid',
    total: 0.0,
    paymentMethod: 'Credit Card',
  },
  {
    orderId: 'ORD124',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    image: customerImage2,
    invoiceDate: 'Jan 13, 2023',
    invoiceTime: '11:00 AM',
    status: 'Paid',
    total: 59.0,
    paymentMethod: 'PayPal',
  },
  {
    orderId: 'ORD125',
    customerName: 'Mike Johnson',
    email: 'mike@example.com',
    image: customerImage3,
    invoiceDate: 'Jan 13, 2023',
    invoiceTime: '12:00 PM',
    status: 'Unpaid',
    total: 99.0,
    paymentMethod: 'Bank Transfer',
  },
  {
    orderId: 'ORD126',
    customerName: 'Emily Davis',
    email: 'emily@example.com',
    image: customerImage4,
    invoiceDate: 'Jan 13, 2023',
    invoiceTime: '01:00 PM',
    status: 'Pending',
    total: 59.0,
    paymentMethod: 'Credit Card',
  },
];

const TableWithFilters = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [choose, setChoose] = useState('All');
  const [selectedPackages, setSelectedPackages] = useState({});

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleChooseChange = (e) => {
    setChoose(e.target.value);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const newSelected = {};
    filteredData.forEach((pkg, index) => {
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

  const filteredData = packageData.filter(
    (pkg) =>
      (status === 'All' || pkg.status === status) &&
      (choose === 'All' || pkg.paymentMethod === choose) &&
      (pkg.customerName.toLowerCase().includes(search.toLowerCase()) ||
      pkg.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search customers"
            value={search}
            onChange={handleSearch}
            className="border border-stroke px-3 py-2 rounded"
          />
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-stroke px-3 py-2 rounded"
          >
            <option value="All">Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <select
            value={choose}
            onChange={handleChooseChange}
            className="border border-stroke px-3 py-2 rounded"
          >
            <option value="All">Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-red-200 hover:bg-red-300 text-red-700 px-4 py-2 rounded">
            Add New Package
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
            Filter
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="form-checkbox"
                />
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Order ID
              </th>
              <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                Customer
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Total
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Payment Method
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Order Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((pkg, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4">
                  <input
                    type="checkbox"
                    checked={!!selectedPackages[index]}
                    onChange={() => handleSelect(index)}
                    className="form-checkbox"
                  />
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  {pkg.orderId}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 flex items-center">
                  <img src={pkg.image} alt={pkg.customerName} className="w-8 h-8 rounded-full mr-2" />
                  <div>
                    <div>{pkg.customerName}</div>
                    <div className="text-sm text-gray-600">{pkg.email}</div>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  {pkg.invoiceDate}
                  <div className="text-sm">{pkg.invoiceTime}</div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  ${pkg.total.toFixed(2)}
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  {pkg.paymentMethod}
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      pkg.status === 'Paid'
                        ? 'bg-success text-success'
                        : pkg.status === 'Unpaid'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {pkg.status}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4">
                  <div className="flex items-center space-x-3">
                    <button className="hover:text-primary">
                      <FaEye />
                    </button>
                    <button className="hover:text-primary">
                      <FaEdit />
                    </button>
                    <button className="hover:text-primary">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWithFilters;
