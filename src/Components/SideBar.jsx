import { useState, useEffect } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp, IoMdSettings } from "react-icons/io";
import { LiaWindowMinimize } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {

  //bottom dropdown
  const dropdownMenu = [
    {
      id: 0,
      label: "Settings",
      icon: <IoMdSettings />,
      path: "settings",
    },
    {
      id: 1,
      label: "Log Out",
      icon: <MdOutlineLogout />,
      path: "/login",
    },
  ];

  //usestates
  const menuItems = SidebarMenuItem();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();

  // toggle functions
  const toggleMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // find page title function
  const findPageTitle = () => {
    const currentItem = menuItems.find((item) =>
      location.pathname.endsWith(item.path)
    );
    const currentDropdownItem = dropdownMenu.find((item) =>
      location.pathname.endsWith(item.path)
    );
    if (currentItem) {
      setPageTitle(currentItem.label);
    } else if (currentDropdownItem) {
      setPageTitle(currentDropdownItem.label);
    } else {
      setPageTitle("");
    }
  };

  useEffect(() => {
    findPageTitle();
  }, [location.pathname, menuItems]);

  return (
    <div>
      <nav
        className={`px-5 py-2.5 fixed left-2 top-2 rounded-full z-50 w-56 lg:hidden bg-[#19211D] text-white ${
          openSidebar ? "hidden" : "translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-sm">{pageTitle}</h3>
          <button
            className="text-xl lg:hidden"
            title="Expand Sidebar"
            onClick={toggleMenu}
          >
            <LiaWindowMinimize className="rotate-90" />
          </button>
        </div>
      </nav>
      <div
        className={`fixed top-2 left-2 bottom-2 rounded-[28px] z-40 w-56 py-4 lg:py-6 transition-transform ${
          openSidebar ? "translate-x-0" : "hidden lg:block"
        } bg-[#19211D] lg:translate-x-0`}
      >
        <div className="rounded-[20px] overflow-y-auto px-4 bg-[#19211D] text-white h-full">
          <div className="flex items-center justify-between pl-6">
            <p className="text-sm">Job Tracker</p>
            <button
              className="text-xl lg:hidden"
              title="Minimize Sidebar"
              onClick={toggleMenu}
            >
              <LiaWindowMinimize className="rotate-90" />
            </button>
          </div>

          {/* Top sidebar items */}
          <ul className="space-y-4 mt-6">
            {menuItems.map((item) => (
              <li key={item.id} onClick={toggleMenu}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 py-2 pl-5 rounded-full cursor-pointer hover:bg-[#E0E1E0] hover:text-primary-text transition-colors duration-300"
                >
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="">{item.label}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </div>
          {/* Bottom sidebar items */}
        <div className="absolute bottom-0 p-6 left-0">
          {dropdownVisible && (
            <div className="my-4 rounded shadow-sm absolute bottom-14 bg-[#19211D] w-44 lg:hidden">
              <ul className="py-3 text-white space-y-2">
                {dropdownMenu.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 py-2 pl-5 rounded-full cursor-pointer hover:bg-[#E0E1E0] hover:text-primary-text transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    <span>{item.icon}</span>
                    <Link to={item.path} className="text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="my-4 rounded shadow-sm absolute bottom-1 bg-[#19211D] w-44 hidden lg:block">
            <ul className="py-3 text-white space-y-2">
              {dropdownMenu.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 py-2 pl-5 rounded-full cursor-pointer hover:bg-[#E0E1E0] hover:text-primary-text transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  <span>{item.icon}</span>
                  <Link to={item.path} className="text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex items-center gap-28 hover:cursor-pointer lg:hidden"
            onClick={toggleDropdown}
          >
            <span className="bg-green-light text-green rounded-full p-2 text-sm">
              BA
            </span>
            <span
              className={`transition-transform duration-300 text-white ${
                dropdownVisible ? "rotate-180" : "rotate-0"
              }`}
            >
              {dropdownVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
