import { NeighborhoodFeature } from '@/types/neighborhood';

export const MOCK_NEIGHBORHOODS: NeighborhoodFeature[] = [
    {
        type: 'Feature',
        properties: {
            name: 'Downtown LA',
            stats: {
                demographics: {
                    density: 'Alta',
                    economicActivity: 'Comercial/Financiera',
                },
                lifestyle: {
                    counts: {
                        restaurants: 150,
                        parks: 2,
                        gyms: 15,
                        shops: 80,
                    },
                },
                mobility: {
                    transportStops: {
                        bus: 45,
                        metro: 8,
                        others: 10,
                    },
                },
                safety: {
                    safetyLevel: 3,
                },
                housing: {
                    averagePrice: 2800,
                },
            },
        },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-118.265, 34.035],
                    [-118.235, 34.035],
                    [-118.235, 34.055],
                    [-118.265, 34.055],
                    [-118.265, 34.035],
                ],
            ],
        },
    },
    {
        type: 'Feature',
        properties: {
            name: 'Santa Monica',
            stats: {
                demographics: {
                    density: 'Media',
                    economicActivity: 'Turismo/Tecnología',
                },
                lifestyle: {
                    counts: {
                        restaurants: 120,
                        parks: 8,
                        gyms: 20,
                        shops: 100,
                    },
                },
                mobility: {
                    transportStops: {
                        bus: 30,
                        metro: 2,
                        others: 25,
                    },
                },
                safety: {
                    safetyLevel: 4,
                },
                housing: {
                    averagePrice: 3500,
                },
            },
        },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-118.500, 34.010],
                    [-118.480, 34.010],
                    [-118.480, 34.030],
                    [-118.500, 34.030],
                    [-118.500, 34.010],
                ],
            ],
        },
    },
    {
        type: 'Feature',
        properties: {
            name: 'Hollywood',
            stats: {
                demographics: {
                    density: 'Alta',
                    economicActivity: 'Entretenimiento',
                },
                lifestyle: {
                    counts: {
                        restaurants: 200,
                        parks: 3,
                        gyms: 12,
                        shops: 90,
                    },
                },
                mobility: {
                    transportStops: {
                        bus: 50,
                        metro: 3,
                        others: 5,
                    },
                },
                safety: {
                    safetyLevel: 3,
                },
                housing: {
                    averagePrice: 2500,
                },
            },
        },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-118.340, 34.090],
                    [-118.320, 34.090],
                    [-118.320, 34.110],
                    [-118.340, 34.110],
                    [-118.340, 34.090],
                ],
            ],
        },
    },
];
