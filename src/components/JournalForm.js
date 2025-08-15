import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";

function JournalForm({ user }) {
  const [date, setDate] = useState(new Date());
  const [entry, setEntry] = useState("");

  // Array of Unsplash image URLs
  const imageUrls = [
    "https://source.unsplash.com/400x300/?nature",
    "https://source.unsplash.com/400x300/?travel",
    "https://source.unsplash.com/400x300/?mountain",
    "https://source.unsplash.com/400x300/?beach",
    "https://source.unsplash.com/400x300/?forest",
    "https://source.unsplash.com/400x300/?city",
    "https://source.unsplash.com/400x300/?journal" // fallback
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    try {
      await addDoc(collection(db, "journals"), {
        uid: user.uid,
        date: Timestamp.fromDate(date),
        entry,
        imageUrl: randomImage, // always a valid URL
        createdAt: serverTimestamp(),
      });

      setEntry("");
      setDate(new Date());
      console.log("Saved journal with image:", randomImage);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold mb-3">Add New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full"
        />
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your journal..."
          className="border border-gray-300 rounded-lg p-3 w-full mb-3"
          rows="3"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}

export default JournalForm;




