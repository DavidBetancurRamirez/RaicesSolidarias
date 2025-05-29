import { createElement } from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { LandPlot, Truck } from 'lucide-react';

import DeliveryForm from '@components/deliveries/DeliveryForm';
import PageLayout from '@components/common/PageLayout';
import PlaceForm from '@components/places/PlaceForm';

const data = [
  {
    component: DeliveryForm,
    icon: Truck,
    label: 'Entregas',
    value: 'deliveries',
  },
  {
    component: PlaceForm,
    icon: LandPlot,
    label: 'Lugares',
    value: 'places',
  },
];

const Admin = () => {
  return (
    <PageLayout>
      <Tabs value="deliveries" className="bg-card dark:bg-dk_card rounded-lg">
        <TabsHeader
          className="bg-primary dark:bg-dk_primary"
          indicatorProps={{
            className: 'bg-accent dark:bg-dk_accent rounded-lg',
          }}
        >
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2 text-white">
                {createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody>
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              {createElement(component)}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </PageLayout>
  );
};

export default Admin;
