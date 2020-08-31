interface SidenavItem {
    name: string;
    icon: string;
    routerLink: string;
}

interface SidenavGroup {
    title: string;
    items: SidenavItem[];
    collapsible: boolean;
}

export interface Sidenav {
    groups: SidenavGroup[];
}

