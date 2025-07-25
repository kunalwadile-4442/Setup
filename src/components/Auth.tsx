import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscQuote } from "react-icons/vsc";
import { App_url, quotesDB } from "../utils/constants/static";
import InputField from "./InputField";
import Button from "./button/Button";
import RadioButton from "./RadioButton";

interface ILoginTypes {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  otp?: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const path = loc.pathname;

  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginTypes>();
  const email = watch("email");
  const password = watch("password");

  const onSubmit = (data: ILoginTypes) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(App_url.link.DASHBOARD);
    }, 1000);
  };

  const startTimer = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) {
      setIsRunning(true);
      setTimeLeft(60);
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft === 0) {
      setIsRunning(false);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

const currentHour = new Date().getHours(); 
const quoteIndex = currentHour % quotesDB.length;
const selectedQuote = quotesDB[quoteIndex];

  return (
    <div
      className="h-screen w-full bg-[#ffffff] flex justify-between"
      style={{
        backgroundImage: `url(${App_url.image.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-between pl-10">
        {(path === App_url.link.LOGIN ||
          path === App_url.link.FORGOT_PASSWORD) && (
          <div className="mt-8">
            <img className="h-16" src={App_url.image.applogo} alt="logo" />
          </div>
        )}
        <div className="mb-[50px] w-[590px] sm:w-[450px] text-white">
          <VscQuote className="text-[32px] mb-2" />
          <p className="text-[20px] font-bold">{selectedQuote.quote}</p>
          <p className="text-[18px] mt-2">- {selectedQuote.author}</p>
        </div>
      </div>

      <div className="h-full flex w-[850px] pt-[14%] pr-16 justify-end">
        <div className="w-[60.8%] px-2 bg-[#E4F8FF] h-fit pb-3 rounded-3xl">
          {path === App_url.link.FORGOT_PASSWORD && (
            <div
              className="flex text-sm gap-2 pt-4 pl-2 items-center cursor-pointer hover:text-gray-600"
              onClick={() => navigate(App_url.link.LOGIN)}
            >
              <img src={App_url.image.arrowleft} className="h-3" alt="back" />
              <p>Login Page</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4">
            <div className="text-left my-4">
              <p className="font-bold text-[#202F57] text-lg">
                {path === App_url.link.FORGOT_PASSWORD
                  ? "Forgot Password"
                  : "Login with Email ID"}
              </p>
              {path === App_url.link.LOGIN && (
                <p className="text-sm text-[#767B86] mt-1">
                  Please enter your credentials
                </p>
              )}
            </div>

            {/* Email */}
            {(path === App_url.link.LOGIN ||
              path === App_url.link.FORGOT_PASSWORD) && (
              <InputField
                name="Email id"
                placeholder="Enter your email"
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                error={errors.email}
                required
              />
            )}

            {/* Password */}
            {(path === App_url.link.LOGIN ||
              path === App_url.link.RESET_PASSWORD) && (
              <InputField
                name="Password"
                placeholder="Enter your password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
                required
              />
            )}

            {/* Confirm Password */}
            {path === App_url.link.RESET_PASSWORD && (
              <InputField
                name="Confirm Password"
                placeholder="Re-enter your password"
                type="password"
                register={register("passwordConfirm", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={errors.passwordConfirm}
                required
              />
            )}

            {/* Send Code */}
            {path === App_url.link.FORGOT_PASSWORD && (
              <div className="flex items-center gap-3">
                <Button
                  label={isRunning ? "Sent" : "Send Code"}
                  onClick={startTimer}
                  disabled={isRunning || !email}
                />
                <span className="text-sm text-gray-500">
                  Resend in {formatTime(timeLeft)}
                </span>
              </div>
            )}

            {/* OTP */}
            {path === App_url.link.FORGOT_PASSWORD && (
              <InputField
                name="Code"
                placeholder="Enter OTP"
                register={register("otp", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "Must be 6 digits" },
                  maxLength: { value: 6, message: "Must be 6 digits" },
                })}
                error={errors.otp}
                required
              />
            )}

            {/* Remember Me + Forgot */}
            {path === App_url.link.LOGIN && (
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div className="flex items-center gap-2 cursor-pointer">
                  <RadioButton
                    label="Keep me signed in"
                    value="yes"
                    className="text-xs text-[#767B86]"
                    register={{
                      name: "keepSignedIn",
                      value: isChecked ? "yes" : "",
                      onChange: () => setIsChecked(!isChecked),
                    }}
                  />
                </div>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate(App_url.link.FORGOT_PASSWORD)}
                >
                  Forgot Password?
                </p>
              </div>
            )}

            <Button
              type="submit"
              label={path === App_url.link.LOGIN ? "Login" : "Submit"}
              className="w-full bg-primary text-white rounded-xl h-10 mt-6"
              isLoading={loader}
              disabled={loader}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
