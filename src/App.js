import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  // テストデータ
  useEffect(() => {
    const testData = [
      {
        date: "2025-01-01",
        amount: "1000",
        storeName: "コンビニ",
        category: "食料品",
        receipt: null, // レシート画像がない場合
      },
      {
        date: "2025-01-02",
        amount: "2000",
        storeName: "ドラッグストア",
        category: "日用品",
        receipt: "https://via.placeholder.com/150", // テスト用画像URL
      },
      {
        date: "2025-01-03",
        amount: "3000",
        storeName: "スーパー",
        category: "食料品",
        receipt: "https://via.placeholder.com/150", // テスト用画像URL
      },
    ];
    setExpenses(testData);
  }, []);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <Router>
      <div className="App">
        <nav className="bg-blue-500 text-white p-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                支出を記録する
              </Link>
            </li>
            <li>
              <Link to="/list" className="hover:underline">
                支出一覧
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* expenses を ExpenseForm に渡す */}
          <Route
            path="/"
            element={<ExpenseForm addExpense={addExpense} expenses={expenses} />}
          />
          <Route path="/list" element={<ExpenseList expenses={expenses} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
