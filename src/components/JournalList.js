import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JournalList = () => {
  const [entries, setEntries] = useState([]);
  const [searchDate, setSearchDate] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "journals"), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          date: d.date?.toDate ? d.date.toDate() : new Date(d.date), // ✅ Convert to JS Date
        };
      });
      console.log("Fetched entries:", data);
      setEntries(data);
    });

    return unsubscribe;
  }, []);

  // ✅ Filter entries if searchDate is selected
  const filteredEntries = searchDate
    ? entries.filter(
        (entry) =>
          entry.date.getFullYear() === searchDate.getFullYear() &&
          entry.date.getMonth() === searchDate.getMonth() &&
          entry.date.getDate() === searchDate.getDate()
      )
    : entries;

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center mb-4 bg-green-50 p-3 rounded-lg shadow-md border border-green-200">
        <span className="mr-2 text-green-600">🔍</span>
        <DatePicker
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          placeholderText="Search journals by date..."
          className="border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none p-2 rounded w-full"
        />
        {searchDate && (
          <button
            onClick={() => setSearchDate(null)}
            className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Journal Entries */}
      {filteredEntries.length === 0 ? (
        <p className="text-gray-500 text-center">No journal entries found.</p>
      ) : (
        filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition"
          >
            <div className="text-green-600 font-bold">
              {entry.date.toLocaleDateString()}
            </div>
            <p className="mt-2 text-gray-700">{entry.entry}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JournalList;



