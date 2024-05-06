import { baseUrl } from '.';

const LoanRoutes = {
  productTypes: `${baseUrl}/loans/product-types`,
  apply: `${baseUrl}/loans/apply`,
  loanHistory: `${baseUrl}/loans`,
  loanDetails: (id: string) => `${baseUrl}/loans/${id}`,
};

export default LoanRoutes;
