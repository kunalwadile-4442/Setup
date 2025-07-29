import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Goback from "../../components/Goback";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  GetUserProfile,
  UpdateUserProfile,
  UpdateUserPassword,
} from "../../utils/Api/apiCalls";
import { setUserProfile } from "../../routes/Redux/posterReducer/posterSlice";
import ProfileImageUpload from "../../components/ProfileUpload";

function Profile() {
  const dispatch = useAppDispatch();
  const profileGet = useAppSelector((state) => state.auth.profileSet);

  const {
    register: registerProfile,
    control: controlProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    watch: watchProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      profilePicture: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const watchedProfileValues = watchProfile();

  // ✅ Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await GetUserProfile();
        const userData = response.data.data.user;
        resetProfile({
          fullName: userData.fullName,
          email: userData.email,
          username: userData.username,
          profilePicture: userData.profilePicture,
        });
        dispatch(setUserProfile(userData));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Detect profile changes (excluding image)
  useEffect(() => {
    if (!profileGet) return;
    const hasChanges =
      watchedProfileValues.fullName !== profileGet.fullName ||
      watchedProfileValues.email !== profileGet.email ||
      watchedProfileValues.username !== profileGet.username;
    setIsProfileChanged(hasChanges);
  }, [watchedProfileValues, profileGet]);

  // ✅ Profile update handler
  const handleProfileUpdate = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("username", data.username);

      if (data.profilePicture instanceof File) {
        formData.append("profilePicture", data.profilePicture);
      }

      const response = await UpdateUserProfile(formData);
      const updatedUser = response.data.data.user;
      console.log("updatedUser", updatedUser);

      dispatch(setUserProfile(updatedUser));
      resetProfile(updatedUser);

      // ✅ Reset states
      setIsProfileChanged(false);
      setIsImageChanged(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Password update handler
  const handlePasswordUpdate = async (data: any) => {
    console.log("data",data)
    const { currentPassword, newPassword, confirmNewPassword } = data;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return;
    }

    if (newPassword !== confirmNewPassword) {
      return;
    }

    try {
      await UpdateUserPassword(data);
      resetPassword();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Goback title={"Back"} />
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Forms */}
          <div className="lg:col-span-2 space-y-10">
            {/* ✅ Profile Update Form */}
            <form
              onSubmit={handleProfileSubmit(handleProfileUpdate)}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold border-b pb-2">
                Update Profile
              </h2>

              <InputField
                label="Full Name"
                inputClassName="rounded-md h-10"
                required
                register={registerProfile("fullName")}
              />
              <InputField
                label="Email"
                inputClassName="rounded-md h-10"
                required
                register={registerProfile("email")}
              />
              <InputField
                label="Username"
                inputClassName="rounded-md h-10 cursor-not-allowed"
                required
                readOnly
                disabled
                register={registerProfile("username")}
              />

              <button
                type="submit"
                disabled={!(isProfileChanged || isImageChanged)}
                className={`w-full py-2 rounded-md text-white font-medium transition ${
                  isProfileChanged || isImageChanged
                    ? "bg-primary hover:bg-primaryHover"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Update Profile
              </button>
            </form>

            {/* ✅ Password Update Form */}
            <form
              onSubmit={handlePasswordSubmit(handlePasswordUpdate)}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold border-b pb-2">
                Change Password
              </h2>

              <InputField
                label="Current Password"
                inputClassName="rounded-md h-10"
                placeholder="Enter your current password"
                type="password"
                required
                register={registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
                error={passwordErrors.currentPassword?.message}
              />

              <InputField
                label="New Password"
                inputClassName="rounded-md h-10"
                placeholder="Enter your new password"
                type="password"
                register={registerPassword("newPassword", {
                  required: "New password is required",
                })}
                required
                error={passwordErrors.newPassword?.message}
              />

              <InputField
                placeholder="Confirm your new password"
                label="Confirm New Password"
                inputClassName="rounded-md h-10"
                type="password"
                register={registerPassword("confirmNewPassword", {
                  required: "Confirm new password is required",
                  validate: (value) =>
                    value === watchPassword("newPassword") ||
                    "Passwords do not match",
                })}
                required
                error={passwordErrors.confirmNewPassword?.message}
              />

              <button
                type="submit"
                className="w-full py-2 rounded-md text-white bg-primary hover:bg-primaryHover font-medium"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Right Section: Profile Image */}
          <div className="flex flex-col items-center justify-start border-l pl-6">
            <ProfileImageUpload
              name="profilePicture"
              label="Profile Image"
              control={controlProfile}
              currentImage={watchedProfileValues.profilePicture}
              onFileSelected={() => setIsImageChanged(true)}
              error={profileErrors.profilePicture?.message}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;