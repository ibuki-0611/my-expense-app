import React, { useMemo, useState } from "react";

const ExpenseList = ({ expenses }) => {
  const [filters, setFilters] = useState({
    date: "",
    minAmount: "",
    maxAmount: "",
    storeName: "",
    category: "",
  });

  const [selectedReceipt, setSelectedReceipt] = useState(null); // モーダル表示用の選択画像

  // カテゴリと店名のユニークリストを作成
  const uniqueCategories = useMemo(() => {
    const categories = expenses.map((expense) => expense.category);
    return [...new Set(categories)];
  }, [expenses]);

  const uniqueStoreNames = useMemo(() => {
    const storeNames = expenses.map((expense) => expense.storeName);
    return [...new Set(storeNames)];
  }, [expenses]);

  // フィルタリングされたデータ
  const filteredData = useMemo(() => {
    return expenses.filter((expense) => {
      const amount = parseFloat(expense.amount);
      const minAmount = filters.minAmount ? parseFloat(filters.minAmount) : null;
      const maxAmount = filters.maxAmount ? parseFloat(filters.maxAmount) : null;

      return (
        (!filters.date || expense.date.includes(filters.date)) &&
        (minAmount === null || amount >= minAmount) &&
        (maxAmount === null || amount <= maxAmount) &&
        (!filters.storeName || expense.storeName === filters.storeName) &&
        (!filters.category || expense.category === filters.category)
      );
    });
  }, [expenses, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const closeModal = () => {
    setSelectedReceipt(null); // モーダルを閉じる
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">支出一覧</h2>

      {/* フィルターフォーム */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          placeholder="日付で絞り込み"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="minAmount"
          value={filters.minAmount}
          onChange={handleFilterChange}
          placeholder="金額（以上）"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="maxAmount"
          value={filters.maxAmount}
          onChange={handleFilterChange}
          placeholder="金額（以下）"
          className="p-2 border rounded"
        />
        <select
          name="storeName"
          value={filters.storeName}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">全ての店名</option>
          {uniqueStoreNames.map((storeName, index) => (
            <option key={index} value={storeName}>
              {storeName}
            </option>
          ))}
        </select>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">全てのカテゴリー</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* テーブル */}
      <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">日付</th>
            <th className="px-4 py-2">金額</th>
            <th className="px-4 py-2">店名</th>
            <th className="px-4 py-2">カテゴリー</th>
            <th className="px-4 py-2">レシート</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((expense, index) => (
            <tr key={index} className="hover:bg-blue-100 border-b">
              <td className="px-4 py-2">{expense.date}</td>
              <td className="px-4 py-2">{expense.amount}円</td>
              <td className="px-4 py-2">{expense.storeName}</td>
              <td className="px-4 py-2">{expense.category}</td>
              <td className="px-4 py-2">
                {expense.receipt ? (
                  <button
                    onClick={() => setSelectedReceipt(expense.receipt)}
                    className="text-blue-500 underline"
                  >
                    レシートを見る
                  </button>
                ) : (
                  "なし"
                )}
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="px-4 py-2 text-center text-gray-500"
              >
                該当する支出が見つかりません。
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* モーダル */}
      {selectedReceipt && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // モーダル内クリックで閉じない
          >
            <img
              src={selectedReceipt}
              alt="Receipt"
              className="w-full max-w-md h-auto rounded"
            />
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
