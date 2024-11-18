export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'inventory',
        title: 'Inventory',
        type: 'item',
        classes: 'nav-item',
        url: '/inventory',
        icon: 'inbox',
        breadcrumbs: false
      },
      {
        id: 'reports',
        title: 'Reports',
        type: 'item',
        classes: 'nav-item',
        url: '/reports',
        icon: 'bar-chart',
        breadcrumbs: false
      },
      {
        id: 'suppliers',
        title: 'Suppliers',
        type: 'item',
        classes: 'nav-item',
        url: '/suppliers',
        icon: 'team',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        classes: 'nav-item',
        url: '/orders',
        icon: 'shopping-cart',

        breadcrumbs: false
      },
      {
        id: 'manage-store',
        title: 'Manage Store',
        type: 'item',
        classes: 'nav-item',
        url: '/manage-store',
        icon: 'manage',
       
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Log Out',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      }
    ]
  }
];
