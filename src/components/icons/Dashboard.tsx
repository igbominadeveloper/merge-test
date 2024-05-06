import * as React from 'react';
import { memo } from 'react';

interface DashboardProps {
  className?: string;
}

function DashboardComponent({ className }: DashboardProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
      <path
        className={`'w-20 h-20' ${className}`}
        d="M21.18 16.97c-.283.655-.957 1.03-1.671 1.03h-4.694a3.088 3.088 0 0 0-.594-3.104c.244-1.987.397-4.023.49-5.63.046-.799-.931-1.065-1.284-.35a89.527 89.527 0 0 0-2.343 5.125 3.027 3.027 0 0 0-1.981 2.117A3.088 3.088 0 0 0 9.185 18H4.49c-.714 0-1.388-.375-1.672-1.03A9.966 9.966 0 0 1 2 13C2 7.477 6.477 3 12 3s10 4.477 10 10c0 1.41-.292 2.753-.82 3.97Z"
        opacity={0.32}
      />
      <path
        className={`'w-20 h-20' ${className}`}
        d="M14.71 9.265c.047-.798-.93-1.064-1.283-.35a89.527 89.527 0 0 0-2.343 5.126 3.027 3.027 0 0 0-1.981 2.117c-.429 1.628.52 3.301 2.12 3.737 1.6.436 3.245-.53 3.674-2.158a3.088 3.088 0 0 0-.676-2.84c.244-1.988.397-4.024.49-5.632Z"
      />
    </svg>
  );
}
const Dashboard = memo(DashboardComponent);
export default Dashboard;
