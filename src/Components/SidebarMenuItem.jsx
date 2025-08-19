import { BsBriefcaseFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillFolderOpen } from "react-icons/ai";
import { RiLayoutMasonryFill } from "react-icons/ri";


export const SidebarMenuItem = () => [
  // {
  //   id: 0,
  //   label: "Dashboard",
  //   icon: <RiLayoutMasonryFill />,
  //   path: "dashboard",
  // },
  {
    id: 1,
    label: "Applications",
    icon: <AiFillFolderOpen />,
    path: "applications",
  },
  {
    id: 2,
    label: "Job search",
    icon: <BsBriefcaseFill />,
    path: "job",
  },
  {
    id: 3,
    label: "Profile",
    icon: <BsFillPersonFill />,
    path: "profile",
  },
  {
    id: 4,
    label: "AI Resume Builder",
    icon: <BsFillPersonFill />,
    path: "AI Resume Builder",
  },
  {
    id: 5,
    label: "Resume Checker",
    icon: <BsFillPersonFill />,
    path: "Resume Checker",
  },
];

