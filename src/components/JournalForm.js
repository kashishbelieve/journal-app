import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore"; // ✅ Import Timestamp here

function JournalForm({ user }) {
  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    try {
      await addDoc(collection(db, "journals"), {
        uid: user.uid,
        date: Timestamp.fromDate(date), // ✅ Save as Firestore Timestamp
        entry,
        createdAt: serverTimestamp(), // Optional for tracking creation time
      });

      setEntry(""); // clear form
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <DatePicker
        selected={date}
        onChange={(newDate) => setDate(newDate)}
        className="border p-2 rounded mb-2"
      />
      <textarea
        placeholder="Write your journal..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Entry
      </button>
    </form>
  );
}

export default JournalForm;


