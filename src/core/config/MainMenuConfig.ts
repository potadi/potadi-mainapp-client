export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "home",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    pages: [
      {
        heading: "diagnose",
        route: "/diagnose",
        keenthemesIcon: "rocket",
        bootstrapIcon: "bi-rocket-takeoff",
      },
    ],
  },
  {
    pages: [
      {
        heading: "history",
        route: "/history",
        keenthemesIcon: "archive",
        bootstrapIcon: "bi-archive",
      },
    ],
  },
];

export default MainMenuConfig;
