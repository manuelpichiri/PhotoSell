import "./App.css";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/homePage/Homepage";
import SearchingPage from "./components/searchingPage/SearchingPage";
import PhotoCard from "./components/photoCard/PhotoCard";
import UserPage from "./components/userPage/UserPage";
import ResetPassword from "./components/resetPassword/ResetPassword";
import RecoverPassword from "./components/recoverPassword/RecoverPassword";
import AdminPage from "./components/adminPage/AdminPage";
import Payment from "./components/payment/Payment";
import SucessPaymentPage from "./components/sucessPaymentPage/SucessPaymentPage";
import OrderPage from "./components/orderPage/orderPage";
import { Toaster } from "react-hot-toast";
import AboutUsPage from "./components/aboutUsPage/AboutUsPage";
import InfoPage from "./components/infoPage/InfoPage";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="app-layout">
        <Routes>
          <Route index path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/info" element={<InfoPage />}></Route>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="/card" element={<PhotoCard />}></Route>
          <Route path="/paymentSucess" element={<SucessPaymentPage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/checkout" element={<Payment />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/search" element={<SearchingPage />}></Route>
          <Route path="/userPage" element={<UserPage />}></Route>
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
