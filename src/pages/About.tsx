import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import aboutUsImage from '@/assets/images/about_us_primary.jpg';

import CarouselContainer from '@components/common/CarouselContainer';
import DeliveryCircle from '@components/deliveries/DeliveryCircle';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/layout/PageLayout';
import SafeMedia from '@components/common/SafeMedia';

import api from '@/config/api';

import { Delivery, ResponseData } from '@/constants/interfaces';

import { API_ROUTES } from '@utils/routes';

const About = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = (await api.get(API_ROUTES.delivery)) as ResponseData<
        Delivery[]
      >;

      if (response.statusCode !== 200) {
        console.error('Error fetching deliveries:', response);
        return;
      }

      setDeliveries(response.data);
    };

    fetchDeliveries();
  }, []);

  return (
    <PageLayout>
      <div className="py-2 bg-accent dark:bg-dk_accent rounded-md text-center">
        <Typography
          variant="h2"
          className="text-background dark:text-dk_background"
        >
          Raices Solidarias
        </Typography>
      </div>

      <SafeMedia alt="About Us" className="!h-[500px]" src={aboutUsImage} />

      <GridTwoColumns reverseOnMobile>
        {/* // TODO: Add video about the organization */}
        <SafeMedia className="!h-96" />

        <Typography className="text-text dark:text-dk_text" variant="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
          maxime repellat illo. Iusto saepe suscipit placeat provident facere
          hic, laborum error perspiciatis obcaecati aperiam odit voluptatum
          corrupti ullam amet adipisci. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Natus et sint eaque. Fugit ullam corrupti, explicabo
          sunt officiis dolorem ea, deleniti, blanditiis adipisci eveniet velit
          nesciunt ad ratione? Minus, similique! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nihil repudiandae aperiam aut
          consequuntur facere eligendi voluptatibus, repellat laudantium?
          Eveniet consectetur recusandae ad vero quaerat repellendus dicta dolor
          eius voluptatibus fuga. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Accusantium quisquam a assumenda, perspiciatis ab
          inventore deserunt tempore tempora impedit, dicta ratione accusamus
          nihil officia laboriosam iste, officiis dolor adipisci neque.
        </Typography>
      </GridTwoColumns>

      <CarouselContainer>
        {deliveries.map((data, index) => (
          <DeliveryCircle
            key={index}
            imageSrc={data.mainImageUrl}
            year={String(data.year)}
          />
        ))}
      </CarouselContainer>
    </PageLayout>
  );
};

export default About;
