import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Header from "./component/Header";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./component/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/search' element={<Search/>}/>
          <Route path='/listing/:listingId' element={<Listing/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
          </Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
