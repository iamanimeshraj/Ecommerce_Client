import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { Mail, Phone, User, Shield } from "lucide-react";

const ProfileOverview = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-6">
        Welcome , <span className="text-rose-900">{user?.name || "User"}</span> 👋
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Profile Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            Profile Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">{user?.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-600">Role:</span>
              <span className="text-gray-800">{user?.role || "Customer"}</span>
            </div>
          </div>
        </div>

        {/* Future Enhancements / Activity Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Account Overview</h3>
          <p className="text-sm text-gray-600">
            This section will soon show your recent orders, saved addresses, and profile activity.
          </p>
          <div className="mt-4 text-xs text-gray-400 italic">Stay tuned for updates 🚀</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
