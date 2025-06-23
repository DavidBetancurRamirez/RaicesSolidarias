import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

import ButtonWithIcon from '@components/common/ButtonWithIcon';
import CarouselContainer from '@components/common/CarouselContainer';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/common/PageLayout';
import PlaceCard from '@components/places/PlaceCard';
import SafeMedia from '@components/common/SafeMedia';
import Title from '@components/common/Title';

import api from '@/config/api';

import { Place, ResponseData } from '@/constants/interfaces';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';

const Home = () => {
  const navigate = useNavigate();

  const [recommendedPlaces, setRecommendedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchRecommendedPlaces = async () => {
      const response = (await api.get(
        API_ROUTES.placeByRecommended(),
      )) as ResponseData<Place[]>;

      if (response.statusCode !== 200) {
        console.error('Error fetching delivery:', response);
        return;
      }

      setRecommendedPlaces(response.data);
    };

    fetchRecommendedPlaces();
  }, []);

  return (
    <React.Fragment>
      <SafeMedia className="rounded-none !h-screen" />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 mt-2 border-y-2 border-text dark:border-dk_text border-dashed">
        <Typography
          className="text-text dark:text-dk_text text-center"
          variant="paragraph"
        >
          ¿Que esperamos para el año 2025?
        </Typography>

        <div className="hidden sm:block w-px h-10 bg-text dark:bg-dk_text" />

        <ButtonWithIcon
          text="Ver más"
          onClick={() => navigate(WEB_ROUTES.deliveryByYear('2025'))}
        />
      </div>

      <PageLayout>
        <GridTwoColumns>
          <SafeMedia className="!h-96" />

          <div className="flex flex-col gap-4">
            <Title title="Descripción" />

            <Typography
              className="text-text dark:text-dk_text text-justify"
              variant="paragraph"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident maxime repellat illo. Iusto saepe suscipit placeat
              provident facere hic, laborum error perspiciatis obcaecati aperiam
              odit voluptatum corrupti ullam amet adipisci. Lorem ipsum dolor,
              dolor, consectetur adipisicing elit. Natus et sint eaque. Fugit
              ullam corrupti, explicabo sunt officiis dolorem ea, deleniti,
              blanditiis adipisci eveniet velit nesciunt ad ratione? Minus,
              similique! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nihil repudiandae consequuntur facere eligendi voluptatibus,
              repellat laudantium? Eveniet consectetur recusandae ad vero
              quaerat repellendus dicta eius voluptatibus fuga.
            </Typography>

            <ButtonWithIcon className="w-fit" text="Apoyanos" />
          </div>
        </GridTwoColumns>

        {recommendedPlaces?.length > 0 && (
          <React.Fragment>
            <Title variant="h4" title="Algunas de nuestras entregas" />
            <CarouselContainer>
              {recommendedPlaces.map((place, index) => (
                <PlaceCard
                  date={new Date(place.deliveryDate)}
                  description={place.description}
                  image={place.mainImageUrl}
                  key={index}
                  place={place.name}
                  onClick={() =>
                    navigate(WEB_ROUTES.placeById(String(place._id)))
                  }
                />
              ))}
            </CarouselContainer>
          </React.Fragment>
        )}
      </PageLayout>
    </React.Fragment>
  );
};

export default Home;
