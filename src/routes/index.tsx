import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import {
  DashboardPage,
  CitiesPage,
  MachinesPage,
  InventoryPage,
  RevenuePage,
  TurfStatusPage,
  AlertsPage,
  SettingsPage,
} from '../pages';
import MachineDetailsPage from '../pages/MachineDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'cities', element: <CitiesPage /> },
      { path: 'machines', element: <MachinesPage /> },
      { path: 'machines/:machineId', element: <MachineDetailsPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'revenue', element: <RevenuePage /> },
      { path: 'turf-status', element: <TurfStatusPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

export default router;
