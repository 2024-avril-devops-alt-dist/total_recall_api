const generateNavItem = (label: string, href: string, icon?: string) => {
  return {
    label,
    href,
    icon,
  };
};

export const NAVBAR = [
  generateNavItem("Accueil", "/"),
  generateNavItem("About", "/about"),
];

export const NAVBAR_USER = [generateNavItem("Accueil", "/")];

export const getNavbar = (role: string | null) => {
  return NAVBAR;
};

export const getNavBarMenu = (role: string | null) => {
  return NAVBAR_USER;
};
