import React from 'react';
import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Other/Login';
import Signup from './Components/Other/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Components/Other/About';
import Bookdetail from './Components/Other/Bookdetail';
import Categorydetails from './Components/Other/Categorydetails';
import Authordetails from "./Components/Other/Authordetails";
import Admin from "./Components/Home/Admin";
import Addcategory from './Components/Other/Addcategory';
import Updatecategory from './Components/Other/Updatecategory';
import Deletecategory from './Components/Other/Deletecategory';
import Addbooks from './Components/Other/Addbooks';
import Deletebooks from './Components/Other/Deletebooks';
import AddAuthor from './Components/Other/AddAuthor';
import UpdateAuthor from './Components/Other/UpdateAuthor';
import DeleteAuthor from "./Components/Other/DeleteAuthor"
import Updatebooks from "./Components/Other/Updatebooks"
import Userdetails from "./Components/Other/UserDetails"
import Deleteuser from "./Components/Other/DeleteUser"
import Adduser from "./Components/Other/AddUser"
import { UserProvider } from './Components/Other/UserContext'; // Ensure this path is correct
import UserLog from './Components/Home/UserLog';
import ProtectedAdmin from './Components/Other/ProtectedAdmin';
import ProtectedUser from './Components/Other/ProtectedUser';
import Logout from './Components/Other/Logout';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<ProtectedAdmin Component={Admin}/>} />
          <Route path="/bookdetail" element={<ProtectedUser Component={Bookdetail}/>} />
          <Route path="/logout" element={<ProtectedUser Component={Logout}/>} />
          <Route path="/categorydetails" element={<ProtectedUser Component={Categorydetails}/>} />
          <Route path="/authordetails" element={<ProtectedUser Component={Authordetails}/>} />
          <Route path="/addcategory" element={<ProtectedAdmin Component={Addcategory}/>} />
          <Route path="/updatecategory" element={<ProtectedAdmin Component={Updatecategory}/>} />
          <Route path="/deletecategory" element={<ProtectedAdmin Component={Deletecategory}/>} />
          <Route path="/addbooks" element={<ProtectedAdmin Component={Addbooks}/>} />
          <Route path="/addauthor" element={<ProtectedAdmin Component={AddAuthor}/>} />
          <Route path="/updateauthor" element={<ProtectedAdmin Component={UpdateAuthor}/>} />
          <Route path="/deleteauthor" element={<ProtectedAdmin Component={DeleteAuthor}/>} />
          <Route path="/deletebooks" element={<ProtectedAdmin Component={Deletebooks}/>} />
          <Route path="/updatebooks" element={<ProtectedAdmin Component={Updatebooks}/>} />
          <Route path="/userdetails" element={<ProtectedAdmin Component={Userdetails}/>} />
          <Route path="/adduser" element={<ProtectedAdmin Component={Adduser}/>} />
          <Route path="/deleteuser" element={<ProtectedAdmin Component={Deleteuser}/>} />
          <Route path="/user" element={<ProtectedUser Component={UserLog}/>} />


        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
