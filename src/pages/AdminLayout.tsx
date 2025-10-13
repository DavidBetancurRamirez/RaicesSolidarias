import { LandPlot, Truck } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

import PageLayout from '@components/layout/PageLayout';

const tabs = [
  {
    icon: Truck,
    label: 'Entregas',
    value: 'entregas',
  },
  {
    icon: LandPlot,
    label: 'Lugares',
    value: 'lugares',
  },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const activeTab =
    tabs.find((tab) => pathname.includes(tab.value))?.value || 'entregas';

  return (
    <PageLayout useGap={false}>
      <Tabs className="bg-card dark:bg-dk_card rounded-t-lg" value={activeTab}>
        <TabsHeader
          className="bg-primary dark:bg-dk_primary"
          indicatorProps={{
            className: 'bg-accent dark:bg-dk_accent rounded-lg',
          }}
        >
          {tabs.map(({ label, value, icon: Icon }) => (
            <NavLink className="w-full" key={value} to={`/admin/${value}`}>
              <Tab value={value}>
                <div className="flex items-center gap-2 text-white">
                  <Icon className="w-5 h-5" />
                  {label}
                </div>
              </Tab>
            </NavLink>
          ))}
        </TabsHeader>
      </Tabs>

      <div className="bg-card dark:bg-dk_card rounded-b-lg p-4">
        <Outlet />
      </div>
    </PageLayout>
  );
};

export default AdminLayout;
