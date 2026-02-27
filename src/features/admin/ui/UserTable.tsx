'use client';
import React from 'react';

interface UserTableProps {
  users?: any[];
  [key: string]: any;
}

export function UserTable({ users = [], ...props }: UserTableProps) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl border border-[var(--staff-border)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--staff-border)]">
            <th className="text-left p-3 text-[var(--staff-muted)] font-bold text-xs uppercase">Name</th>
            <th className="text-left p-3 text-[var(--staff-muted)] font-bold text-xs uppercase">Email</th>
            <th className="text-left p-3 text-[var(--staff-muted)] font-bold text-xs uppercase">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-8 text-center text-[var(--staff-muted)]">No users found</td>
            </tr>
          ) : (
            users.map((user: any, i: number) => (
              <tr key={i} className="border-b border-[var(--staff-border)]">
                <td className="p-3 text-[var(--staff-text)]">{user.name || 'N/A'}</td>
                <td className="p-3 text-[var(--staff-text)]">{user.email}</td>
                <td className="p-3 text-[var(--staff-text)]">{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
