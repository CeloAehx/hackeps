/**
 * Preferencias del usuario para la búsqueda de barrio.
 */
export interface UserPreferences {
    // Paso 1: Vivienda
    housingType: 'rent' | 'buy';
    budgetMin: number;
    budgetMax: number;
    rooms: number; // 1, 2, 3, 4 (donde 4 representa 4+)

    // Paso 2: Estilo de Vida (Array de IDs o nombres de intereses)
    lifestyle: string[];

    // Paso 3: Prioridades (Valores del 0 al 10)
    priorities: {
        security: number;
        transport: number;
        vibe: number; // 0 = Familiar, 10 = Juvenil/Fiesta (o viceversa, definiremos la escala)
        traffic: number; // Importancia de evitar tráfico o facilidad para coche
    };
}

/**
 * Estado inicial por defecto para el Wizard.
 */
export const INITIAL_PREFERENCES: UserPreferences = {
    housingType: 'rent',
    budgetMin: 0,
    budgetMax: 2000,
    rooms: 2,
    lifestyle: [],
    priorities: {
        security: 5,
        transport: 5,
        vibe: 5,
        traffic: 5,
    },
};
