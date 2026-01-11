import React, { useState } from 'react';
const TARGET_HASH = "c9bee18b01925e90f508455cca807a0fb5c6effcdfa79459fedf801761b50d06"; 

// 🐼 PANDA COMPONENT (Internal)
const PandaAvatar = ({ isFocused, isError, isSuccess }) => {
  return (
    <div className="relative w-32 h-28 mx-auto -mb-8 z-20">
      <svg viewBox="0 0 120 100" className={`w-full h-full transition-transform duration-300 ${isError ? 'animate-head-shake' : ''}`}>
        <circle cx="20" cy="25" r="15" fill="#333" />
        <circle cx="100" cy="25" r="15" fill="#333" />
        <ellipse cx="60" cy="55" rx="50" ry="45" fill="white" stroke="#333" strokeWidth="2"/>
        <g className="transition-all duration-300">
          <ellipse cx="35" cy="50" rx="12" ry="14" fill="#333" transform="rotate(15, 35, 50)" />
          <ellipse cx="85" cy="50" rx="12" ry="14" fill="#333" transform="rotate(-15, 85, 50)" />
          <circle cx="38" cy="52" r="3" fill="white" />
          <circle cx="82" cy="52" r="3" fill="white" />
        </g>
        <ellipse cx="60" cy="65" rx="5" ry="3" fill="#333" />
        {isSuccess ? (
          <path d="M 45 75 Q 60 85 75 75" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        ) : isError ? (
          <path d="M 45 80 Q 60 70 75 80" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M 55 75 Q 60 78 65 75" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
      <div className={`absolute top-[40%] left-[10%] w-10 h-10 bg-[#333] rounded-full transition-all duration-300 ease-out ${isFocused ? 'translate-y-[-25px] translate-x-[15px]' : 'translate-y-[20px]'}`}></div>
      <div className={`absolute top-[40%] right-[10%] w-10 h-10 bg-[#333] rounded-full transition-all duration-300 ease-out ${isFocused ? 'translate-y-[-25px] translate-x-[-15px]' : 'translate-y-[20px]'}`}></div>
    </div>
  );
};

export default function PasswordHome({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // 🔐 HASHING UTILITY
  // This converts text into a secure SHA-256 string
  const hashString = async (string) => {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Calculate Hash of what the user typed
    const inputHash = await hashString(password.toLowerCase().trim());


    // 2. Compare the calculated hash with the stored hash
    if (inputHash === TARGET_HASH) {
      setSuccess(true);
      setError(false);
      setIsInputFocused(false);
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setError(true);
      setShake(true);
      setSuccess(false);
      setIsInputFocused(false);
      setPassword('');
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 1000); 
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-sans selection:bg-pink-500 selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_7s_infinite]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_7s_infinite_2s]"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[blob_7s_infinite_4s]"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className={`relative z-10 p-1 transition-transform duration-100 ${shake ? 'translate-x-[-5px]' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-r rounded-3xl blur opacity-75 animate-pulse transition-colors duration-500 ${error ? 'from-red-600 via-orange-500 to-red-600' : 'from-pink-500 via-purple-500 to-indigo-500'}`}></div>
        <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-xl w-full shadow-2xl pt-12">
          
          <div className="absolute -top-20 left-0 right-0 flex justify-center">
            <PandaAvatar isFocused={isInputFocused} isError={error} isSuccess={success} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-2 drop-shadow-sm tracking-tight mt-4">
            Protected Access
          </h1>

          <p className="text-gray-400 text-sm md:text-base mb-8 font-light">
            Enter the secret key to unlock the experience.
          </p>

          <form onSubmit={handleSubmit} className={`flex flex-col gap-6 ${shake ? 'animate-shake' : ''}`}>
            <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                  }}
                  placeholder="Password..."
                  className={`w-full bg-white/5 text-white text-center text-xl px-6 py-4 rounded-xl outline-none border-2 transition-all duration-300 placeholder-gray-600 focus:bg-black/50 pr-12 ${
                      error 
                      ? 'border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                      : 'border-white/10 focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
            </div>

            <button 
                type="submit"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent font-mono rounded-xl focus:outline-none w-full"
            >
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl transition-all duration-300 blur-md opacity-70 group-hover:opacity-100 group-hover:scale-105 ${isHovering ? 'animate-pulse' : ''}`}></div>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl"></div>
                <span className="relative flex items-center justify-center gap-3">UNLOCK NOW</span>
            </button>
          </form>

        </div>
      </div>
      <style>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
        @keyframes headShake { 0% { transform: translateX(0) rotate(0); } 25% { transform: translateX(-5px) rotate(-5deg); } 75% { transform: translateX(5px) rotate(5deg); } 100% { transform: translateX(0) rotate(0); } }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-head-shake { animation: headShake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}