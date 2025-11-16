import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

import SafeMedia from './SafeMedia';
import ButtonWithIcon from './ButtonWithIcon';

import { Media } from '@/constants/interfaces';

interface GalleryProps {
  gallery: Media[];
  initialRows?: number;
  loadMoreRows?: number;
}

const Gallery: React.FC<GalleryProps> = ({
  gallery,
  initialRows = 2,
  loadMoreRows = 2,
}) => {
  const [visibleRows, setVisibleRows] = useState(initialRows);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  // Función para calcular columnas según el ancho de pantalla
  const getColumnsFromWidth = () => {
    const width = window.innerWidth;
    if (width < 640) return 1; // sm: grid-cols-1
    if (width < 768) return 2; // md: grid-cols-2
    if (width < 1024) return 3; // lg: grid-cols-3
    return 4; // xl: grid-cols-4
  };

  // Efecto para actualizar columnas al cambiar el tamaño de pantalla
  useEffect(() => {
    const updateColumns = () => {
      setItemsPerRow(getColumnsFromWidth());
    };

    updateColumns(); // Calcular inicial
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const visibleItems = visibleRows * itemsPerRow;

  const displayedMedia = useMemo(() => {
    return gallery.slice(0, visibleItems);
  }, [gallery, visibleItems]);

  const hasMoreItems = gallery.length > visibleItems;
  const canLoadLess = visibleRows > initialRows;

  const handleLoadMore = () => {
    setVisibleRows((prevRows) => prevRows + loadMoreRows);
  };

  const handleLoadLess = () => {
    setVisibleRows((prevRows) =>
      Math.max(prevRows - loadMoreRows, initialRows),
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedMedia.map((media) => (
          <SafeMedia
            alt="gallery-image"
            key={media.url}
            // fit="contain"
            media={media}
          />
        ))}
      </div>

      {(hasMoreItems || canLoadLess) && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="hidden md:block md:w-1/3">
            {/* Espacio reservado para futuras funcionalidades */}
          </div>

          <div className="flex gap-4 justify-center w-full md:w-1/3">
            {canLoadLess && (
              <ButtonWithIcon
                text="Cargar menos"
                icon={<ChevronUp size={16} />}
                onClick={handleLoadLess}
                className="bg-gray-600 hover:bg-gray-700"
              />
            )}
            {hasMoreItems && (
              <ButtonWithIcon
                text="Cargar más"
                icon={<ChevronDown size={16} />}
                onClick={handleLoadMore}
              />
            )}
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right text-sm text-gray-600 dark:text-gray-400">
            Mostrando {Math.min(visibleItems, gallery.length)} de{' '}
            {gallery.length} imágenes
            {hasMoreItems && (
              <span className="block text-xs">
                ({gallery.length - visibleItems} restantes)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
