"use client";

import SettingNav from "../components/settingNav";

import UserContentDisplay from "../components/postPage";
import PostEditPage from "../components/postEditPage";

const UsersPage = () => {
  return (
    <div>
      <UserContentDisplay/>
      <SettingNav />
      <br/>
      <br/>
      <PostEditPage />
    </div>
  );
};

export default UsersPage;
