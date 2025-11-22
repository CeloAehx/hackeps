import { UserPreferences } from '@/types';
import styles from './StepLifestyle.module.css';

interface Props {
    data: UserPreferences;
    update: (updates: Partial<UserPreferences>) => void;
}

const LIFESTYLE_OPTIONS = [
    { id: 'parks', label: 'Parques' },
    { id: 'gyms', label: 'Gimnasios' },
    { id: 'restaurants', label: 'Restaurantes' },
    { id: 'shopping', label: 'Tiendas' },
    { id: 'culture', label: 'Cultura' },
    { id: 'nightlife', label: 'Vida Nocturna' },
    { id: 'schools', label: 'Colegios' },
    { id: 'quiet', label: 'Tranquilidad' },
];

export default function StepLifestyle({ data, update }: Props) {
    const toggleOption = (id: string) => {
        const current = data.lifestyle;
        const isSelected = current.includes(id);

        if (isSelected) {
            update({ lifestyle: current.filter(item => item !== id) });
        } else {
            update({ lifestyle: [...current, id] });
        }
    };

    return (
        <div>
            <p className={styles.description}>
                Selecciona qué servicios o características son importantes para ti en tu día a día.
            </p>
            <div className={styles.grid}>
                {LIFESTYLE_OPTIONS.map((option) => {
                    const isActive = data.lifestyle.includes(option.id);
                    return (
                        <button
                            key={option.id}
                            className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
                            onClick={() => toggleOption(option.id)}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
