import { NeighborhoodStats } from '@/types/neighborhood';
import styles from './NeighborhoodDetails.module.css';

interface Props {
    name: string | null;
    stats: NeighborhoodStats | null;
    onClose: () => void;
}

export default function NeighborhoodDetails({ name, stats, onClose }: Props) {
    if (!name || !stats) {
        return null;
    }

    return (
        <aside className={styles.sidebar}>
            <header className={styles.header}>
                <h2 className={styles.title}>{name}</h2>
                <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar detalles">
                    &times;
                </button>
            </header>

            {/* Vivienda */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>🏠 Vivienda</h3>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>${stats.housing.averagePrice}</span>
                    <span className={styles.statLabel}>Precio Promedio (Alquiler)</span>
                </div>
            </section>

            {/* Demografía */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>👥 Demografía</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <span>Densidad</span>
                        <strong>{stats.demographics.density}</strong>
                    </li>
                    <li className={styles.listItem}>
                        <span>Actividad Económica</span>
                        <strong>{stats.demographics.economicActivity}</strong>
                    </li>
                </ul>
            </section>

            {/* Estilo de Vida */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>🌳 Estilo de Vida</h3>
                <div className={styles.statGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{stats.lifestyle.counts.restaurants}</span>
                        <span className={styles.statLabel}>Restaurantes</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{stats.lifestyle.counts.parks}</span>
                        <span className={styles.statLabel}>Parques</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{stats.lifestyle.counts.gyms}</span>
                        <span className={styles.statLabel}>Gimnasios</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{stats.lifestyle.counts.shops}</span>
                        <span className={styles.statLabel}>Tiendas</span>
                    </div>
                </div>
            </section>

            {/* Movilidad */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>🚌 Movilidad</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <span>Paradas de Bus</span>
                        <strong>{stats.mobility.transportStops.bus}</strong>
                    </li>
                    <li className={styles.listItem}>
                        <span>Estaciones de Metro</span>
                        <strong>{stats.mobility.transportStops.metro}</strong>
                    </li>
                </ul>
            </section>

            {/* Seguridad */}
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>🛡️ Seguridad</h3>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{stats.safety.safetyLevel}/5</span>
                    <span className={styles.statLabel}>Nivel de Seguridad</span>
                </div>
            </section>
        </aside>
    );
}
