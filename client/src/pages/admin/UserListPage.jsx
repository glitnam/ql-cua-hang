import React, { useEffect, useState } from "react";
import {
  getListUser,
  updateUser,
  deleteUser,
  register,
} from "../../features/Auth/authService";

const USERS_PER_PAGE = 10;

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    address: "",
  });

  // Lấy danh sách user
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await getListUser(token);
      setUsers(res.data.users || res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "-");

  const filteredUser = users.filter((user) => user.role === "user");
  const totalPages = Math.ceil(filteredUser.length / USERS_PER_PAGE);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUser.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Tạo user mới
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await register(newUser, token);
      alert("Tạo user thành công!");
      setShowCreateForm(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        address: "",
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Tạo user thất bại!");
    }
  };

  // Sửa user
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await updateUser(token, editingUser._id, editingUser);
      alert("Cập nhật thành công!");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  // Xóa user
  const handleDelete = async (userId) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await deleteUser(userId, token);
      alert("Xóa thành công");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Xóa không thành công");
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Danh sách Users</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setShowCreateForm(true)}
        >
          Create User
        </button>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <p className="mt-5 text-center">Chưa có user nào</p>
      ) : (
        <>
          <table className="min-w-full border-collapse mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Tên</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Birthday</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Chức vụ</th>
                <th className="border px-4 py-2 text-left">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">
                    {formatDate(user.birthday)}
                  </td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2">
                    {user.role === "user" ? "Người dùng" : user.role}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {!editingUser && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Form sửa user */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white w-[450px] p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Sửa User</h2>

            <label className="block text-sm font-medium">Tên</label>
            <input
              type="text"
              className="border w-full p-2 rounded mb-3"
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser({ ...editingUser, username: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="border w-full p-2 rounded mb-3"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              className="border w-full p-2 rounded mb-3"
              value={editingUser.phone}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="border w-full p-2 rounded mb-3"
              value={editingUser.address}
              onChange={(e) =>
                setEditingUser({ ...editingUser, address: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Form tạo user */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleCreateUser}
            className="bg-white w-[450px] p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Tạo User Mới</h2>

            <label className="block text-sm font-medium">Tên</label>
            <input
              type="text"
              className="border w-full p-2 rounded mb-3"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="border w-full p-2 rounded mb-3"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="border w-full p-2 rounded mb-3"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              className="border w-full p-2 rounded mb-3"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Birthday</label>
            <input
              type="date"
              className="border w-full p-2 rounded mb-3"
              value={newUser.birthday}
              onChange={(e) =>
                setNewUser({ ...newUser, birthday: e.target.value })
              }
            />

            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="border w-full p-2 rounded mb-3"
              value={newUser.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Tạo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
