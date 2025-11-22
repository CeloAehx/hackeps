'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './MapData.module.css';
import { NeighborhoodFeature } from '@/types/neighborhood';
import { useNeighborhoods } from '@/hooks/useNeighborhoods';
import MapController from './MapController';

interface Props {
    onSelectNeighborhood: (feature: NeighborhoodFeature) => void;
}

export default function MapData({ onSelectNeighborhood }: Props) {
    const { data: neighborhoods, loading, error, dataSignature } = useNeighborhoods();
    const [mapCenter, setMapCenter] = useState<[number, number]>([34.0522, -118.2437]);
    const [mapZoom, setMapZoom] = useState(10);

    // Fix iconos Leaflet
    useEffect(() => {
        // @ts-expect-error: _getIconUrl es interno
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    const onEachFeature = (feature: NeighborhoodFeature, layer: L.Layer) => {
        const name = feature.properties.name;
        layer.bindTooltip(name, { sticky: true });

        layer.on({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setMapCenter([lat, lng]);
                setMapZoom(13);
                onSelectNeighborhood(feature);

                // Resaltar selección
                const targetLayer = layer as L.Path;
                targetLayer.setStyle({
                    weight: 3,
                    color: '#D97706',
                    fillOpacity: 0.7
                });
            },
            mouseover: (e) => {
                const target = e.target as L.Path;
                target.setStyle({
                    weight: 3,
                    fillOpacity: 0.6
                });
            },
            mouseout: (e) => {
                const target = e.target as L.Path;
                target.setStyle({
                    weight: 1,
                    color: '#8B4513',
                    fillOpacity: 0.3
                });
            }
        });
    };

    // Función de estilo para polígonos
    const geoJsonStyle = () => ({
        color: '#8B4513', // Marrón
        weight: 1,
        fillColor: '#FF8C00', // Naranja
        fillOpacity: 0.3
    });

    if (error) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#d32f2f',
                fontSize: '1.2rem'
            }}>
                Error cargando barrios: {error}
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Cargando barrios de Los Ángeles...
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        Preparando {neighborhoods?.length || 0} polígonos
                    </div>
                </div>
            )}

            <MapContainer
                center={[34.0522, -118.2437]}
                zoom={10}
                scrollWheelZoom={true}
                className={styles.mapContainer}
            >
                <MapController center={mapCenter} zoom={mapZoom} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {neighborhoods && neighborhoods.length > 0 && dataSignature && (
                    <GeoJSON
                        key={dataSignature} // Clave única basada en los datos para forzar re-montaje correcto
                        data={{
                            type: 'FeatureCollection',
                            features: neighborhoods
                        } as any}
                        style={geoJsonStyle}
                        onEachFeature={onEachFeature as any}
                    />
                )}
            </MapContainer>
        </div>
    );
}
