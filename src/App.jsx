import React, { useState } from "react";
import axios from "axios";
import Bubbles from "./Bubble";
import Toast from "./Toast";
import "./App.css";

function App() {
  const [reminder, setReminder] = useState({
    date: "",
    time: "",
    message: "",
    method: "SMS",
  });

  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/reminders",
        reminder
      );
      showToast("Reminder saved!", "success");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      showToast("Error saving reminder", "error");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a2e]">
      <Bubbles />

      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <div className="relative z-10 bg-white/90 dark:bg-gray-800/80 shadow-2xl rounded-2xl p-8 max-w-md w-full backdrop-blur-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Reminder
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Reminder message"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Method
            </label>
            <select
              name="method"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer py-2 mt-2 bg-purple-600 hover:bg-purple-700 active:scale-95 transition duration-300 text-white font-semibold rounded-lg"
          >
            Set Reminder
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
