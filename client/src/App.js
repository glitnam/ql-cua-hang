import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from "./pages/HomePage";
import Login from './features/Auth/Login';
import Register from './features/Auth/Register';
import AdminLayout from "./layouts/AdminLayout.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Chỉ định route cho AdminLayout */}
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
