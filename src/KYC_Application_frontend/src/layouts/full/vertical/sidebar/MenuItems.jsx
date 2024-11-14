import {
  IconPoint,
  IconChartLine,
  IconUser,
  IconAperture,
  IconHelp,
  IconWallet,
  IconUsers,
  IconAddressBook,
  IconMessageCircle,
  IconExternalLink,
  IconHeadset,
  IconShoppingCart,
  IconCode,
  IconSettings,
  IconChartInfographic,
  IconArrowsShuffle,
  IconBriefcase,
  IconUserPlus,
  IconFolder,
  IconSettingsAutomation,
  IconCircleCaretDown,
  IconShieldCheck,
  IconRefresh,
  IconShoppingBag
} from '@tabler/icons';

import { uniqueId } from 'lodash';


const Menuitems = [

  {
    id: uniqueId(),
    title: 'Admin',
    icon: IconUser,
    href: '/Admin',
    children: [
      {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconUsers,
        href: '/pages/admin-dashboard',
        children: [
          {
            id: uniqueId(),
            title: 'Overview',
            icon: IconUser,
            href: '/pages/admin-dashboard',
          },
          {
            id: uniqueId(),
            title: 'Transection Rules',
            icon: IconUser,
            href: '/pages/admin-localization',
          },
          {
            id: uniqueId(),
            title: 'Fees',
            icon: IconUser,
            href: '/pages/admin-fees',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Admin Settings',
        icon: IconArrowsShuffle,
        href: '/admin-setting',
        children: [
        ],
      },

      {
        id: uniqueId(),
        title: 'DAO',
        icon: IconChartInfographic,
        href: '/dao',
        children: [
        ],
      },
      {
        id: uniqueId(),
        title: 'Partner Settings',
        icon: IconSettings,
        href: '/partner-setting',
        children: [
        ],
      },
      {
        id: uniqueId(),
        title: 'Marketplace Settings',
        icon: IconShoppingCart,
        href: '/marketplace-setting',
        children: [
        ],
      },
      {
        id: uniqueId(),
        title: 'Developer Info',
        icon: IconCode,
        href: '/developer-info',
        children: [
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Management',
    icon: IconSettingsAutomation,
    href: '/apps/tickets',
    children: [
      {
        id: uniqueId(),
        title: 'Operator',
        icon: IconShieldCheck,
        href: '/pages/operator-dashboard'
      },
      {
        id: uniqueId(),
        title: 'AML',
        icon: IconShieldCheck,
        href: '/apps/tickets'
      },
      {
        id: uniqueId(),
        title: 'AML Setting',
        icon: IconUserPlus,
        href: '/apps/aml-setting',

      },
      {
        id: uniqueId(),
        title: 'Product and Services',
        icon: IconFolder,
        href: '/product-services',

      },
      {
        id: uniqueId(),
        title: 'Assets',
        icon: IconRefresh,
        href: '/assets',
      },
      {
        id: uniqueId(),
        title: 'Fee and Payments',
        icon: IconShoppingBag,
        href: '/fee-payments',
        children: [
        ],
      },
      {
        id: uniqueId(),
        title: 'PartnerShip Program',
        icon: IconBriefcase,
        href: '/partnership-program',
        children: [
        ],
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/dashboards/ecommerce',
  },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: IconUser,
    href: '/user-profile',
  },
  {
    id: uniqueId(),
    title: 'Personal Account',
    icon: IconWallet,
    href: '/app/user-accounts',
  },
  {
    id: uniqueId(),
    title: 'My Groups',
    icon: IconUsers,
    href: '/apps/gallery',
  },
  {
    id: uniqueId(),
    title: 'Investing',
    icon: IconChartLine,
    href: '/apps/investing',
  },
  {
    id: uniqueId(),
    title: 'Contacts',
    icon: IconAddressBook,
    href: '/apps/contacts',
  },
  {
    id: uniqueId(),
    title: 'Chats',
    icon: IconMessageCircle,
    href: '/apps/chats',
  },
  {
    navlabel: true,
    subheader: 'Support',
  },
  {
    id: uniqueId(),
    title: 'About Us',
    icon: IconExternalLink,
    href: '/about-us',
  },
  {
    id: uniqueId(),
    title: 'FAQ',
    icon: IconHelp,
    href: '/pages/faq',
  },
  {
    id: uniqueId(),
    title: 'Customer Support',
    icon: IconHeadset,
    href: '/customer-support',
  },
];

export default Menuitems;
