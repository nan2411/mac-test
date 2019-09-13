import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import Courses from "../views/Courses";
import Diary from "../views/Diary";
import Achievements from "../views/Achievements";
import _Settings from "../views/Settings";

import {
    Dashboard,

    Settings,
    School,Book,FolderSpecial
} from "@material-ui/icons";

const appRoutes = (names) => [
    {
        path: "/home",
        sidebarName: "Home",
        navbarName: "Dashboard",
        icon: Dashboard,
        component: DashboardPage
    },
    {
        path: "/cursos",
        sidebarName: names.courses,
        navbarName: names.courses,
        icon: School,
        component: Courses
    },
    {
        path: "/curso/:slug",
        visible:false,
    },
    {
        path: "/perfil",
        navbarName: names.profile,
        visible:false,
    },
    {
        path: "/curso/:course/leccion/:lesson",
        visible:false,
    },
    {
        path: "/logros",
        visible:false,
        sidebarName: names.achievements,
        navbarName: names.achievements,
        icon: FolderSpecial,
        component: Achievements
    },
    {
        path: "/diario",
        sidebarName: names.diary,
        navbarName: names.diary,
        icon: Book,
        component: Diary
    },
    /*{
        path: "/ajustes",
        sidebarName: names.settings,
        navbarName: names.settings,
        icon: Settings,
        component: _Settings
    },*/

  { redirect: true, path: "/*", to: "/login", navbarName: "Redirect" }
];

export default appRoutes;
