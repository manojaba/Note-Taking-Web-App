import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import  { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../buttons/PrimaryButton";
import { changePassword } from "../../network/notes.api";

interface ChangePasswordInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordInput{
  onApplyChanges:() => void;
}

function ChangePassword({onApplyChanges}:ChangePasswordInput) {
  const {
    register,
    handleSubmit,
    reset,
    
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInputs>();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(data: ChangePasswordInputs) {
    const { oldPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    console.log("New password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    const passwords = { oldPassword, newPassword };

    try {
      const response = await changePassword(passwords);
      console.log(response.email);
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <div className=" w-full lg:max-w-[528px] px-2 ">
      <button className="flex items-center gap-2 lg:hidden text-preset-4 text-f-neutral-600 dark:text-white pb-3 cursor-pointer" onClick={() => onApplyChanges()}><ChevronLeft className=""/> Settings</button>
      <h1 className="block lg:hidden  text-preset-1 text-f-neutral-950 dark:text-white">Change Password</h1>
      <h1 className="hidden lg:block text-preset-3 text-f-neutral-950 dark:text-white">
        Change Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-[40px]">
        <div className="flex flex-col gap-[6px] pt-4 pb-4">
          <label className="text-preset-4 text-f-neutral-950 dark:text-f-white">
            old Password
          </label>
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full outline-1 outline-f-neutral-300 dark:outline-f-neutral-600 rounded-[8px] px-4 py-3 bg-f-white dark:bg-f-neutral-950 placeholder:text-f-neutral-500 placeholder:text-[14px] placeholder:font-normal placeholder:leading-1.5 placeholder:tracking-[-0.2px] text-f-neutral-950 dark:text-f-white"
              {...register("oldPassword", { required: "Required" })}
            ></input>
            {showOldPassword ? (
              <EyeOff
                className="absolute top-1/2 -translate-y-1/2 right-4 text-f-neutral-500 dark:text-f-neutral-500 w-[17px] h-auto"
                onClick={() => setShowOldPassword(false)}
              />
            ) : (
              <Eye
                className="absolute top-1/2 -translate-y-1/2 right-4 text-f-neutral-500 dark:text-f-neutral-500 w-[17px] h-auto"
                onClick={() => setShowOldPassword(true)}
              />
            )}
          </div>
          {errors.oldPassword && (
            <p className="text-red-400">{errors.oldPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-[6px] pt-4 pb-4">
          <label className="text-preset-4 text-f-neutral-950 dark:text-f-white">
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full outline-1 outline-f-neutral-300 dark:outline-f-neutral-600 rounded-[8px] px-4 py-3 bg-f-white dark:bg-f-neutral-950 placeholder:text-f-neutral-500 placeholder:text-[14px] placeholder:font-normal placeholder:leading-1.5 placeholder:tracking-[-0.2px] text-f-neutral-950 dark:text-f-white"
              {...register("newPassword", { required: "Required" })}
            ></input>
            {showNewPassword ? (
              <EyeOff
                className="absolute top-1/2 -translate-y-1/2 right-4 text-f-neutral-500 dark:text-f-neutral-500 w-[17px] h-auto"
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <Eye
                className="absolute top-1/2 -translate-y-1/2 right-4 text-f-neutral-500 dark:text-f-neutral-500 w-[17px] h-auto"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>
          {errors.newPassword && (
            <p className="text-red-400">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-[6px] pt-4 pb-[24px]">
          <label className="text-preset-4 text-f-neutral-950 dark:text-f-white">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full outline-1 outline-f-neutral-300 dark:outline-f-neutral-600 rounded-[8px] px-4 py-3 bg-f-white dark:bg-f-neutral-950 placeholder:text-f-neutral-500 placeholder:text-[14px] placeholder:font-normal placeholder:leading-1.5 placeholder:tracking-[-0.2px] text-f-neutral-950 dark:text-f-white"
              {...register("confirmPassword", {
                required: "Required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            ></input>
            {showConfirmPassword ? (
              <EyeOff
                className="absolute top-1/2 -translate-y-1/2 right-4 text-f-neutral-500 dark:text-f-neutral-500 w-[17px] h-auto"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <Eye
                className="absolute top-1/2 -translate-y-1/2 right-4 text-f-neutral-500 dark:text-f-neutral-500 w-[17px] h-auto"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}{" "}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex justify-end lg:max-w-[528px]">
<PrimaryButton
          type="submit"
          disabled={isSubmitting}
         
        >
          Change Password
        </PrimaryButton>
        </div>

        
      </form>
    </div>
  );
}

export default ChangePassword;
