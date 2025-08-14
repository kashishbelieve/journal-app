import React, { useState } from "react";
import Auth from "./components/Auth";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Auth user={user} setUser={setUser} />
      {user && (
  <div className="max-w-4xl mx-auto p-4">
    <JournalForm user={user} />
    <JournalList user={user} /> {/* <-- this must be here */}
  </div>
)}
    </div>
  );
}

export default App;


