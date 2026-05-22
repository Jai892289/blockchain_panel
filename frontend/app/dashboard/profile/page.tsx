"use client";

import { useEffect, useState } from "react";

import {
  Building2,
  Mail,
  Phone,
  User,
  CheckCircle,
  Shield,
  CalendarDays,
  BadgeCheck,
  Pencil,
  Save,
  Clock3,
  KeyRound,
  IdCard,
} from "lucide-react";

export default function ProfilePage() {

  const [isEditing, setIsEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [data, setData] = useState<any>({
    orgName: "",
    orgId: "",
    regDate: "",
    licenseType: "",
    validTill: "",
    days: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "",
    profileImage: "",
  });

  // =========================================
  // API URL
  // =========================================

  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

  // =========================================
  // FETCH PROFILE
  // =========================================

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result =
          await response.json();

        const user = result.user;

        setData({

          orgName:
            user.organizationName,

          orgId:
            user.organizationId,

          regDate:
            user.registrationDate,

          licenseType:
            user.licenseType,

          validTill:
            user.validUntil,

          days:
            `${user.daysRemaining} days`,

          name:
            user.contactPersonName,

          role:
            user.contactPersonRole,

          email:
            user.email,

          phone:
            user.phone,

          status:
            user.status,

          profileImage:
            user.profileImage,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchProfile();

  }, []);

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (
    key: string,
    value: string
  ) => {

    setData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================================
  // UPDATE PROFILE
  // =========================================

  const handleSave = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        `${API_URL}/auth/update-profile`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({

            organizationName:
              data.orgName,

            organizationId:
              data.orgId,

            registrationDate:
              data.regDate,

            licenseType:
              data.licenseType,

            validUntil:
              data.validTill,

            contactPersonName:
              data.name,

            contactPersonRole:
              data.role,

            email:
              data.email,

            phone:
              data.phone,
          }),
        }
      );

      setIsEditing(false);

      alert(
        "Profile updated successfully"
      );

    } catch (error) {

      console.log(error);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[400px]">

        <p className="text-gray-500 text-sm">
          Loading Profile...
        </p>

      </div>
    );
  }

  return (

    <div className="w-full space-y-6 p-4 bg-[var(--background)] min-h-screen">

      {/* ================================= HEADER ================================= */}

      <div className="flex justify-between items-start flex-wrap gap-4">

        <div>

          <h1 className="text-[28px] font-bold text-[var(--foreground)]">
            Profile
          </h1>

          <p className="text-[14px] text-[var(--foreground)]/60 mt-1">
            Manage your organization details and settings
          </p>

        </div>

        {!isEditing ? (

          <button
            onClick={() =>
              setIsEditing(true)
            }
            className="
              h-11 px-5
              rounded-xl
              bg-[#2563eb]
              hover:bg-[#1d4ed8]
              text-white
              text-sm
              font-medium
              flex items-center gap-2
              shadow-md
              transition-all
              cursor-pointer
            "
          >
            <Pencil size={16} />
            Edit Profile
          </button>

        ) : (

          <button
            onClick={handleSave}
            className="
              h-11 px-5
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
              text-sm
              font-medium
              flex items-center gap-2
              shadow-md
              transition-all
              cursor-pointer
            "
          >
            <Save size={16} />
            Save
          </button>
        )}
      </div>

      {/* ================================= ORGANIZATION ================================= */}

      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[34px]
          p-8
          flex justify-between
          gap-10
          shadow-sm
        "
      >

        {/* LEFT */}
        <div className="flex-1">

          <div className="mb-8">

            <h2 className="text-[18px] font-semibold text-[#2563eb]">
              Organization Details
            </h2>

            <p className="text-[14px] text-[var(--foreground)]/60 mt-1">
              Your registered organization information
            </p>

          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-7">

            <Field
              icon={<Building2 size={16} />}
              label="Organization Name"
              value={data.orgName}
              editing={isEditing}
              onChange={(v: string) =>
                handleChange("orgName", v)
              }
            />

            <Field
              icon={<IdCard size={16} />}
              label="Organization ID"
              value={data.orgId}
              editing={isEditing}
              onChange={(v: string) =>
                handleChange("orgId", v)
              }
            />

            <Field
              icon={<CalendarDays size={16} />}
              label="Registration Date"
              value={data.regDate}
              editing={isEditing}
              onChange={(v: string) =>
                handleChange("regDate", v)
              }
            />

            <div>

              <div className="flex items-center gap-2 text-[13px] text-[var(--foreground)]/55 mb-2">
                <BadgeCheck size={15} />
                Status
              </div>

              <span
                className="
                  inline-flex items-center gap-2
                  bg-green-100
                  text-green-700
                  dark:bg-green-900/20
                  dark:text-green-400
                  px-3 py-1.5
                  rounded-full
                  text-xs
                  font-medium
                "
              >

                <CheckCircle size={13} />

                {data.status || "Active"}

              </span>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-start justify-end">

          <div
            className="
              w-20 h-20
              rounded-full
              bg-blue-100
              dark:bg-blue-900/20
              flex items-center justify-center
            "
          >

            {data.profileImage ? (

              <img
                src={data.profileImage}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />

            ) : (

              <Building2
                size={38}
                className="text-[#2563eb]"
              />
            )}

          </div>
        </div>
      </div>

      {/* ================================= LICENSE ================================= */}

      <div
        className="
          bg-[#eff6ff]
          dark:bg-blue-900/10
          border border-[#bfdbfe]
          dark:border-blue-800/30
          rounded-[34px]
          p-8
          shadow-sm
        "
      >

        <h2 className="text-[18px] font-semibold text-[#1d4ed8] mb-7">
          License Information
        </h2>

        <div className="grid grid-cols-3 gap-8">

          <Field
            label="License Type"
            value={data.licenseType}
            editing={isEditing}
            onChange={(v: string) =>
              handleChange(
                "licenseType",
                v
              )
            }
          />

          <Field
            label="Valid Until"
            value={data.validTill}
            editing={isEditing}
            onChange={(v: string) =>
              handleChange(
                "validTill",
                v
              )
            }
          />

          <Field
            label="Days Remaining"
            value={data.days}
            editing={false}
          />

        </div>

        {/* ACTIVE BOX */}
        <div
          className="
            mt-7
            bg-[var(--card)]
            border border-[#bfdbfe]
            dark:border-blue-800/30
            rounded-2xl
            px-5 py-4
            flex items-center gap-3
            text-[15px]
            text-[var(--foreground)]
          "
        >

          <div
            className="
              w-7 h-7
              rounded-full
              bg-green-100
              dark:bg-green-900/20
              flex items-center justify-center
            "
          >
            <CheckCircle
              size={16}
              className="text-green-600"
            />
          </div>

          Your license is active and valid
        </div>
      </div>

      {/* ================================= CONTACT ================================= */}

      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[34px]
          p-8
          shadow-sm
        "
      >

        <div className="mb-7">

          <h2 className="text-[18px] font-semibold text-[#2563eb]">
            Key Contact Person
          </h2>

          <p className="text-[14px] text-[var(--foreground)]/60 mt-1">
            Primary point of contact for this organization
          </p>

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-5 mb-8">

          <div
            className="
              w-18 h-18
              min-w-[72px]
              rounded-full
              bg-blue-100
              dark:bg-blue-900/20
              flex items-center justify-center
            "
          >

            <User
              size={34}
              className="text-[#2563eb]"
            />

          </div>

          <div>

            <Field
              label=""
              value={data.name}
              editing={isEditing}
              onChange={(v: string) =>
                handleChange("name", v)
              }
              big
            />

            <Field
              label=""
              value={data.role}
              editing={isEditing}
              onChange={(v: string) =>
                handleChange("role", v)
              }
              small
            />

          </div>
        </div>

        {/* CONTACT GRID */}
        <div className="grid grid-cols-2 gap-5">

          <ContactField
            icon={<Mail size={20} />}
            label="Email"
            value={data.email}
            editing={isEditing}
            onChange={(v: string) =>
              handleChange("email", v)
            }
          />

          <ContactField
            icon={<Phone size={20} />}
            label="Phone"
            value={data.phone}
            editing={isEditing}
            onChange={(v: string) =>
              handleChange("phone", v)
            }
          />

        </div>
      </div>

      {/* ================================= SECURITY ================================= */}

      <div
        className="
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-[34px]
          p-8
          shadow-sm
        "
      >

        <div className="mb-6">

          <h2 className="text-[18px] font-semibold text-[var(--foreground)]">
            Security Settings
          </h2>

          <p className="text-[14px] text-[var(--foreground)]/60 mt-1">
            Manage your security preferences
          </p>

        </div>

        <div className="space-y-4">

          <Setting
            icon={<Shield size={20} />}
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security"
            status="Enabled"
          />

          <Setting
            icon={<KeyRound size={20} />}
            title="API Access"
            subtitle="Manage API keys and tokens"
            button="Configure"
          />

          <Setting
            icon={<Clock3 size={20} />}
            title="Session Timeout"
            subtitle="Automatic logout after inactivity"
            value="30 minutes"
          />

        </div>
      </div>
    </div>
  );
}

/* =========================================
   FIELD
========================================= */

function Field({
  icon,
  label,
  value,
  editing,
  onChange,
  big,
  small,
}: any) {

  return (

    <div>

      {label && (

        <div className="flex items-center gap-2 text-[13px] text-[var(--foreground)]/55 mb-2">

          {icon}

          {label}

        </div>
      )}

      {editing ? (

        <input
          value={value}
          onChange={(e) =>
            onChange?.(e.target.value)
          }
          className="
            w-full px-4 py-2.5 rounded-xl
            border border-[var(--border)]
            bg-[var(--card)]
            text-[var(--foreground)]
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
          "
        />

      ) : (

        <h3
          className={`
            text-[var(--profile-page)]
            ${
              big
                ? "text-[18px] font-semibold"
                : small
                ? "text-[14px] text-[var(--foreground)]/65"
                : "text-[16px] font-semibold"
            }
          `}
        >
          {value}
        </h3>
      )}
    </div>
  );
}

/* =========================================
   CONTACT FIELD
========================================= */

function ContactField({
  icon,
  label,
  value,
  editing,
  onChange,
}: any) {

  return (

    <div
      className="
        flex items-center gap-4
        bg-[var(--background)]
        border border-[var(--border)]
        rounded-2xl
        px-5 py-5
      "
    >

      <div className="text-[#94a3b8]">
        {icon}
      </div>

      <div className="w-full">

        <p className="text-[13px] text-[var(--foreground)]/55 mb-1">
          {label}
        </p>

        {editing ? (

          <input
            value={value}
            onChange={(e) =>
              onChange?.(e.target.value)
            }
            className="
              w-full bg-transparent
              text-sm
              text-[var(--foreground)]
              border-b border-[var(--border)]
              focus:outline-none
            "
          />

        ) : (

          <p className="text-[16px] font-medium text-[var(--foreground)]">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================
   SETTINGS
========================================= */

function Setting({
  icon,
  title,
  subtitle,
  status,
  button,
  value,
}: any) {

  return (

    <div
      className="
        flex justify-between items-center
        bg-[var(--background)]
        border border-[var(--border)]
        rounded-2xl
        px-5 py-5
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <div className="text-[#94a3b8]">
          {icon}
        </div>

        <div>

          <p className="text-[16px] font-semibold text-[var(--foreground)]">
            {title}
          </p>

          <p className="text-[14px] text-[var(--foreground)]/55 mt-1">
            {subtitle}
          </p>

        </div>
      </div>

      {/* RIGHT */}
      {status && (

        <span
          className="
            bg-green-100
            text-green-700
            dark:bg-green-900/20
            dark:text-green-400
            px-4 py-1.5
            rounded-full
            text-xs
            font-medium
          "
        >
          {status}
        </span>
      )}

      {button && (

        <button
          className="
            border border-[var(--border)]
            bg-[var(--card)]
            hover:bg-[var(--background)]
            px-4 py-2
            rounded-xl
            text-sm
            font-medium
            transition-all
          "
        >
          {button}
        </button>
      )}

      {value && (

        <span className="text-[15px] text-[var(--foreground)]/70">
          {value}
        </span>
      )}
    </div>
  );
}