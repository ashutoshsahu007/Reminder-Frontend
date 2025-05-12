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
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Create Reminder</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleChange} required />
        <br />
        <input type="time" name="time" onChange={handleChange} required />
        <br />
        <textarea
          name="message"
          placeholder="Reminder message"
          onChange={handleChange}
          required
        />
        <br />
        <select name="method" onChange={handleChange}>
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
        </select>
        <br />
        <button type="submit">Set Reminder</button>
      </form>
    </div>
  );
}

export default App;
