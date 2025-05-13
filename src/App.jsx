import React, { useState } from "react";
import axios from "axios";

function App() {
  const [reminder, setReminder] = useState({
    date: "",
    time: "",
    message: "",
    method: "SMS",
  });

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
      alert("Reminder saved!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error saving reminder");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        Create Reminder
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="time"
          name="time"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <textarea
          name="message"
          placeholder="Reminder message"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          name="method"
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
        </select>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Set Reminder
        </button>
      </form>
    </div>
  );
}

export default App;
