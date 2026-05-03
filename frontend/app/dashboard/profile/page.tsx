"use client";

import { useState } from "react";
import { Building2, Mail, Phone, User, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    orgName: "Municipal Corporation of Greater Mumbai",
    orgId: "ULB-MH-001",
    regDate: "January 15, 2024",
    licenseType: "Enterprise",
    validTill: "December 31, 2026",
    days: "269 days",
    name: "Dr. Rajesh Kumar",
    role: "Chief Technology Officer",
    email: "rajesh.kumar@mcgm.gov.in",
    phone: "+91 22 2266 7890",
  });

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", data);
  };

  return (
    <div className="w-full space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            Profile
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your organization details and settings
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer"
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm cursor-pointer"
          >
            💾 Save
          </button>
        )}
      </div>

      {/* ORGANIZATION */}
      <div className="
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-[20px]
        p-6
        flex justify-between
      ">
        <div className="grid grid-cols-2 gap-6 w-full">

          <Field label="Organization Name" value={data.orgName} editing={isEditing} onChange={(v) => handleChange("orgName", v)} />
          <Field label="Organization ID" value={data.orgId} editing={isEditing} onChange={(v) => handleChange("orgId", v)} />
          <Field label="Registration Date" value={data.regDate} editing={isEditing} onChange={(v) => handleChange("regDate", v)} />

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full text-xs mt-1">
              <CheckCircle size={14} /> Active
            </span>
          </div>
        </div>

        <div className="ml-6 flex items-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <Building2 className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* LICENSE */}
      <div className="
        bg-blue-50 dark:bg-blue-900/10
        border border-blue-200 dark:border-blue-800/40
        rounded-[20px]
        p-6
      ">
        <h2 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">
          License Information
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <Field label="License Type" value={data.licenseType} editing={isEditing} onChange={(v)=>handleChange("licenseType", v)} />
          <Field label="Valid Until" value={data.validTill} editing={isEditing} onChange={(v)=>handleChange("validTill", v)} />
          <Field label="Days Remaining" value={data.days} editing={false} />
        </div>

        <div className="
          mt-4 
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-lg 
          p-4 
          text-green-600 dark:text-green-400 
          text-sm 
          flex items-center gap-2
        ">
          <CheckCircle size={16} />
          Your license is active and valid
        </div>
      </div>

      {/* CONTACT */}
      <div className="
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-[20px]
        p-6
      ">
        <h2 className="font-semibold mb-4 text-[var(--foreground)]">
          Key Contact Person
        </h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <User className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="w-full">
            <Field label="Name" value={data.name} editing={isEditing} onChange={(v)=>handleChange("name", v)} />
            <Field label="Role" value={data.role} editing={isEditing} onChange={(v)=>handleChange("role", v)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ContactField icon={<Mail />} label="Email" value={data.email} editing={isEditing} onChange={(v)=>handleChange("email", v)} />
          <ContactField icon={<Phone />} label="Phone" value={data.phone} editing={isEditing} onChange={(v)=>handleChange("phone", v)} />
        </div>
      </div>

      {/* SECURITY */}
      <div className="
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-[20px]
        p-6 space-y-4
      ">
        <Setting title="Two-Factor Authentication" status="Enabled" />
        <Setting title="API Access" button="Configure" />
        <Setting title="Session Timeout" value="30 minutes" />
      </div>
    </div>
  );
}

/* FIELD */
function Field({ label, value, editing, onChange }: any) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            mt-1 w-full px-3 py-2 rounded-lg 
            border border-[var(--border)]
            bg-[var(--card)]
            text-[var(--foreground)]
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      ) : (
        <h3 className="font-medium mt-1 text-[var(--profile-page)]">
        vh bnm  {value}
        </h3>
      )}
    </div>
  );
}

/* CONTACT */
function ContactField({ icon, label, value, editing, onChange }: any) {
  return (
    <div className="
      flex items-center gap-3 
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-lg 
      p-4
    ">
      <div className="text-gray-400">{icon}</div>

      <div className="w-full">
        <p className="text-xs text-gray-500">{label}</p>

        {editing ? (
          <input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="
              w-full text-sm bg-transparent 
              border-b border-[var(--border)] 
              focus:outline-none
            "
          />
        ) : (
          <p className="text-sm text-[var(--foreground)]">{value}</p>
        )}
      </div>
    </div>
  );
}

/* SETTINGS */
function Setting({ title, status, button, value }: any) {
  return (
    <div className="
      flex justify-between items-center 
      bg-[var(--card)]
      border border-[var(--border)]
      rounded-lg 
      p-6
    ">
      <p className="font-medium text-[var(--foreground)]">{title}</p>

      {status && (
        <span className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full text-xs">
          {status}
        </span>
      )}

      {button && (
        <button className="border border-[var(--border)] px-4 py-1 rounded-lg text-sm">
          {button}
        </button>
      )}

      {value && <span className="text-sm text-gray-500">{value}</span>}
    </div>
  );
}