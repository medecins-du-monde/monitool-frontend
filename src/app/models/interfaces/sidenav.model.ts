interface SidenavItem {
    name: string;
    icon: string;
    routerLink?: string;
    // External link opened in a new tab; its name is displayed as is, without translation
    href?: string;
}

interface SidenavGroup {
    title: string;
    items: SidenavItem[];
    collapsible: boolean;
    emptyMessage?: string;
}

export interface Sidenav {
    groups: SidenavGroup[];
}

