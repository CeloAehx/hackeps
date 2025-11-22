import { UserPreferences } from '@/types';
import styles from './StepHousing.module.css';

interface Props {
    data: UserPreferences;
    update: (updates: Partial<UserPreferences>) => void;
}

export default function StepHousing({ data, update }: Props) {
    return (
        <div className={styles.stepContainer}>
            {/* Tipo de Vivienda */}
            <div className={styles.section}>
                <label className={styles.label}>¿Qué estás buscando?</label>
                <div className={styles.typeToggle}>
                    <button
                        className={`${styles.typeButton} ${data.housingType === 'rent' ? styles.typeButtonActive : ''}`}
                        onClick={() => update({ housingType: 'rent' })}
                    >
                        Alquiler
                    </button>
                    <button
                        className={`${styles.typeButton} ${data.housingType === 'buy' ? styles.typeButtonActive : ''}`}
                        onClick={() => update({ housingType: 'buy' })}
                    >
                        Compra
                    </button>
                </div>
            </div>

            {/* Presupuesto */}
            <div className={styles.section}>
                <label className={styles.label}>Presupuesto ({data.housingType === 'rent' ? '€/mes' : '€'})</label>
                <div className={styles.budgetInputs}>
                    <div className={styles.inputGroup}>
                        <span className={styles.currency}>€</span>
                        <input
                            type="number"
                            className={styles.input}
                            value={data.budgetMin}
                            onChange={(e) => {
                                const value = Math.max(0, Number(e.target.value));
                                if (value <= data.budgetMax) {
                                    update({ budgetMin: value });
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowUp' && data.budgetMin + 500 > data.budgetMax) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Mín"
                            step="500"
                            min="0"
                            max={data.budgetMax}
                        />
                    </div>
                    <span className={styles.separator}>-</span>
                    <div className={styles.inputGroup}>
                        <span className={styles.currency}>€</span>
                        <input
                            type="number"
                            className={styles.input}
                            value={data.budgetMax}
                            onChange={(e) => {
                                const value = Math.max(data.budgetMin, Number(e.target.value));
                                update({ budgetMax: value });
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowDown' && data.budgetMax - 500 < data.budgetMin) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Máx"
                            step="500"
                            min={data.budgetMin}
                        />
                    </div>
                </div>
            </div>

            {/* Habitaciones */}
            <div className={styles.section}>
                <label className={styles.label}>Habitaciones mínimas</label>
                <div className={styles.roomsContainer}>
                    {[1, 2, 3, 4].map((num) => (
                        <button
                            key={num}
                            className={`${styles.roomButton} ${data.rooms === num ? styles.roomButtonActive : ''}`}
                            onClick={() => update({ rooms: num })}
                        >
                            {num}{num === 4 ? '+' : ''}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
