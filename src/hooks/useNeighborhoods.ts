'use client';

import { useState, useEffect, useMemo } from 'react';
import { FeatureCollection } from 'geojson';
import { NeighborhoodFeature, NeighborhoodStats } from '@/types/neighborhood';

/**
 * Genera estadísticas realistas pero aleatorias para un barrio.
 * Se usa una semilla simple (el nombre) para mantener consistencia.
 */
function generateMockStats(neighborhoodName: string): NeighborhoodStats {
    // Simple hash del nombre para aleatoriedad consistente
    const seed = neighborhoodName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const random = (min: number, max: number, offset: number = 0) => {
        const pseudo = ((seed + offset) * 9301 + 49297) % 233280;
        return Math.floor(min + (pseudo / 233280.0) * (max - min));
    };

    return {
        demographics: {
            density: ['Baja', 'Media', 'Alta', 'Muy Alta'][random(0, 4, 1)],
            economicActivity: ['Residencial', 'Comercial', 'Mixta', 'Industrial', 'Turismo'][random(0, 5, 2)]
        },
        lifestyle: {
            counts: {
                restaurants: random(20, 300, 3),
                parks: random(1, 15, 4),
                gyms: random(5, 30, 5),
                shops: random(10, 150, 6)
            }
        },
        mobility: {
            transportStops: {
                bus: random(10, 80, 7),
                metro: random(0, 10, 8),
                others: random(0, 30, 9)
            }
        },
        safety: {
            safetyLevel: random(2, 6, 10) // 2-5
        },
        housing: {
            averagePrice: random(1500, 6000, 11) // Alquiler mensual
        }
    };
}

interface UseNeighborhoodsResult {
    data: NeighborhoodFeature[] | null;
    loading: boolean;
    error: string | null;
    dataSignature: string | null;
}

/**
 * Custom hook para cargar y procesar los datos de barrios de LA.
 * Fusiona el GeoJSON real con estadísticas generadas.
 */
export function useNeighborhoods(): UseNeighborhoodsResult {
    const [data, setData] = useState<NeighborhoodFeature[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNeighborhoods = async () => {
            try {
                setLoading(true);
                const response = await fetch('/la-neighborhoods.geojson');

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const geoJson: FeatureCollection = await response.json();

                // Fusionamos las features con stats generados
                const featuresWithStats: NeighborhoodFeature[] = geoJson.features.map((feature: any) => {
                    const name = feature.properties?.name || 'Barrio Desconocido';
                    return {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            name,
                            stats: generateMockStats(name)
                        }
                    } as NeighborhoodFeature;
                });

                setData(featuresWithStats);
                setError(null);
            } catch (err) {
                console.error('Error cargando barrios:', err);
                setError(err instanceof Error ? err.message : 'Error desconocido');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchNeighborhoods();
    }, []);

    return { data, loading, error, dataSignature: data ? `${data.length}-${data[0]?.properties.name}` : null };
}
