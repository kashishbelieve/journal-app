import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import JournalForm from "./JournalForm";
import JournalList from "./JournalList";
import { collection, query, orderBy, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = ({ user, onLogout }) => {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  // Fetch journals for the user
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "journals"),
      where("uid", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          text: d.entry,
          date: d.date?.toDate ? d.date.toDate() : new Date(d.date),
          imageUrl: d.imageUrl || "",
        };
      });
      setJournals(data);
      setFilteredJournals(data);
    });

    return unsubscribe;
  }, [user]);

  // Filter journals by searchDate
  useEffect(() => {
    if (!searchDate) {
      setFilteredJournals(journals);
      return;
    }
    const filtered = journals.filter((entry) =>
      entry.date.toLocaleDateString().includes(searchDate)
    );
    setFilteredJournals(filtered);
  }, [searchDate, journals]);

  return (
    <div className="flex min-h-screen">
      {/* Pass onLogout prop here */}
      <Sidebar onSelect={(menu) => setSelectedMenu(menu)} onLogout={onLogout} />
      
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName}</h1>

        {/* Show search bar only when Pick is selected */}
        {selectedMenu === "Pick" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by date (e.g., 8/15/2025)"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
        )}

        {/* Show journal form only when Dashboard or Write is selected */}
        {(selectedMenu === "Dashboard" || selectedMenu === "Write") && (
          <JournalForm user={user} />
        )}

        {/* Always show filtered journal list */}
        <JournalList journals={filteredJournals} />
      </main>
    </div>
  );
};

export default Dashboard;


