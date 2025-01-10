import { useContext, useState } from "react";
import { Users, Github, Key, Settings2, Eye, User, Upload } from "lucide-react";
import { Switch } from "./Switch";
import DataContext from "../../context/DataContext";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("team-members");
  const [inviteLinkEnabled, setInviteLinkEnabled] = useState(true);

  if (!isOpen) return null;
  const { currentTeam, data } = useContext(DataContext);
  console.log(currentTeam);

  const copyInviteLink = () => {
    navigator.clipboard.writeText(currentTeam.inviteLink);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-4 sm:inset-10 bg-[#171717] text-white rounded-lg shadow-xl flex overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 border-b border-[#2A2B2B]">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1 hover:bg-[#2A2B2B] rounded-md transition-colors"
          >
            <span>Close</span>
            <span className="px-1 py-0.5 text-xs bg-[#2A2B2B] rounded">
              Esc
            </span>
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-64 border-r border-[#2A2B2B] pt-14">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 mb-2">TEAM</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("team-members")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "team-members"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Team Members
                </button>
                <button
                  onClick={() => setActiveTab("plans")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "plans"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <Key className="w-4 h-4" />
                  Plans & Billing
                </button>
                <button
                  onClick={() => setActiveTab("custom-icons")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "custom-icons"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#2A2B2B] ml-auto">
                    UPGRADE
                  </span>
                  Custom Icons
                </button>
                <button
                  onClick={() => setActiveTab("github")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "github"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <Github className="w-4 h-4" />
                  GitHub Sync
                </button>
                <button
                  onClick={() => setActiveTab("api")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "api" ? "bg-[#2866DF]" : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#2A2B2B] ml-auto">
                    UPGRADE
                  </span>
                  API Tokens
                </button>
                <button
                  onClick={() => setActiveTab("team-settings")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "team-settings"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <Settings2 className="w-4 h-4" />
                  Team Settings
                </button>
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2">
                PERSONAL
              </h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "profile"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === "appearance"
                      ? "bg-[#2866DF]"
                      : "hover:bg-[#2A2B2B]"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Appearance
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1  pt-14 p-6 overflow-auto">
          {activeTab === "team-members" && (
            <>
              <p className="text-white mb-6  p-4 rounded-lg">
                Eraser is made for team collaboration. All team members see the
                same folders and files on their dashboard. Guests only have
                access to specific files.
              </p>
              <div className="flex gap-6">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <input
                      type="email"
                      placeholder="Invite via email address"
                      className="flex-1 px-4 py-2 bg-transparent rounded-md border border-[#4B4B4B] focus:outline-none focus:border-[#2866DF]"
                    />
                    <button className="px-4 py-2 bg-[#2866DF] rounded-md hover:bg-[#2355BE] transition-colors">
                      Invite
                    </button>
                  </div>

                  <div className="h-96  overflow-y-auto flex flex-col items-start justify-start gap-1">
                    {currentTeam.members.map((member) => {
                      return (
                        <div
                          className="flex items-center gap-4 px-4 w-full justify-between"
                          key={member._id}
                        >
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-8 h-8 overflow-hidden rounded-full">
                              <img
                                src={member.profilePicture}
                                alt="img"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold">
                                {member.name || "Unnamed User"}
                              </h4>
                              <h5 className="text-[0.66rem] font-light -mt-2">
                                {member.email || "No Email Provided"}
                              </h5>
                            </div>
                          </div>
                          {member._id === currentTeam.createdBy._id ? (
                            <span className="text-sm bg-[#2A2B2B] px-2 py-1 rounded">
                              Admin
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-[400px]">
                  <div className="bg-[#1D1D1D] rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Invite Link</span>
                        <Switch
                          checked={inviteLinkEnabled}
                          onChange={setInviteLinkEnabled}
                        />
                      </div>

                      {inviteLinkEnabled && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 bg-[#2A2B2B] p-2 rounded-md">
                            <span className="text-sm text-gray-400 truncate flex-1">
                              {currentTeam.inviteLink}
                            </span>
                            <button
                              onClick={copyInviteLink}
                              className="text-[#2866DF] hover:text-[#2355BE] flex items-center gap-1"
                            >
                              Copy link
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-400">
                      You are currently on the free plan. Your team has 1 member
                      —{" "}
                      <a
                        href="#"
                        className="text-[#2866DF] hover:text-[#2355BE]"
                      >
                        Manage plan
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "profile" && (
            <div className="max-w-2xl">
              <div className="flex items-start justify-between">
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      className="w-full px-4 py-2 bg-[#2A2B2B] rounded-md border border-[#4B4B4B] focus:outline-none focus:border-[#2866DF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">{data.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <span className="text-gray-400">Managed by Google</span>
                  </div>
                </div>

                <div className="ml-10 text-center">
                  <div className="w-32 h-32 bg-[#2866DF] overflow-hidden rounded-full flex items-center justify-center text-5xl font-semibold mb-4">
                    <img
                      src={data.profilePicture}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="px-4 py-2 bg-[#2A2B2B] rounded-md hover:bg-[#363636] transition-colors inline-flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
