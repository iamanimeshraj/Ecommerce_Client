import React from "react";
import { ShieldCheck } from "lucide-react";

const Security = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-16">
      <div className="bg-blue-100 text-blue-800 p-4 rounded-full mb-4">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Security Settings</h2>
      <p className="text-gray-600 max-w-md">
        Security features are <span className="font-semibold">coming soon</span>! You'll soon be able to update your password and manage your login settings.
        <br />Stay secure 🔒
      </p>
    </div>
  );
};

export default Security;
