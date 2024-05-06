import * as React from 'react';
import { memo } from 'react';

interface AdminProps {
  className?: string;
}
function AdminComponent({ className }: AdminProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path
        className={`'w-20 h-20' ${className}`}
        d="M2.281 19.657c.089.86.652 1.539 1.496 1.718C5.109 21.66 7.622 22 12 22s6.89-.34 8.223-.625c.844-.18 1.407-.859 1.496-1.718.131-1.273.281-3.61.281-7.657 0-4.047-.15-6.384-.281-7.657-.089-.86-.652-1.539-1.496-1.718C18.891 2.34 16.378 2 12 2s-6.89.34-8.223.625c-.844.18-1.407.859-1.496 1.718C2.15 5.616 2 7.953 2 12c0 4.047.15 6.384.281 7.657Z"
        opacity={0.32}
      />
      <path
        className={`'w-20 h-20' ${className}`}
        d="M13.938 13.856A4.166 4.166 0 0 0 12 6a4.167 4.167 0 0 0-1.939 7.856c-1.774.676-3.129 2.253-3.548 4.197-.059.269.09.545.36.594.973.176 2.583.353 5.128.353 2.544 0 4.154-.177 5.127-.353.27-.049.417-.324.36-.592-.42-1.945-1.775-3.523-3.55-4.2Z"
      />
    </svg>
  );
}
const Admin = memo(AdminComponent);
export default Admin;
