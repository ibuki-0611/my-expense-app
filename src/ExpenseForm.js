import React, { useState, useMemo } from "react";

const ExpenseForm = ({ addExpense, expenses }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    storeName: "",
    category: "",
    receipt: null,
  });

  // カテゴリと店名のユニークリストを作成
  const uniqueCategories = useMemo(() => {
    const categories = expenses.map((expense) => expense.category);
    return [...new Set(categories)];
  }, [expenses]);

  const uniqueStoreNames = useMemo(() => {
    const storeNames = expenses.map((expense) => expense.storeName);
    return [...new Set(storeNames)];
  }, [expenses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, receipt: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      storeName: "",
      category: "",
      receipt: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block font-bold mb-1">日付:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">金額:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="金額を入力"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">店名:</label>
        <input
          list="storeNames"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="店名を入力または選択"
          className="w-full p-2 border rounded"
        />
        <datalist id="storeNames">
          {uniqueStoreNames.map((storeName, index) => (
            <option key={index} value={storeName} />
          ))}
        </datalist>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">カテゴリー:</label>
        <input
          list="categories"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="カテゴリーを入力または選択"
          className="w-full p-2 border rounded"
        />
        <datalist id="categories">
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category} />
          ))}
        </datalist>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">レシート画像をアップロード:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        {formData.receipt && (
          <div className="mt-4">
            <p className="font-bold mb-2">プレビュー:</p>
            <img
              src={formData.receipt}
              alt="Receipt Preview"
              className="w-64 h-auto rounded border"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        記録する
      </button>
    </form>
  );
};

export default ExpenseForm;
