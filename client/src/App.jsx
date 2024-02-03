
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Signin';
import Signin from "./pages/Signin";
import Header from "./Components/Header";
import Signout from "./pages/Signout";

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="About" element={<About/>}/>
        <Route path="Profile" element={<Profile/>}/>
        <Route path="Signin" element={<Signin/>}/>
        <Route path="Signout" element={<Signout/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}
export default App;
