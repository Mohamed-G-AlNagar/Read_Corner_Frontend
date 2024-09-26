import { ReactElement } from 'react';
import './App.css'
import { HomePage } from './Layouts/HomePage/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Layouts/login/Login';
import NotFound from './Layouts/NotFound/NotFound';
import Signup from './Layouts/signup/Signup';
import MainLayout from './Layouts/MainLayout/MainLayout';
import { VerifyEmail } from './Layouts/VerifyEmail/VerifyEmail';
import { BookDetailsAndFeedbacks } from './Layouts/BookDetails/BookDetailsAndFeedbacks';
import ProtectedRoutes from './ProtectRoutes/ProtectRoutes';
import Cart from './Layouts/cart/Cart';
import {PaymentSuccess} from './Layouts/Payment/PaymentSuccess';
import { PaymentCanceled } from './Layouts/Payment/PaymentCanceled';
import FilterProductsPage from './Layouts/filter/FilterProductsPage';
import BookManagementPage from './Layouts/BooksManagementPage/BooksManagmentPage';

type RouteObject = {
  path: string;
  element: ReactElement;
  children?: RouteObject[];
};
// prettier-ignore
const routes: RouteObject[] = [
  {path: "",element: <MainLayout />,children: [
      { path: "", element: <HomePage /> },
      { path: "/cart", element: <ProtectedRoutes> <Cart /></ProtectedRoutes> },
      { path: "/booksManagement", element: <ProtectedRoutes> <BookManagementPage /></ProtectedRoutes> },
      { path: "/book/:id", element: <BookDetailsAndFeedbacks /> },
      { path: "/booksFilter", element: <FilterProductsPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/verifyEmail/:token", element: <VerifyEmail /> },
  { path: "/order/success", element: <ProtectedRoutes><PaymentSuccess /></ProtectedRoutes> },
  { path: "/order/cancel", element: <ProtectedRoutes><PaymentCanceled /></ProtectedRoutes> },

];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
