import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <nav>
        {/* Navbar riêng cho admin */}
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
      </nav>
      <main>
        <Outlet />
        <h1>chao mung chu nhan</h1>
      </main>
    </div>
  );
}

export default AdminLayout;
