import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Rapport',
    icon: 'flag',
    link: '/pages/info',
  },
  // {
  //   title: 'Factures',
  //   icon: 'file-text-outline',
  //   link: '/pages/factures',
  // },
  {
    title: 'Alarme',
    icon: 'bell',
    link: '/pages/alarm',
  },
  {
    title: 'Ajouter Appareil',
    icon: 'plus-circle',
    link: '/pages/ajout-appareil',
  },
  // {
  //   title: 'Configurer Appareil',
  //   icon: 'settings',
  //   link: '/pages/configuartion',
  // },
  {
    title: 'Historique',
    icon: 'archive',
    link: '/pages/historique',
  },
  {
    title: 'Log-out',
    icon: 'log-out',
  },
];
