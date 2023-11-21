import React from "react";
import { useRouter } from "next/router";
import Button from "./Button";

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
