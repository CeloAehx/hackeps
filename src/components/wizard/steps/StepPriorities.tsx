import { UserPreferences } from '@/types';
import styles from './StepPriorities.module.css';

interface Props {
    data: UserPreferences;
    update: (updates: Partial<UserPreferences>) => void;
}

export default function StepPriorities({ data, update }: Props) {
    const handlePriorityChange = (key: keyof UserPreferences['priorities'], value: number) => {
        update({
            priorities: {
                ...data.priorities,
                [key]: value,
            },
        });
    };

    return (
        <div className={styles.container}>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>
                Define qué tan importantes son estos factores para ti (0 = Nada, 10 = Mucho).
            </p>

            {/* Seguridad */}
            <div className={styles.sliderGroup}>
                <div className={styles.header}>
                    <label className={styles.label}>Seguridad Ciudadana</label>
                    <span className={styles.value}>{data.priorities.security}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    className={styles.rangeInput}
                    value={data.priorities.security}
                    onChange={(e) => handlePriorityChange('security', Number(e.target.value))}
                />
                <div className={styles.labels}>
                    <span>Irrelevante</span>
                    <span>Crítico</span>
                </div>
            </div>

            {/* Transporte Público */}
            <div className={styles.sliderGroup}>
                <div className={styles.header}>
                    <label className={styles.label}>Transporte Público</label>
                    <span className={styles.value}>{data.priorities.transport}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    className={styles.rangeInput}
                    value={data.priorities.transport}
                    onChange={(e) => handlePriorityChange('transport', Number(e.target.value))}
                />
                <div className={styles.labels}>
                    <span>No lo uso</span>
                    <span>Esencial</span>
                </div>
            </div>

            {/* Ambiente (Vibe) */}
            <div className={styles.sliderGroup}>
                <div className={styles.header}>
                    <label className={styles.label}>Ambiente del Barrio</label>
                    <span className={styles.value}>{data.priorities.vibe}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    className={styles.rangeInput}
                    value={data.priorities.vibe}
                    onChange={(e) => handlePriorityChange('vibe', Number(e.target.value))}
                />
                <div className={styles.labels}>
                    <span>Familiar/Tranquilo</span>
                    <span>Juvenil/Animado</span>
                </div>
            </div>

            {/* Tráfico / Coche */}
            <div className={styles.sliderGroup}>
                <div className={styles.header}>
                    <label className={styles.label}>Facilidad para Coche / Tráfico</label>
                    <span className={styles.value}>{data.priorities.traffic}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    className={styles.rangeInput}
                    value={data.priorities.traffic}
                    onChange={(e) => handlePriorityChange('traffic', Number(e.target.value))}
                />
                <div className={styles.labels}>
                    <span>Me da igual</span>
                    <span>Quiero evitar tráfico</span>
                </div>
            </div>
        </div>
    );
}
