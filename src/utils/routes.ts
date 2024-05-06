export const ROUTES = {
  Dashboard: '/',
  Transfer: '/transfer',
  Loan: '/loan',
  Transactions: '/transaction-history',
  CreatedWallet: '/verify/wallet',
  AccountManagement: '/account-management',
  FundAccount: '/fund-account',
  logout: '/logout',
  login: '/auth/login',
  signup: '/auth/signup',
  'verify-email': '/verify-email',
  'forgot-password': '/auth/forgot-password',
};

export const ROUTES_WITHOUT_SIDEBAR = [ROUTES.CreatedWallet];

export const DASHBOARD_ROUTES = [
  ROUTES.AccountManagement,
  ROUTES.FundAccount,
  ROUTES.Loan,
  ROUTES.Transactions,
  ROUTES.Transfer,
];
