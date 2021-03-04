interface SidenavItem {
    name: string;
    icon: string;
    routerLink: string;
    disable: boolean;
}

interface SidenavGroup {
    title: string;
    items: SidenavItem[];
    collapsible: boolean;
    disable: boolean;
}

export interface Sidenav {
    groups: SidenavGroup[];
}

