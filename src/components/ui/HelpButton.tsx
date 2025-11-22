'use client';

import { useRouter } from 'next/navigation';
import styles from './HelpButton.module.css';

/**
 * Botón de Ayuda Flotante.
 * 
 * Se muestra fijo en la esquina inferior izquierda de la pantalla.
 * Al hacer clic, redirige a la página de FAQ.
 */
export default function HelpButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/faq');
    };

    return (
        <button
            className={styles.helpButton}
            aria-label="Ayuda"
            type="button"
            onClick={handleClick}
        >
            {/* Icono de interrogación simple */}
            <span className={styles.icon}>?</span>
        </button>
    );
}
