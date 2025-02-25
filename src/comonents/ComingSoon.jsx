import React, { useState, useEffect } from "react";
import { collection, addDoc, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const icons = [
  {
    name: "twitter",
    link: "https://www.instagram.com/enippofficial/",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-discord"
        viewBox="0 0 16 16"
      >
        <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
      </svg>
    ),
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/enippofficial/",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-instagram"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    ),
  },
];

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [timeToLive, setTimeToLive] = useState(1742034600);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const targetSeconds = timeToLive || 0;
    const currentSeconds = Math.floor(Date.now() / 1000); // Convert current time to seconds

    // Calculate remaining seconds
    let remainingSeconds = targetSeconds - currentSeconds;

    if (remainingSeconds < 0) {
      console.log("Timer has expired.");
      remainingSeconds = 0; // Ensure no negative values
    }

    // Convert remaining seconds into days, hours, minutes, and seconds
    const days = Math.floor(remainingSeconds / (24 * 3600));
    const hours = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
    });

    fetchTime();
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

  async function fetchTime() {
    try {
      const timerQuery = await getDocs(collection(db, "timer"));
  
      if (!timerQuery.empty) {
        const timerData = timerQuery.docs[0].data();
  
        // Extract `seconds` from Firestore timestamp
        const targetSeconds = timerData.timeToLive?.seconds || 0;
        const currentSeconds = Math.floor(Date.now() / 1000); // Convert current time to seconds
  
        // Calculate remaining seconds
        let remainingSeconds = targetSeconds - currentSeconds;
  
        if (remainingSeconds < 0) {
          console.log("Timer has expired.");
          remainingSeconds = 0; // Ensure no negative values
        }
  
        // Convert remaining seconds into days, hours, minutes, and seconds
        const days = Math.floor(remainingSeconds / (24 * 3600));
        const hours = Math.floor((remainingSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;
  
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
  
      } else {
        console.log("No timer data found.");
      }
    } catch (error) {
      console.error("Error fetching timer data:", error);
    }
  }
  
  

  return (
    <div className="min-h-screen waiting-page w-screen bg-[#000000] flex flex-col items-center gap-10 justify-center relative p-5 text-white md:p-12 overflow-hidden ">
      <div className="absolute page-bg-out h-[90vh] w-[90vh] md:h-[100vh] md:w-[100vh] rounded-full bg-transparent "></div>
      <div className="absolute page-bg-in h-[calc(90vh-5px)] w-[calc(90vh-5px)] md:h-[calc(100vh-5px)] md:w-[calc(100vh-5px)] rounded-full bg-transparent "></div>
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <img className="w-5" src="/enipp-logo.png" alt="" />
        <div className="text-xl font-semibold">ENIPP</div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-4">
        {/* Coming Soon Text */}
        <h1 className="text-4xl font-bold text-uppercase spacing-[20px] md:tracking-[20px] md:text-[56px]">
          COMING SOON
        </h1>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-10 text-center">
          {Object.entries(timeLeft)?.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-2 justify-center items-center"
            >
              <span className="text-3xl md:text-[56px] bg-[#838383] w-[70px] h-[70px] md:w-[108px] md:h-[108px] flex justify-center items-center font-sans font-bold">
                {String(value).padStart(2, "0")}
              </span>
              <p className="text-sm md:text-[20px] font-bold text-[#C2C3C5] uppercase mt-2">
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
            className=" w-2/3 md:flex-1 p-3 bg-[#838383] z-20 text-[#C2C3C5] border-none focus:ring-0 focus:outline-none"
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

      {/* Buttons */}
      <div className="flex gap-6">
        <button className="bg-[#5865F2] px-6 py-3 text-white font-semibold tf-button flex justify-center items-center after:!bg-[#21E786]">
          <div className="z-20">DISCORD</div>
        </button>
        <button className="bg-[#21E786] px-6 py-3 text-black hover:text-white font-semibold tf-button flex justify-center items-center after:!bg-[#C2C3C5]">
          <div className="z-20">BETA ACCESS</div>
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 justify-center items-center">
        {icons.map((icon) => (
          <Link to={icon.link} target="_blank" className="z-20">
            <div
              key={icon}
              className=" p-3 bg-[#838383] flex items-center justify-center cursor-pointer "
            >
              {icon.image}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComingSoonPage;
