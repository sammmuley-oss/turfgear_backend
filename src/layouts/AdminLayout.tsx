import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { NotificationToasts } from '../components/NotificationToasts';
import { SidebarProvider } from '../context/SidebarContext';
import { NotificationProvider } from '../context/NotificationContext';

function LayoutInner() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0c]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="page-enter max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <NotificationToasts />
    </div>
  );
}

export default function AdminLayout() {
  return (
    <NotificationProvider>
      <SidebarProvider>
        <LayoutInner />
      </SidebarProvider>
    </NotificationProvider>
  );
}
