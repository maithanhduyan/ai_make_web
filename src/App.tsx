import React, { useState, useEffect } from "react";

interface Card {
  id: number;
  title: string;
  description: string;
}

const cardsData: Card[] = [
  { id: 1, title: "Card One", description: "This is the first card." },
  { id: 2, title: "Card Two", description: "This is the second card." },
  { id: 3, title: "Card Three", description: "This is the third card." },
  { id: 4, title: "Card Four", description: "This is the fourth card." },
];

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Áp dụng class dark lên document nếu darkMode = true
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="py-6 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            My React + Tailwind + TS App
          </h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-10">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Đây là ví dụ một danh sách các card thể hiện layout responsive.
        </p>

        {/* Grid cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {card.description}
              </p>
              <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded">
                Action
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          © 2025 Your Company
        </div>
      </footer>
    </div>
  );
};

export default App;
