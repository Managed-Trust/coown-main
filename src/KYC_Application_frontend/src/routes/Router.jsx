import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable.jsx';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout.jsx')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout.jsx')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern.jsx')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce.jsx')));

/* ****Apps***** */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat.jsx')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes.jsx')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar.jsx')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email.jsx')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog.jsx')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogPost.jsx')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets.jsx')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts.jsx')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce.jsx')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail.jsx')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList.jsx')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceCheckout.jsx')),
);
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile.jsx')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers.jsx')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends.jsx')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery.jsx')));

// Pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL.jsx')));
const Treeview = Loadable(lazy(() => import('../views/pages/treeview/Treeview.jsx')));
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing.jsx')));
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting.jsx')),
);
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq.jsx')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards.jsx')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners.jsx')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts.jsx')));

// form elements
const MuiAutoComplete = Loadable(
  lazy(() => import('../views/forms/form-elements/MuiAutoComplete.jsx')),
);
const MuiButton = Loadable(lazy(() => import('../views/forms/form-elements/MuiButton.jsx')));
const MuiCheckbox = Loadable(lazy(() => import('../views/forms/form-elements/MuiCheckbox.jsx')));
const MuiRadio = Loadable(lazy(() => import('../views/forms/form-elements/MuiRadio.jsx')));
const MuiSlider = Loadable(lazy(() => import('../views/forms/form-elements/MuiSlider.jsx')));
const MuiDateTime = Loadable(lazy(() => import('../views/forms/form-elements/MuiDateTime.jsx')));
const MuiSwitch = Loadable(lazy(() => import('../views/forms/form-elements/MuiSwitch.jsx')));

// form layout
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts.jsx')));
const FormCustom = Loadable(lazy(() => import('../views/forms/FormCustom.jsx')));
const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard.jsx')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation.jsx')));
const QuillEditor = Loadable(lazy(() => import('../views/forms/quill-editor/QuillEditor.jsx')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal.jsx')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical.jsx')));

// tables
const BasicTable = Loadable(lazy(() => import('../views/tables/BasicTable.jsx')));
const CollapsibleTable = Loadable(lazy(() => import('../views/tables/CollapsibleTable.jsx')));
const EnhancedTable = Loadable(lazy(() => import('../views/tables/EnhancedTable.jsx')));
const FixedHeaderTable = Loadable(lazy(() => import('../views/tables/FixedHeaderTable.jsx')));
const PaginationTable = Loadable(lazy(() => import('../views/tables/PaginationTable.jsx')));
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable.jsx')));

// chart
const LineChart = Loadable(lazy(() => import('../views/charts/LineChart.jsx')));
const GredientChart = Loadable(lazy(() => import('../views/charts/GredientChart.jsx')));
const DoughnutChart = Loadable(lazy(() => import('../views/charts/DoughnutChart.jsx')));
const AreaChart = Loadable(lazy(() => import('../views/charts/AreaChart.jsx')));
const ColumnChart = Loadable(lazy(() => import('../views/charts/ColumnChart.jsx')));
const CandlestickChart = Loadable(lazy(() => import('../views/charts/CandlestickChart.jsx')));
const RadialbarChart = Loadable(lazy(() => import('../views/charts/RadialbarChart.jsx')));

// ui
const MuiAlert = Loadable(lazy(() => import('../views/ui-components/MuiAlert.jsx')));
const MuiAccordion = Loadable(lazy(() => import('../views/ui-components/MuiAccordion.jsx')));
const MuiAvatar = Loadable(lazy(() => import('../views/ui-components/MuiAvatar.jsx')));
const MuiChip = Loadable(lazy(() => import('../views/ui-components/MuiChip.jsx')));
const MuiDialog = Loadable(lazy(() => import('../views/ui-components/MuiDialog.jsx')));
const MuiList = Loadable(lazy(() => import('../views/ui-components/MuiList.jsx')));
const MuiPopover = Loadable(lazy(() => import('../views/ui-components/MuiPopover.jsx')));
const MuiRating = Loadable(lazy(() => import('../views/ui-components/MuiRating.jsx')));
const MuiTabs = Loadable(lazy(() => import('../views/ui-components/MuiTabs.jsx')));
const MuiTooltip = Loadable(lazy(() => import('../views/ui-components/MuiTooltip.jsx')));
const MuiTransferList = Loadable(lazy(() => import('../views/ui-components/MuiTransferList.jsx')));
const MuiTypography = Loadable(lazy(() => import('../views/ui-components/MuiTypography.jsx')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login.jsx')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2.jsx')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register.jsx')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2.jsx')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword.jsx')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2.jsx')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps.jsx')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2.jsx')));
const Error = Loadable(lazy(() => import('../views/authentication/Error.jsx')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance.jsx')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage.jsx')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboards/modern" /> },
      { path: '/dashboards/modern', exact: true, element: <ModernDash /> },
      { path: '/dashboards/ecommerce', exact: true, element: <EcommerceDash /> },
      { path: '/apps/chats', element: <Chats /> },
      { path: '/apps/notes', element: <Notes /> },
      { path: '/apps/calendar', element: <Calendar /> },
      { path: '/apps/email', element: <Email /> },
      { path: '/apps/tickets', element: <Tickets /> },
      { path: '/apps/contacts', element: <Contacts /> },
      { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
      { path: '/apps/blog/posts', element: <Blog /> },
      { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
      { path: '/apps/ecommerce/eco-product-list', element: <EcomProductList /> },
      { path: '/apps/ecommerce/eco-checkout', element: <EcomProductCheckout /> },
      { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },
      { path: '/apps/followers', element: <Followers /> },
      { path: '/apps/friends', element: <Friends /> },
      { path: '/apps/gallery', element: <Gallery /> },
      { path: '/user-profile', element: <UserProfile /> },
      { path: '/pages/casl', element: <RollbaseCASL /> },
      { path: '/pages/treeview', element: <Treeview /> },
      { path: '/pages/pricing', element: <Pricing /> },
      { path: '/pages/account-settings', element: <AccountSetting /> },
      { path: '/pages/faq', element: <Faq /> },
      { path: '/forms/form-elements/autocomplete', element: <MuiAutoComplete /> },
      { path: '/forms/form-elements/button', element: <MuiButton /> },
      { path: '/forms/form-elements/checkbox', element: <MuiCheckbox /> },
      { path: '/forms/form-elements/radio', element: <MuiRadio /> },
      { path: '/forms/form-elements/slider', element: <MuiSlider /> },
      { path: '/forms/form-elements/date-time', element: <MuiDateTime /> },
      { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
      { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
      { path: '/forms/quill-editor', element: <QuillEditor /> },
      { path: '/forms/form-layouts', element: <FormLayouts /> },
      { path: '/forms/form-horizontal', element: <FormHorizontal /> },
      { path: '/forms/form-vertical', element: <FormVertical /> },
      { path: '/forms/form-custom', element: <FormCustom /> },
      { path: '/forms/form-wizard', element: <FormWizard /> },
      { path: '/forms/form-validation', element: <FormValidation /> },
      { path: '/tables/basic', element: <BasicTable /> },
      { path: '/tables/collapsible', element: <CollapsibleTable /> },
      { path: '/tables/enhanced', element: <EnhancedTable /> },
      { path: '/tables/fixed-header', element: <FixedHeaderTable /> },
      { path: '/tables/pagination', element: <PaginationTable /> },
      { path: '/tables/search', element: <SearchTable /> },
      { path: '/charts/line-chart', element: <LineChart /> },
      { path: '/charts/gredient-chart', element: <GredientChart /> },
      { path: '/charts/doughnut-pie-chart', element: <DoughnutChart /> },
      { path: '/charts/area-chart', element: <AreaChart /> },
      { path: '/charts/column-chart', element: <ColumnChart /> },
      { path: '/charts/candlestick-chart', element: <CandlestickChart /> },
      { path: '/charts/radialbar-chart', element: <RadialbarChart /> },
      { path: '/ui-components/alert', element: <MuiAlert /> },
      { path: '/ui-components/accordion', element: <MuiAccordion /> },
      { path: '/ui-components/avatar', element: <MuiAvatar /> },
      { path: '/ui-components/chip', element: <MuiChip /> },
      { path: '/ui-components/dialog', element: <MuiDialog /> },
      { path: '/ui-components/list', element: <MuiList /> },
      { path: '/ui-components/popover', element: <MuiPopover /> },
      { path: '/ui-components/rating', element: <MuiRating /> },
      { path: '/ui-components/tabs', element: <MuiTabs /> },
      { path: '/ui-components/tooltip', element: <MuiTooltip /> },
      { path: '/ui-components/transfer-list', element: <MuiTransferList /> },
      { path: '/ui-components/typography', element: <MuiTypography /> },
      { path: '/widgets/cards', element: <WidgetCards /> },
      { path: '/widgets/banners', element: <WidgetBanners /> },
      { path: '/widgets/charts', element: <WidgetCharts /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
