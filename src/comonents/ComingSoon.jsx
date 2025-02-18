import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 19,
    hours: 3,
    minutes: 35,
    seconds: 31,
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (
          prev.days === 0 &&
          prev.hours === 0 &&
          prev.minutes === 0 &&
          prev.seconds === 0
        ) {
          clearInterval(timer);
          return prev;
        }

        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "subscribers"), { email });
      toast.success("Email added successfully.");
      setEmail("");
    } catch (error) {
      toast.error("Error adding email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#787878] flex flex-col items-center gap-10 justify-center p-12 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-emerald-500">B</span>
        <h1 className="text-xl font-semibold">ENIPP</h1>
      </div>

      <div className="flex flex-col items-center gap-6 mb-4">
        {/* Coming Soon Text */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-[20px]">
          COMING SOON
        </h1>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-10 text-center">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-2 justify-center items-center"
            >
              <span className="text-[56px] bg-[#838383] px-6 py-3 font-bold">
                {String(value).padStart(2, "0")}
              </span>
              <p className="text-[20px] font-bold text-[#C2C3C5] uppercase mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Signup */}
      <div className="flex w-full max-w-2xl mb-6">
        <form className="flex w-full" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 p-3 bg-[#838383] text-[#C2C3C5] border-none focus:ring-0 focus:outline-none"
          />
          <button
            disabled={!email || loading}
            type="submit"
            className="w-[140px] py-3 bg-[#21E786] text-black tf-button flex justify-center items-center font-bold after:!bg-[#5865F2]"
          >
            <div className="z-20">
              {loading ? <Loader2 className=" animate-spin" /> : "SIGNUP"}
            </div>
          </button>
        </form>
      </div>

      {/* Signup Message */}
      {message && <p className="text-white">{message}</p>}

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="bg-[#5865F2] px-6 py-3 text-white font-semibold tf-button flex justify-center items-center after:!bg-[#21E786]">
          <div className="z-20">DISCORD</div>
        </button>
        <button className="bg-[#21E786] px-6 py-3 text-black hover:text-white font-semibold tf-button flex justify-center items-center after:!bg-[#C2C3C5]">
          <div className="z-20">WHITELIST NOW</div>
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4">
        {[
          "twitter",
          "facebook",
          "telegram",
          "youtube",
          "tiktok",
          "discord",
        ].map((icon) => (
          <div key={icon} className="bg-gray-600 p-3 rounded-lg">
            <img src={`/icons/${icon}.svg`} alt={icon} className="w-5 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoonPage;
