import React from 'react';

export default function NoTransactions() {
  return (
    <div className="relative flex max-h-96 min-h-80 items-center justify-center rounded-xl bg-white p-6">
      <h1 className="absolute left-5 top-5 text-xl font-bold">Loan Activity</h1>

      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <h1 className="font-bold">No recent activity</h1>
        <p className="text-grey-900">You currently have no pending transactions</p>
      </div>
    </div>
  );
}
