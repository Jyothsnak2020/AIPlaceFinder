import React, { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input1";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SparklesPreview } from "./SparklesPreview";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import LoadingSpinner from "./common/Spinner";

export function SignupFormDemo() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({ email: "", username: "" });
  const [otp, setOtp] = useState(['', '', '', '']); // Updated to 4 digits
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and signup
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { email: "", username: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      hasErrors = true;
    }

    if (!username) {
      newErrors.username = "Username is required.";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await axios.post('https://ai-place-finder-backend.onrender.com/send-otp', { email });
      setShowOtpForm(true);
      setOtpSent(true);
      setTimer(120); // Set timer for 2 minutes
      setVerificationMessage('OTP sent to your email');
    } catch (error) {
      toast.error('Error sending OTP');
      console.log('error is', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value.length > 0 && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    setOtp(newOtp);
  };

  const handleOtpVerify = async () => {
    setLoading(true); // Start loading when verifying OTP
    try {
      const otpString = otp.join('');
      await axios.post('https://ai-place-finder-backend.onrender.com/verify-otp', { email, otp: otpString });

      const userData = { email, username };
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success('OTP verified and user data saved');
      navigate("/");
    } catch (error) {
      setVerificationMessage('Invalid OTP');
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post('https://ai-place-finder-backend.onrender.com/send-otp', { email });
      setTimer(120); // Reset timer for 2 minutes
      setVerificationMessage('OTP resent to your email');
    } catch (error) {
      toast.error('Error resending OTP');
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { access_token } = response;
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const user = {
          email: data.email,
          name: data.name,
          profilePic: data.picture,
        };

        localStorage.setItem("user", JSON.stringify(user));
        toast.success('User data saved by Google');
        navigate("/");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-6 sm:px-4 md:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <SparklesPreview text={'Explore By Login'} />
      <div className="max-w-md w-full mx-auto rounded-md md:rounded-2xl p-6 sm:p-4 bg-black shadow-input relative mt-10">
        <button
          onClick={handleBackClick}
          className="flex items-center text-white mb-6"
        >
          <IconArrowLeft className="h-5 w-5 mr-2" />
          <span className="text-sm">Back to Home</span>
        </button>
        <h2 className="font-bold text-xl text-neutral-200">{isLogin ? 'Login to Ai_Place_Finder' : 'Welcome to Ai_Place_Finder'}</h2>
        <p className="text-neutral-400 text-sm max-w-sm mt-2">{isLogin ? 'Sign in to your account' : 'Sign up to Ai_Place_Finder with email id'}</p>

        {isLogin ? (
          <form className="my-8">
            <LabelInputContainer className="mb-4 text-white">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                className="bg-black text-white"
              />
            </LabelInputContainer>
            <button
              className="relative block w-full text-white rounded-md h-10 font-medium bg-gradient-to-br from-black to-neutral-600 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] mb-6"
              type="button"
            >
              Sign In &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-8 h-[1px] w-full" />

            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full bg-black text-white rounded-md h-10 font-medium shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] mb-6"
              onClick={login}
            >
              <FcGoogle className="h-4 w-4 text-white dark:text-neutral-300" />
              <span className="text-white dark:text-neutral-300 text-sm">Google</span>
              <BottomGradient />
            </button>

            <button
              onClick={handleSignupClick}
              className="relative block w-full text-white rounded-md h-10 font-medium bg-gradient-to-br from-black to-neutral-600 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] mb-6"
            >
              Back to Signup
            </button>
          </form>
        ) : (
          <>
            {!showOtpForm && (
              <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-2">
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input
                    id="username"
                    placeholder="your_username"
                    type="text"
                    className="bg-black text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 text-white">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    className="bg-black text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </LabelInputContainer>
                <button
                  className={`relative block w-full text-white rounded-md h-10 font-medium ${loading ? "bg-gray-600" : "bg-gradient-to-br from-black to-neutral-600"} shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] mb-6`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingSpinner /> // Use Loader here
                  ) : (
                    <>
                      Sign In &rarr;
                      <BottomGradient />
                    </>
                  )}
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-8 h-[1px] w-full" />

                <button
                  className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full bg-black text-white rounded-md h-10 font-medium shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] mb-6"
                  onClick={login}
                >
                  <FcGoogle className="h-4 w-4 text-white dark:text-neutral-300" />
                  <span className="text-white dark:text-neutral-300 text-sm">Google</span>
                  <BottomGradient />
                </button>
                {/* <button
                  onClick={handleLoginClick}
                  className="relative block w-full text-white rounded-md h-10 font-medium bg-gradient-to-br from-black to-neutral-600 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                >
                  Switch to Login
                </button> */}
              </form>
            )}

            {showOtpForm && !loading && (
              <div className="my-8">
                <h3 className="font-bold text-lg text-neutral-200 mb-4">Enter OTP</h3>
                <div className="flex space-x-2 justify-center mb-4">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder="-"
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                      className="w-12 p-2 border rounded text-center bg-black text-white"
                      maxLength={1}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                {verificationMessage && <p className="text-red-500 text-sm mb-4">{verificationMessage}</p>}
                {timer > 0 ? (
                  <p className="text-neutral-400 text-sm mb-6 text-center">Resend OTP in {Math.floor(timer / 60)}:{timer % 60}</p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className={`relative block w-full text-white rounded-md h-10 font-medium ${loading ? "bg-gray-600" : "bg-gradient-to-br from-black to-neutral-600"} shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] mb-6`}
                    disabled={loading}
                  >
                    {loading ? (
                      <LoadingSpinner /> // Use Loader here
                    ) : (
                      <>
                        Resend OTP &rarr;
                        <BottomGradient />
                      </>
                    )}
                  </button>
                )}
            <button
  onClick={handleOtpVerify}
  className={`relative block w-full text-white rounded-md h-10 font-medium ${loading ? "bg-gray-600" : "bg-gradient-to-br from-black to-neutral-600"} shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] mb-6`}
  disabled={loading}
>
  {loading ? (
    <div className="flex items-center justify-center h-full w-full">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      Verify OTP &rarr;
      <BottomGradient />
    </>
  )}
</button>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
