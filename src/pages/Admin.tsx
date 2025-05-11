import React from 'react';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { LandPlot, Truck } from 'lucide-react';
import PageLayout from '@components/PageLayout';

const data = [
  {
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people
    who are like offended by it, it doesn't matter.`,
    icon: Truck,
    label: 'Entregas',
    value: 'deliveries',
  },
  {
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
    icon: LandPlot,
    label: 'Lugares',
    value: 'places',
  },
];

const Admin = () => {
  return (
    <PageLayout>
      <Tabs value="deliveries">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </PageLayout>
  );
};

export default Admin;
