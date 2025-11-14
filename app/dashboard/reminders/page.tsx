"use client";

import { useState } from "react";
import { Plus, Bell, Clock, CheckCircle, XCircle } from "lucide-react";

export default function RemindersPage() {
  // Dummy data (later replace with Firebase)
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Morning Medicine",
      time: "9:00 AM",
      status: "upcoming",
      enabled: true,
    },
    {
      id: 2,
      title: "Blood Pressure Check",
      time: "12:30 PM",
      status: "upcoming",
      enabled: false,
    },
    {
      id: 3,
      title: "Vitamin B12",
      time: "8:00 PM",
      status: "missed",
      enabled: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const addReminder = () => {
    if (!newTitle || !newTime) return;

    const newReminder = {
      id: Date.now(),
      title: newTitle,
      time: newTime,
      status: "upcoming",
      enabled: true,
    };

    setReminders((prev) => [...prev, newReminder]);
    setShowModal(false);
    setNewTitle("");
    setNewTime("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Bell className="text-purple-600" />
          Reminders
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          <Plus size={18} /> Add Reminder
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {/* Upcoming */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Upcoming</h2>
          <div className="space-y-3">
            {reminders
              .filter((r) => r.status === "upcoming")
              .map((r) => (
                <ReminderCard key={r.id} reminder={r} toggle={toggleReminder} />
              ))}
          </div>
        </section>

        {/* Missed */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Missed</h2>
          <div className="space-y-3">
            {reminders
              .filter((r) => r.status === "missed")
              .map((r) => (
                <ReminderCard key={r.id} reminder={r} toggle={toggleReminder} />
              ))}
          </div>
        </section>
      </div>

      {/* Add Reminder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Add Reminder</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Title</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-md p-2 mt-1"
                  placeholder="e.g. Evening Medicine"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full border rounded-md p-2 mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={addReminder}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Component: Reminder Card ----------
function ReminderCard({ reminder, toggle }: any) {
  return (
    <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold flex items-center gap-2">
          {reminder.status === "missed" ? (
            <XCircle className="text-red-500" size={18} />
          ) : (
            <Clock className="text-purple-600" size={18} />
          )}
          {reminder.title}
        </h3>
        <p className="text-gray-500 text-sm">{reminder.time}</p>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={reminder.enabled}
          onChange={() => toggle(reminder.id)}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition ${
            reminder.enabled ? "bg-purple-600" : "bg-gray-300"
          }`}
        />
      </label>
    </div>
  );
}
