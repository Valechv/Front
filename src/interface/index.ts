import type { LazyExoticComponent, ReactElement } from "react";

export interface Paths {
  to: string;
  path: string;
  name: string;
  render: boolean;
  component: LazyExoticComponent<() => ReactElement>;
  // icon: IconName
}

export interface SidebarLinkType {
  to: string;
  name: string;
  subMenu: { value: boolean; paths: Paths[] };
  // icon: IconName
}

export interface Route extends SidebarLinkType {
  path: string;
  component: LazyExoticComponent<() => ReactElement>;
}

export interface ToggleProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

// -----------------

export interface Note {
  id: null | string | number | undefined;
  user: User;
  userIdTransient: null | string | number | undefined;
  category: string;
  title: string;
  description: string;
  file: string;
  notifications: null[];
}

export interface User {
  id: null | string | number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

export interface Authority {
  authority: string;
}
