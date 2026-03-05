import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(user);

  useEffect(() => {
    setNewName(user);
  }, [user]);

  /* Close dropdown only if click is outside profile-menu */

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setOpen(false);
        setEditMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogo = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          className="text-xl font-bold flex items-center gap-2 cursor-pointer"
          onClick={handleLogo}
        >
          🎬 MovieFinder
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 transition ${
                isActive
                  ? "border-b-2 border-current text-base font-semibold"
                  : "hover:opacity-70"
              }`
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `pb-1 transition ${
                isActive
                  ? "border-b-2 border-current text-base font-semibold"
                  : "hover:opacity-70"
              }`
            }
          >
            Watchlist
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Profile Dropdown (Desktop Only) */}
          <div className="relative profile-menu hidden md:block">
            {/* Profile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition cursor-pointer"
            >
              <FaUserCircle size={20} />
              {user}
              <FaChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className={`absolute right-0 top-12 w-52 rounded-lg shadow-lg border p-2
              ${
                theme === "dark"
                  ? "bg-[#111827] border-gray-700 text-gray-200"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
              >
                {/* User Info */}
                <div className="px-3 py-2 border-b border-gray-200">
                  {!editMode ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaUserCircle />
                        <span className="text-sm font-medium">{user}</span>
                      </div>

                      <button
                        onClick={() => setEditMode(true)}
                        className="text-sm rounded border px-2 py-1 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (!newName.trim()) return;
                            dispatch(updateUser(newName));
                            setEditMode(false);
                          }
                        }}
                        className="w-full border rounded px-2 py-1 text-sm"
                      />

                      <button
                        onClick={() => {
                          if (!newName.trim()) return;
                          dispatch(updateUser(newName));
                          setEditMode(false);
                        }}
                        className="w-full text-sm bg-blue-500 text-white py-1 rounded cursor-pointer"
                      >
                        Save Name
                      </button>
                    </div>
                  )}
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 cursor-pointer text-sm rounded hover:bg-gray-400 hover:text-gray-800"
                >
                  {theme === "dark" ? <FaSun /> : <FaMoon />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    dispatch(logout());
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 cursor-pointer text-sm rounded hover:bg-red-50 text-red-500"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-4">
          {/* User Section */}
          <div className="flex items-center gap-2 border-b pb-3">
            <FaUserCircle size={20} />
            <span className="font-medium">{user}</span>
          </div>

          {/* Update Name */}
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="block w-full text-left hover:text-blue-900 cursor-pointer"
            >
              Update Profile
            </button>
          ) : (
            <div className="space-y-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />

              <button
                onClick={() => {
                  if (!newName.trim()) return;
                  dispatch(updateUser(newName));
                  setEditMode(false);
                }}
                className="w-full bg-blue-500 text-white py-1 rounded cursor-pointer"
              >
                Save Name
              </button>
            </div>
          )}

          {/* Navigation */}
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block">
            Search
          </NavLink>

          <NavLink
            to="/watchlist"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Watchlist
          </NavLink>

          {/* Theme */}
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
            Toggle Theme
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              dispatch(logout());
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-red-500 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}{" "}
    </header>
  );
};

export default Header;
