export const ROLE_USER = [
  { name: "Jeune actif", value: "BUYER", color: "green" },
] as const;

export const ROLE_ADMIN = {
  name: "admin",
  value: "ADMIN",
  color: "blue",
};

export const ROLE_LIST = [ROLE_ADMIN, ...ROLE_USER] as const;
