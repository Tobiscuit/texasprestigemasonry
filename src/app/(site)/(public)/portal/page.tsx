import { headers } from 'next/headers';
import { PortalHeader } from '@/features/portal/PortalHeader';
import { ActiveRequestList } from '@/features/portal/ActiveRequestList';
import { ServiceHistory } from '@/features/portal/ServiceHistory';
import { AccountSidebar } from '@/features/portal/AccountSidebar';
import { getSessionSafe } from '@/lib/get-session-safe';

export const dynamic = 'force-dynamic';

export default async function PortalDashboard() {
  const headerList = await headers();
  const session = await getSessionSafe(headerList);

  if (!session) return null; // Handled by layout/middleware

  const user = session.user;

  // Mock Data
  const customer: any = {
    name: user.name || 'Valued Client',
    email: user.email,
    phone: '',
    companyName: user.name || '',
    customerType: 'standard',
  };
  const isBuilder = false;
  
  const activeMapped: any[] = [];
  const pastMapped: any[] = [];

  return (
    <div className="space-y-8">
      <PortalHeader customerName={customer.companyName || customer.name || ''} isBuilder={isBuilder} />
      
      {isBuilder && (
         <div className="bg-midnight-slate/10 border border-midnight-slate/20 rounded-xl p-4 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="bg-midnight-slate text-white p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-midnight-slate">Builder Account</h3>
                    <p className="text-sm text-gray-600">You have access to multi-site management features.</p>
                </div>
            </div>
            {/* Future: Add "Add Job Site" button */}
         </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <ActiveRequestList requests={activeMapped as any} />
          <ServiceHistory requests={pastMapped as any} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <AccountSidebar customer={{
            name: customer.name || '',
            email: user.email || '',
            phone: customer.phone || '',
          }} />
        </div>
      </div>
    </div>
  );
}
