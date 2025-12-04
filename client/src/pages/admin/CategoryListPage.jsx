import React, { useEffect, useState } from "react";
import axios from "axios";

const STAFF_PER_PAGE = 10;

export default function StaffListPage() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Danh sách Staff</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Staff
        </button>
      </div>

      {filteredStaff.length === 0 ? (
        <p className="mt-5">Danh sach san pham</p>
      ) : (
        <>
          <table className="min-w-full border-collapse mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Tên San Pham</th>
                <th className="border px-4 py-2 text-left">Anh</th>
                <th className="border px-4 py-2 text-left">So Luong</th>
                <th className="border px-4 py-2 text-left">Loai San Pham</th>
              </tr>
            </thead>
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
