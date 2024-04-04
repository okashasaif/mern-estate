import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/home.jsx';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from "./pages/Signin";
import UserUser from "./pages/list/List.jsx"
import Signup from "./pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Complains from "./pages/Complains/Complains.jsx";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
const App = () => {
  const {darkMode}=useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
      <Routes>
        <Route element = {<PrivateRoute/>}>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/alluser" element={<UserUser/>}/>
          <Route path="/Complains" element={<Complains/>}/>

        </Route>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
