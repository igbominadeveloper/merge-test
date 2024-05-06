import { Dashboard, Admin, Dollars, Transfer, Transactions } from '@/components/icons';
import FundAcct from '@/components/icons/FundAcct';
import { ISidebarItems } from '@/types/sidebar';
import { ROUTES } from '@/utils/routes';

const sidebarItems: ISidebarItems[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: ROUTES.Dashboard,
    icon: <Dashboard />,
  },
  {
    id: 2,
    name: 'Transfer',
    path: ROUTES.Transfer,
    icon: <Transfer />,
  },
  {
    id: 3,
    name: 'Fund Account',
    path: ROUTES.FundAccount,
    icon: <FundAcct />,
  },
  {
    id: 4,
    name: 'Loan',
    path: ROUTES.Loan,
    icon: <Dollars />,
  },
  {
    id: 5,
    name: 'Transactions history',
    path: ROUTES.Transactions,
    icon: <Transactions />,
  },
  {
    id: 6,
    name: 'Account management',
    path: ROUTES.AccountManagement,
    icon: <Admin />,
  },
];

export default sidebarItems;
