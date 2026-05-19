import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const MAX_QUEUE = 8;

  // ENQUEUE
  const enqueue = () => {
    if (input.trim() === "") {
      toast.error("Input cannot be empty");
      return;
    }

    if (queue.length >= MAX_QUEUE) {
      toast.error("Queue is full");
      return;
    }

    setQueue((prev) => [...prev, input]);

    setHistory((prev) => [
      `Enqueue: ${input}`,
      ...prev,
    ]);

    toast.success(`${input} added`);

    setInput("");
  };

  // DEQUEUE
  const dequeue = () => {
    if (queue.length === 0) {
      toast.error("Queue is empty");
      return;
    }

    const removed = queue[0];

    const newQueue = [...queue];
    newQueue.shift();

    setQueue(newQueue);

    setHistory((prev) => [
      `Dequeue: ${removed}`,
      ...prev,
    ]);

    toast(`${removed} removed`);
  };

  // CLEAR QUEUE
  const clearQueue = () => {
    setQueue([]);

    setHistory((prev) => [
      "Queue cleared",
      ...prev,
    ]);

    toast.success("Queue cleared");
  };

  // RANDOM QUEUE
  const generateRandom = () => {
    if (queue.length >= MAX_QUEUE) {
      toast.error("Queue is full");
      return;
    }

    const randomItem =
      "Q-" + Math.floor(Math.random() * 1000);

    setQueue((prev) => [...prev, randomItem]);

    setHistory((prev) => [
      `Auto Enqueue: ${randomItem}`,
      ...prev,
    ]);

    toast.success(`${randomItem} generated`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      {/* TOASTER */}
      <Toaster position="top-right" />

      {/* NAVBAR */}
      <div className="border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-black">
              Queue Visualizer
            </h1>

            <p className="text-slate-400 text-sm">
              React + Tailwind + Framer Motion
            </p>
          </div>

          <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm">
            Max Capacity: {MAX_QUEUE}
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-8">

        {/* HERO */}
        <div className="text-center mb-14">

          <h1 className="text-6xl font-black mb-4">
            Queue Data Structure
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Interactive visualization of FIFO
            (First In First Out) queue operations
            using React and modern frontend animation.
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* CONTROL PANEL */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl mb-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Control Panel
                </h2>

                <div className="text-slate-400 text-sm">
                  Current Size: {queue.length}
                </div>

              </div>

              {/* INPUT */}
              <div className="flex flex-col lg:flex-row gap-4">

                <input
                  type="text"
                  placeholder="Enter queue data..."
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      enqueue();
                    }
                  }}
                  className="flex-1 px-5 py-4 rounded-2xl bg-slate-900/70 border border-slate-700 outline-none focus:border-sky-500 transition"
                />

                <button
                  onClick={enqueue}
                  className="bg-green-500 hover:bg-green-600 hover:scale-105 transition px-6 py-4 rounded-2xl font-bold"
                >
                  Enqueue
                </button>

                <button
                  onClick={dequeue}
                  disabled={queue.length === 0}
                  className="bg-red-500 disabled:bg-red-900/40 hover:bg-red-600 hover:scale-105 transition px-6 py-4 rounded-2xl font-bold"
                >
                  Dequeue
                </button>

              </div>

              {/* EXTRA BUTTONS */}
              <div className="flex gap-4 mt-5">

                <button
                  onClick={generateRandom}
                  className="bg-sky-500 hover:bg-sky-600 hover:scale-105 transition px-5 py-3 rounded-2xl font-bold"
                >
                  Random Queue
                </button>

                <button
                  onClick={clearQueue}
                  className="bg-slate-700 hover:bg-slate-600 hover:scale-105 transition px-5 py-3 rounded-2xl font-bold"
                >
                  Clear Queue
                </button>

              </div>

            </div>

            {/* VISUALIZER */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl min-h-[320px]">

              <div className="flex justify-between items-center mb-10">

                <h2 className="text-2xl font-bold">
                  Queue Visualization
                </h2>

                <div className="bg-slate-800 px-4 py-2 rounded-xl">
                  FIFO Structure
                </div>

              </div>

              {/* EMPTY */}
              {queue.length === 0 && (
                <div className="h-[180px] flex items-center justify-center text-slate-500 text-2xl">
                  Queue is Empty
                </div>
              )}

              {/* QUEUE */}
              <div className="flex flex-wrap items-center gap-4">

                {queue.length > 0 && (
                  <div className="text-green-400 font-black text-xl">
                    FRONT
                  </div>
                )}

                <AnimatePresence>

                  {queue.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: -40,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 40,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      whileHover={{
                        scale: 1.08,
                      }}
                      className="bg-sky-500 px-8 py-5 rounded-2xl font-black text-2xl shadow-xl"
                    >
                      {item}
                    </motion.div>
                  ))}

                </AnimatePresence>

                {queue.length > 0 && (
                  <div className="text-yellow-400 font-black text-xl">
                    REAR
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* COMPLEXITY */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl">

              <h2 className="text-2xl font-bold mb-6">
                Time Complexity
              </h2>

              <div className="space-y-4">

                <div className="bg-slate-900/70 rounded-2xl p-4">
                  <p className="text-slate-400">
                    Enqueue
                  </p>

                  <h3 className="text-3xl font-black text-green-400">
                    O(1)
                  </h3>
                </div>

                <div className="bg-slate-900/70 rounded-2xl p-4">
                  <p className="text-slate-400">
                    Dequeue
                  </p>

                  <h3 className="text-3xl font-black text-red-400">
                    O(1)
                  </h3>
                </div>

              </div>

            </div>

            {/* HISTORY */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl">

              <h2 className="text-2xl font-bold mb-6">
                Activity Log
              </h2>

              <div className="space-y-3 max-h-[350px] overflow-auto">

                {history.length === 0 && (
                  <p className="text-slate-500">
                    No activity yet...
                  </p>
                )}

                {history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-900/70 p-4 rounded-2xl text-sm"
                  >
                    {item}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-12 py-6 text-center text-slate-500">
        Built by Muhamad Abdillah • Queue Visualizer 2026
      </footer>

    </div>
  );
}