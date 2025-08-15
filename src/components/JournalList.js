import React from "react";

const JournalList = ({ journals }) => {
  if (!journals || journals.length === 0) {
    return <p className="text-gray-500">No journal entries found.</p>;
  }

  // Sort entries by date descending
  const sorted = [...journals].sort((a, b) => b.date - a.date);

  // Fallback images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800&q=80",
    "https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=800&q=80",
  ];

  // Ensure every entry has a valid image URL
  const withImages = sorted.map(entry => {
    const isValidUrl = entry.imageUrl?.startsWith("http");
    return {
      ...entry,
      imageUrl: isValidUrl
        ? entry.imageUrl
        : fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
    };
  });

  const recentEntries = withImages.slice(0, 4);
  const previousEntries = withImages.slice(4, 10);

  return (
    <div className="space-y-8">

      {/* Recent Journal Entries */}
      <section>
        <h2 className="text-xl font-bold mb-3">Recent Journal Entries</h2>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {recentEntries.map(entry => (
            <div
              key={entry.id}
              className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={entry.imageUrl} alt="Journal" className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="text-green-600 font-bold">
                  {entry.date instanceof Date ? entry.date.toLocaleDateString() : ""}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-2">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Previous Entries */}
      <section>
        <h2 className="text-xl font-bold mb-3">Previous Entries</h2>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {previousEntries.map(entry => (
            <span
              key={entry.id}
              className="px-4 py-2 bg-gray-200 rounded-full whitespace-nowrap"
            >
              {entry.date instanceof Date ? entry.date.toLocaleDateString() : ""}
            </span>
          ))}
        </div>
      </section>

      {/* My Entries */}
      <section>
        <h2 className="text-xl font-bold mb-3">My Entries</h2>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {withImages.map(entry => (
            <div
              key={entry.id}
              className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={entry.imageUrl} alt="Journal" className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="text-green-600 font-bold">
                  {entry.date instanceof Date ? entry.date.toLocaleDateString() : ""}
                </p>
                <p className="mt-2 text-gray-700">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default JournalList;






