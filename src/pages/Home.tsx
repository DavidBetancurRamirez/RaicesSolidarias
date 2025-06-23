import React from 'react';
import { Typography } from '@material-tailwind/react';

import ButtonWithIcon from '@components/common/ButtonWithIcon';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/common/PageLayout';
import SafeMedia from '@components/common/SafeMedia';
import Title from '@components/common/Title';

const Home = () => {
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

        <ButtonWithIcon text="Ver más" />
      </div>

      <PageLayout>
        <GridTwoColumns>
          <SafeMedia className="!h-96" />

          <div className="flex flex-col gap-4">
            <Title title="Descripcion" />

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

        {/* // TODO: Add favorite places */}
      </PageLayout>
    </React.Fragment>
  );
};

export default Home;
