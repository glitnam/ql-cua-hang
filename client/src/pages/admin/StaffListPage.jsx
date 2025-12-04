import React, { useEffect, useState } from "react";
import axios from "axios";

const STAFF_PER_PAGE = 10;

export default function StaffListPage() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/v1/user", {
        headers: { token: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      setStaffs(res.data.users || res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách staff");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return dateStr.split("T")[0];
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  // Lọc danh sách STAFF
  const filteredStaff = staffs.filter((user) => user.role === "staff");

  const totalPages = Math.ceil(filteredStaff.length / STAFF_PER_PAGE);
  const indexOfLastStaff = currentPage * STAFF_PER_PAGE;
  const indexOfFirstStaff = indexOfLastStaff - STAFF_PER_PAGE;
  const currentStaffs = filteredStaff.slice(
    indexOfFirstStaff,
    indexOfLastStaff
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Danh sách Staff</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Staff
        </button>
      </div>

      {filteredStaff.length === 0 ? (
        <p className="mt-5">Chưa có staff nào</p>
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
                <th className="border px-4 py-2 text-left">chuc vu</th>
                <th className="border px-4 py-2 text-left">Tác vụ</th>
              </tr>
            </thead>

            <tbody>
              {currentStaffs.map((staff) => (
                <tr key={staff._id} className="border-b hover:bg-gray-50">
                  <td className="border px-4 py-2">{staff._id}</td>
                  <td className="border px-4 py-2">{staff.username}</td>
                  <td className="border px-4 py-2">{staff.email}</td>
                  <td className="border px-4 py-2">{staff.phone}</td>
                  <td className="border px-4 py-2">
                    {formatDate(staff.birthday)}
                  </td>
                  <td className="border px-4 py-2">{staff.address}</td>
                  <td className="border px-4 py-2">
                    {staff.role === "staff" ? "Nhân viên" : staff.role}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Sửa
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </>
      )}
    </div>
  );
}
