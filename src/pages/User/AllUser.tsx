import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Button, Modal, Pagination } from 'antd';
import axios from "../../axios";
import config from "../../config"
import {toast} from "sonner";


const AllUser = () => {
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response from backend:", response.data);
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          toast.error("Unexpected Response");
          console.error("Unexpected response format:", response.data);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Users");
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const pageSizes = [5, 10, 20, 30];

  const handleSaveCustomer = async () => {
    try {
      setLoading(true);

      if (!newCustomer.name || !newCustomer.email || !newCustomer.password || !newCustomer.confirmPassword) {
        alert("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (newCustomer.password !== newCustomer.confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "auth/register",
        {
          name: newCustomer.name,
          email: newCustomer.email,
          password: newCustomer.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      toast.success("User added successfully!");
      setShowModal(false);

      setNewCustomer({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleEditCustomer = (id) => {
    const customerToEdit = customers.find((customer) => customer.id === id);
    if (customerToEdit) {
      setNewCustomer({
        ...customerToEdit,
        password: '', // Clear password for editing
        confirmPassword: '', // Clear confirmPassword for editing
      });
      setShowModal(true);
    } else {
      toast.error("Customer not found");
    }
  };
  

  const confirmDeleteCustomer = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCustomer = () => {
    setCustomers(
      customers.filter((customer) => customer.id !== customerToDelete.id),
    );
    setShowDeleteConfirmation(false);
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(
        selectedCustomers.filter((customerId) => customerId !== id),
      );
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id));
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

  );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Customer List ({filteredCustomers.length})</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px', marginRight: '10px' }}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Customer
          </button>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center', width: '60px' }}>
              <input
                type="checkbox"
                checked={selectedCustomers.length === filteredCustomers.length}
                onChange={handleSelectAll}
                style={{ transform: 'scale(1)' }}
              />
            </th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Profile</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>

            <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleSelectCustomer(customer.id)}
                />
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <img

                  src={`${config.API_URL}${customer.photo}`}
                  alt="Customer"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
              </td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>

              <td style={{ textAlign: 'center' }}
              >
                <Button
                  icon={<FaEdit />}
                  onClick={() => handleEditCustomer(customer.id)}
                  style={{ marginRight: '5px' }}
                  className='dark:text-blue-600'
                />
                <Button
                  icon={<FaTrashAlt />}
                  onClick={() => confirmDeleteCustomer(customer.id)}
                  className='dark:text-red-600'
                />
            
              </td>
  
             
            </tr>
        
          ))}
        </tbody>
      </table>

      <>
      {filteredCustomers.length > pageSize && (
        <Pagination
          current={currentPage}
          total={filteredCustomers.length}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          itemRender={itemRender}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'fixed', 
            bottom: '220px',
            right: '65px',
            zIndex: 8,
          }}
          pageSizeOptions={pageSizes}
        />
      )}
    </>

      {/* Edit/Add Customer Modal */}
      <Modal
        title={newCustomer.id ? 'Edit Customer' : 'Add Customer'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSaveCustomer}
        confirmLoading={loading}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={newCustomer.name || ''}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="Enter name"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={newCustomer.email || ''}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            placeholder="Enter email"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={newCustomer.password || ''}
            onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
            placeholder="Enter password"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={newCustomer.confirmPassword || ''}
            onChange={(e) => setNewCustomer({ ...newCustomer, confirmPassword: e.target.value })}
            placeholder="Confirm password"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {newCustomer.password &&
            newCustomer.confirmPassword &&
            newCustomer.password !== newCustomer.confirmPassword && (
              <span style={{ color: 'red', fontSize: '12px' }}>Passwords do not match</span>
            )}
        </div>
      </Modal>


      <Modal
        title="Confirm Delete"
        open={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onOk={handleDeleteCustomer}
        okText="Delete"
        cancelText="Cancel"
        closable
      >
        <p>Are you sure you want to delete {customerToDelete?.name}?</p>
      </Modal>

    </div>
  );
};

export default AllUser;
