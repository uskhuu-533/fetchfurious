"use client";


import * as React from "react";
import ProfileEdit from "./_features.tsx/ProfileEditForm";
import BankCardEdit from "./_features.tsx/BankCardEditForm";
import PasswordEditForm from "./_features.tsx/PasswordEdit";
import SuccessEdit from "./_features.tsx/SuccesMessageEditform";

const Settings = () => {
  return (
    <div className="w-[510px]">
      <ProfileEdit />
      <BankCardEdit />
      <PasswordEditForm />
      <SuccessEdit/>
    </div>
  );
};
export default Settings;
