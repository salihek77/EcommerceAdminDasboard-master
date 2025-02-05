import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import Create from './pages/ProductDetails/Create';
import Edit from './pages/ProductDetails/Edit';
import View from './pages/ProductDetails/View';
import OrderDetail from './pages/Order/OrderDetail';
import OrderList from './pages/Order/OrderList';
import OrderTracking from './pages/Order/OrderTracking';
import AllUser from './pages/User/AllUser';
import HelpCenter from './pages/HelpCenter/HelpCenter';
import CategoryList from './pages/Category/CategoryList';
import NewCAtegory from './pages/Category/NewCAtegory';
import List from './pages/ProductDetails/List';
import Analytics from './pages/Analytics/Analytics';
import Chats from './pages/Chats/Chats';
import Review from './pages/Reviews/Review';
import Login from './pages/Login/Login';
import ListViewCategory from './pages/Category/ListViewCategory';
import EditCategory from './pages/Category/EditCategory';
import { useAuthStore } from "./store/authStore";
import Profile from './pages/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  

  const user = useAuthStore((state) => state.user);
  
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  

  if (loading) return <Loader />;

  return (
    <Routes>
      {/* Public Route: Login */}
      <Route path="/login" element={user ? <ECommerce /> : <Login />} />
      <Route path="/" element={<Navigate to={user ? "/ecommerce" : "/login"} replace />} />
      
      {/* Protected Routes */}
      <Route
        path="/ecommerce"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="eCommerce Dashboard" />
              <ECommerce />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/Analytics"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Analytics" />
              <Analytics />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="profile" />
              <Profile />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
       <Route
        path="/profile/:userId"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="profile" />
              <Profile />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      

      <Route
        path="/ProductDetails/list"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Product Details - List" />
              <List />
            </DefaultLayout>
         ) : (
          <Navigate to="/login" replace />
        )
        }
      />
      <Route
        path="/ProductDetails/create"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Create Product" />
              <Create />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ProductDetails/edit"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Edit Product" />
              <Edit />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ProductDetails/edit/:id"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Edit Product" />
              <Edit />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ProductDetails/view"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="View Product" />
              <View />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/ProductDetails/view/:id"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="View Product" />
              <View />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
          path="/Category/CategoryList"
          element={
            user ? (
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CategoryList />
              </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
          }
        />
        <Route
          path="/Category/NewCAtegory"
          element={
            user ? (
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <NewCAtegory />
              </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
          }
        />

        <Route
          path="/Category/ListViewCategory"
          element={
            user ? (
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ListViewCategory />
              </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
          }
        />
        <Route
          path="/Category/ListViewCategory/:id"
          element={
            user ? (
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ListViewCategory />
              </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
          }
        />
        <Route
          path="/Category/EditCategory"
          element={
            user ? (
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditCategory />
              </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
          }
        />
        <Route
          path="/Category/EditCategory/:id"
          element={
            user ? (
              <DefaultLayout>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditCategory />
              </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
          }
        />

      <Route
        path="/Orders/OrderDetail"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Order Detail" />
              <OrderDetail />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/Orders/OrderList"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Order List" />
              <OrderList />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/orders/OrderTracking"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Order Tracking" />
              <OrderTracking />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/Reviews/Review"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Reviews" />
              <Review />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/Chats/Chats"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Chats" />
              <Chats />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/User/AllUser"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="All Users" />
              <AllUser />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/HelpCenter/HelpCenter"
        element={
          user ? (
            <DefaultLayout>
              <PageTitle title="Help Center" />
              <HelpCenter />
            </DefaultLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;