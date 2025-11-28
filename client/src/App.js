import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/user/HomePage";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import AdminLayout from "./layouts/AdminLayout";
import UserListPage from "./pages/admin/UserListPage"; 

function LayoutWrapper() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar/>}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="users" element={<UserListPage />} />
            </Route>
          </Routes>
        </main>
         {!isAdminRoute && <Footer/>}
     
    </div>
  );
}

function App(){
  return(
    <Router>
      <LayoutWrapper/>
    </Router>
  )
}

export default App;
