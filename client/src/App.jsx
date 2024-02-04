
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from "./pages/Signin";
import Header from "./Components/Header";
import Signup from "./pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route element = {<PrivateRoute/>}>
          <Route path="/Profile" element={<Profile/>}/>
          </Route>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}
export default App;
