import { useLocation, useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VscQuote } from "react-icons/vsc";
import { App_url, quotesDB } from "../utils/constants/static";
import InputField from "./InputField";
import Button from "./button/Button";
import RadioButton from "./RadioButton";
import {
  ForgotPasswordApi,
  LoginApi,
  RegisterApi,
  ResetPassword,
  VerifyOtpApi,
} from "../utils/Api/apiCalls";
import type {
  IForgotPasswordPayload,
  ILoginPayload,
  IRegisterPayload,
  IResetPasswordPayload,
  IVerifyOtpPayload,
} from "../utils/Types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setLogin,
  setPasswordEmail,
} from "../routes/Redux/posterReducer/posterSlice";

type AuthFormTypes =
  | (IRegisterPayload & { formType: "register" })
  | (ILoginPayload & { formType: "login" })
  | (IForgotPasswordPayload & { formType: "forgot" })
  | (IVerifyOtpPayload & { formType: "verify" })
  | (IResetPasswordPayload & { formType: "reset" });

const Auth = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const path = loc.pathname;

  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const projectName = import.meta.env.VITE_PROJECT_NAME;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AuthFormTypes>();


  const dispatch = useAppDispatch();
  const emailPass = useAppSelector((state) => state.auth.passwordEmail);
  console.log("emailPass::", emailPass);

  useEffect(()=>{
    if(path === App_url.link.LOGIN || path === App_url.link.REGISTER){
      dispatch(setPasswordEmail(""));
    }
  },[path,dispatch]);

  const onSubmit = async (payload: AuthFormTypes) => {
  if (loader) return;
  setLoader(true);
    try {
      // Register Api
      if (path === App_url.link.REGISTER) {
        const response = await RegisterApi(payload as IRegisterPayload);
        console.log("Register response:", response);
        if (response?.status === 200) {
          reset();
          navigate(App_url.link.LOGIN);
        }
      }
      // Login Api
      else if (path === App_url.link.LOGIN) {
        const response = await LoginApi(payload as ILoginPayload);
        console.log("Login response:", response);
        if (response?.status === 200) {
          dispatch(
            setLogin({
              user: response.data.data.user,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
            })
          );
          reset();
          navigate(App_url.link.INITIAL_URL);
        }
      }
      // Forgot password Api

       else if (path === App_url.link.FORGOT_PASSWORD) {
        const response = await ForgotPasswordApi(
          payload as IForgotPasswordPayload
        );
        console.log("Forgot password response:", response);
        if (response?.status === 200) {
          dispatch(setPasswordEmail(payload.email));
          navigate(App_url.link.VERIFY_OTP);
        }
      }

      // Verify otp Api
      // Verify otp Api
     else if (path === App_url.link.VERIFY_OTP) {
        const response = await VerifyOtpApi({
          email: emailPass,
          resetOTP: (payload as IVerifyOtpPayload).resetOTP,
        });
        console.log("Verify otp response:", response);
        if (response?.status === 200) {
          navigate(App_url.link.RESET_PASSWORD);
        }
      }

     else if (path === App_url.link.RESET_PASSWORD) {
        const response = await ResetPassword(
          payload as unknown as IResetPasswordPayload
        );
        console.log("Reset password response:", response);
        if (response?.status === 200) {
          reset();
          dispatch(setPasswordEmail(""));
          navigate(App_url.link.LOGIN);
        }
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoader(false);
    }
  };

  const email = watch("email"); // ✅ Get email from form


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
          path === App_url.link.FORGOT_PASSWORD ||
          path === App_url.link.REGISTER) && (
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

      <div className="h-full flex w-[850px] pt-[8%] pr-16 justify-end">
        <div className="w-[60.8%] px-2 bg-[#E4F8FF] h-fit pb-3 rounded-3xl">
          {(path === App_url.link.FORGOT_PASSWORD ||
            path === App_url.link.RESET_PASSWORD ||
            path === App_url.link.REGISTER) && (
            <div
              className="flex text-sm gap-2 pt-4 pl-2 items-center cursor-pointer hover:text-gray-600"
              onClick={() => navigate(App_url.link.LOGIN)}
            >
              <img src={App_url.image.arrowleft} className="h-3" alt="back" />
              <p>Login Page</p>
            </div>
          )}

          {path === App_url.link.LOGIN && (
            <div
              className="flex text-sm gap-2 pt-4 pl-2 items-center cursor-pointer hover:text-gray-600"
              onClick={() => navigate(App_url.link.REGISTER)}
            >
              <img src={App_url.image.arrowleft} className="h-3" alt="back" />
              <p>Register Page</p>
            </div>
          )}
          {path === App_url.link.VERIFY_OTP && (
            <div
              className="flex text-sm gap-2 pt-4 pl-2 items-center cursor-pointer hover:text-gray-600"
              onClick={() => navigate(App_url.link.FORGOT_PASSWORD)}
            >
              <img src={App_url.image.arrowleft} className="h-3" alt="back" />
              <p>Forgot Password Page</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4">
            <div className="text-left my-4">
              <p className="font-bold text-[#202F57] text-lg">
                {path === App_url.link.FORGOT_PASSWORD
                  ? "Forgot Password"
                  : path === App_url.link.LOGIN ||
                    path === App_url.link.REGISTER
                  ? `Welcome to ${projectName}`
                  : path === App_url.link.RESET_PASSWORD
                  ? "Ente your email and new Password"
                  : ""}
              </p>

              {path === App_url.link.LOGIN ||
                (path === App_url.link.REGISTER && (
                  <p className="text-sm text-[#767B86] mt-1">
                    Please enter your credentials
                  </p>
                ))}
              {path === App_url.link.RESET_PASSWORD && (
                <p className="text-sm text-[#767B86] mt-1">
                  Please enter your email to reset your password
                </p>
              )}
            </div>

            {path === App_url.link.REGISTER && (
              <>
                <InputField
                  name="Full Name"
                  className="mt-2"
                  inputClassName="h-10 rounded-md"
                  placeholder="Enter your full name"
                  register={register("fullName", {
                    required: "Enter your full name",
                  })}
                  error={(errors as Record<string, any>).fullName}
                  required
                />

                <InputField
                  name="Username"
                    className="mt-2"
                  inputClassName="h-10 rounded-md"
                  placeholder="Enter unique username"
                  register={register("username", {
                    required: "Enter your username",
                  })}
                  error={errors.username}
                  required
                />
              </>
            )}

            {/* Email */}
            {(path === App_url.link.LOGIN ||
              path === App_url.link.FORGOT_PASSWORD ||
              path === App_url.link.REGISTER) && (
              <InputField
                name="Email id"
                  className="mt-2"
                inputClassName="h-10 rounded-md"
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
            {(path === App_url.link.VERIFY_OTP ||
              path === App_url.link.RESET_PASSWORD) && (
              <InputField
                name="Email id"
                  className="mt-2"
                inputClassName="h-10 rounded-md"
                value={emailPass || ""}
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })} // from Redux
                readOnly={true} // ✅ make read-only
                disabled={true} // ✅ prevent editing
              />
            )}

            {/* Password */}
            {(path === App_url.link.LOGIN ||
              path === App_url.link.RESET_PASSWORD ||
              path === App_url.link.REGISTER) && (
              <InputField
                name="Password"
                  className="mt-2"
                inputClassName="h-10 rounded-md"
                placeholder="Enter your password"
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
                required
              />
            )}

            {path === App_url.link.REGISTER && (
              <p className="text-sm text-[#767B86] mt-1">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => navigate(App_url.link.LOGIN)}
                >
                  Login
                </span>
              </p>
            )}

            {/* Confirm Password */}
            {path === App_url.link.RESET_PASSWORD && (
              <InputField
                name="confirmNewPassword"
                  className="mt-2"
                inputClassName="h-10 rounded-md"
                placeholder="Re-enter your password"
                type="password"
                register={register("confirmNewPassword", {
                  required: "Please confirm your password",
                  validate: (value) => {
                    const currentPassword = watch("password");
                    return (
                      value === currentPassword || "Passwords do not match"
                    );
                  },
                })}
                error={errors.confirmNewPassword}
                required
              />
            )}

            
            {/* OTP */}
            {path === App_url.link.VERIFY_OTP && (
              <InputField
                name="resetOTP"
                  className="mt-2"
                inputClassName="h-10 rounded-md"
                placeholder="Enter OTP"
                register={register("resetOTP", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "Must be 6 digits" },
                  maxLength: { value: 6, message: "Must be 6 digits" },
                })}
                error={errors.resetOTP}
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
