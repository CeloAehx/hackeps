'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
    center: [number, number];
    zoom: number;
}

/**
 * Componente MapController.
 * 
 * No renderiza nada visualmente. Su única responsabilidad es controlar
 * la vista del mapa (centro y zoom) de forma programática cuando cambian las props.
 */
export default function MapController({ center, zoom }: Props) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, zoom, {
            duration: 1.5, // Duración de la animación en segundos
            easeLinearity: 0.25,
        });
    }, [center, zoom, map]);

    return null;
}
