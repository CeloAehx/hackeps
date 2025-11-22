'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { NeighborhoodFeature } from '@/types/neighborhood';
import NeighborhoodDetails from './NeighborhoodDetails';

/**
 * Componente MapView.
 * 
 * Wrapper que carga el componente MapData de forma dinámica con ssr: false.
 * Gestiona el estado de selección de barrios y el layout del sidebar.
 */
const MapData = dynamic(() => import('./MapData'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#666'
        }}>
            <p>Cargando mapa...</p>
        </div>
    ),
});

export default function MapView() {
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodFeature | null>(null);

    const handleSelectNeighborhood = (feature: NeighborhoodFeature) => {
        setSelectedNeighborhood(feature);
    };

    const handleCloseDetails = () => {
        setSelectedNeighborhood(null);
    };

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', position: 'relative' }}>
            {/* Contenedor del Mapa */}
            <div style={{ flex: 1, height: '100%', position: 'relative' }}>
                <MapData onSelectNeighborhood={handleSelectNeighborhood} />
            </div>

            {/* Sidebar de Detalles */}
            {selectedNeighborhood && (
                <NeighborhoodDetails
                    name={selectedNeighborhood.properties.name}
                    stats={selectedNeighborhood.properties.stats}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
}
