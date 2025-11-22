import { Feature, Polygon, MultiPolygon } from 'geojson';

/**
 * Estadísticas detalladas de un barrio.
 */
export interface NeighborhoodStats {
    demographics: {
        density: string;
        economicActivity: string;
    };
    lifestyle: {
        counts: {
            restaurants: number;
            parks: number;
            gyms: number;
            shops: number;
        };
    };
    mobility: {
        transportStops: {
            bus: number;
            metro: number;
            others: number;
        };
    };
    safety: {
        safetyLevel: number; // 1-5
    };
    housing: {
        averagePrice: number;
    };
}

/**
 * Propiedades extendidas para las Features GeoJSON de nuestros barrios.
 */
export interface NeighborhoodProperties {
    name: string;
    stats: NeighborhoodStats;
}

/**
 * Tipo específico para una Feature de Barrio.
 */
export type NeighborhoodFeature = Feature<Polygon | MultiPolygon, NeighborhoodProperties>;
