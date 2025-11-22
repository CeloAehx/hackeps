'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

/**
 * Componente Sidebar (Navegación Lateral).
 * 
 * Implementa un menú deslizante que se activa con un botón de hamburguesa.
 * Utiliza CSS Modules para las transiciones y el posicionamiento.
 */
export default function Sidebar() {
    // Estado para controlar si el menú está abierto o cerrado.
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Alterna el estado de visibilidad del menú.
     */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    /**
     * Cierra el menú. Útil al hacer clic en un enlace o en el overlay.
     */
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* 
        Botón Trigger (Hamburguesa).
        Siempre visible en la esquina superior derecha.
      */}
            <button
                className={styles.triggerButton}
                onClick={toggleMenu}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
            >
                {/* Icono de hamburguesa simple con divs */}
                <div className={styles.bar} style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }} />
                <div className={styles.bar} style={{ opacity: isOpen ? 0 : 1 }} />
                <div className={styles.bar} style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }} />
            </button>

            {/* 
        Overlay (Fondo oscuro).
        Solo visible cuando el menú está abierto. Al hacer clic, cierra el menú.
      */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* 
        Panel Lateral.
        Se desliza desde la izquierda usando la clase .sidebarOpen.
      */}
            <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <h2 className={styles.title}>Menú</h2>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/" className={styles.navLink} onClick={closeMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/explorar" className={styles.navLink} onClick={closeMenu}>
                            Explorar
                        </Link>
                    </li>
                    <li>
                        <Link href="/encuentra-tu-casa" className={styles.navLink} onClick={closeMenu}>
                            Encuentra tu barrio ideal
                        </Link>
                    </li>
                </ul>

                {/* Separador */}
                <hr className={styles.separator} />

                {/* Nuevos enlaces */}
                <ul className={styles.navList}>
                    <li>
                        <Link href="/quienes-somos" className={styles.navLink} onClick={closeMenu}>
                            Quiénes somos
                        </Link>
                    </li>
                    <li>
                        <Link href="/faq" className={styles.navLink} onClick={closeMenu}>
                            FAQ
                        </Link>
                    </li>
                </ul>

                {/* Footer con créditos */}
                <footer className={styles.footer}>
                    <p className={styles.credits}>Made with ❤️</p>
                    <p className={styles.credits}>by: MANIPOBLADORES</p>
                </footer>
            </nav>
        </>
    );
}
