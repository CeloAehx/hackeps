/**
 * Definición de tipos para las respuestas de la API.
 * @template T El tipo de datos que se espera en la respuesta.
 */
interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

/**
 * Clase base para manejar llamadas a APIs externas o internas.
 * Centraliza la configuración de headers, manejo de errores y tipado.
 */
class ApiService {
    private baseUrl: string;

    /**
     * Constructor del servicio API.
     * @param {string} baseUrl - La URL base para todas las peticiones (ej: '/api' o 'https://api.externa.com').
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Realiza una petición GET.
     * 
     * @template T El tipo de dato esperado en la respuesta.
     * @param {string} endpoint - El endpoint relativo a la URL base.
     * @param {RequestInit} [options] - Opciones adicionales para fetch.
     * @returns {Promise<T>} Los datos de la respuesta parseados.
     * @throws {Error} Si la petición falla.
     */
    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    /**
     * Realiza una petición POST.
     * 
     * @template T El tipo de dato esperado en la respuesta.
     * @param {string} endpoint - El endpoint relativo a la URL base.
     * @param {unknown} body - El cuerpo de la petición.
     * @param {RequestInit} [options] - Opciones adicionales para fetch.
     * @returns {Promise<T>} Los datos de la respuesta parseados.
     */
    async post<T>(endpoint: string, body: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
    }

    /**
     * Método interno para ejecutar la petición fetch y manejar la respuesta.
     */
    private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                // Aquí podrías manejar errores específicos por código de estado (401, 404, etc.)
                throw new Error(`Error en la petición API: ${response.status} ${response.statusText}`);
            }

            // Asumimos que la respuesta siempre es JSON.
            // Podrías agregar lógica para manejar otros tipos de contenido.
            return await response.json() as T;
        } catch (error) {
            console.error(`[ApiService] Error en ${options.method} ${url}:`, error);
            throw error;
        }
    }
}

// Exportamos una instancia por defecto apuntando a nuestra propia API
export const apiClient = new ApiService('/api');

// Exportamos la clase para poder instanciarla con otras URLs si es necesario (ej: APIs de terceros)
export { ApiService };
