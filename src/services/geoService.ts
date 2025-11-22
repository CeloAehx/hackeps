import { FeatureCollection } from 'geojson';
import neighborhoodsData from '@/data/realNeighborhoods.json';

/**
 * Obtiene los datos GeoJSON de los barrios de Los Ángeles.
 * 
 * @returns {Promise<FeatureCollection>} Una promesa que resuelve a una colección de Features GeoJSON.
 */
export async function getLANeighborhoods(): Promise<FeatureCollection> {
    // Simulamos un pequeño retardo para que se vea el loading
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(neighborhoodsData as unknown as FeatureCollection);
        }, 500);
    });
}
