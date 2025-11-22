import MapView from '@/components/map/MapView';
import styles from './page.module.css';

/**
 * Página de Exploración.
 * 
 * Muestra un mapa interactivo de pantalla completa.
 * Utiliza el componente MapView para cargar el mapa de forma dinámica (client-side only).
 */
export default function ExplorarPage() {
    return (
        <main className={styles.container}>
            <div className={styles.mapWrapper}>
                <MapView />
            </div>
        </main>
    );
}
