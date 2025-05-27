import React from "react";

const AuthLayput = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center pt-40">
    {children}
    </div>;
};

export default AuthLayput;
