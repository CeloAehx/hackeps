'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./page.module.css";

/**
 * Página Principal (Home) de APMaps.
 * 
 * Diseño minimalista centrado en la marca y las dos acciones principales.
 * Con imagen de fondo con efecto parallax.
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      {/* Imagen de fondo con efecto parallax */}
      <div 
        className={styles.backgroundWrapper}
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src="/la-background.jpg"
          alt="Los Ángeles"
          fill
          priority
          className={styles.backgroundImage}
          quality={90}
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Contenido */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          Encuentra tu lugar ideal <br />
          <span className={styles.highlight}>en Los Ángeles</span>
        </h1>
        <div className={styles.actions}>
          <Link href="/explorar" className={`${styles.button} ${styles.primaryButton}`}>
            Explorar
          </Link>

          <Link href="/encuentra-tu-casa" className={`${styles.button} ${styles.secondaryButton}`}>
            Encuentra tu barrio ideal
          </Link>
        </div>
      </div>
    </main >
  );
}
