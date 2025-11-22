import Image from 'next/image';
import styles from "./page.module.css";

/**
 * Página "Quiénes somos".
 * 
 * Presenta información sobre el equipo MANIPOBLADORES y su misión.
 */
export default function QuienesSomos() {
  const teamPhotos = [
    { 
      src: '/quienes-somos/fotos/team-1.png', 
      alt: 'David Fontanet Bujaldón',
      name: 'David Fontanet Bujaldón',
      role: 'Back-end developer'
    },
    { 
      src: '/quienes-somos/fotos/team-2.png', 
      alt: 'Álvaro Poblador Estéban',
      name: 'Álvaro Poblador Estéban',
      role: 'Full-stack developer'
    },
    { 
      src: '/quienes-somos/fotos/team-3.png', 
      alt: 'Ion Alexandru Bitu',
      name: 'Ion Alexandru Bitu',
      role: 'Front-end developer'
    },
    { 
      src: '/quienes-somos/fotos/team-4.png', 
      alt: 'Hugo Ferreirós Herrera',
      name: 'Hugo Ferreirós Herrera',
      role: 'Front-end developer'
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Quiénes somos</h1>
        <div className={styles.content}>
          <p className={styles.paragraph}>
            Somos <strong>MANIPOBLADORES</strong>, un equipo apasionado de desarrolladores
            y diseñadores comprometidos con revolucionar el sector inmobiliario.
          </p>
          <p className={styles.paragraph}>
            Nuestra misión es hacer que encontrar el hogar ideal sea más fácil, transparente
            y basado en datos reales. Creemos que la tecnología puede transformar la forma
            en que las personas toman decisiones sobre dónde vivir.
          </p>
          <p className={styles.paragraph}>
            Con APMaps, combinamos análisis de datos, visualización interactiva y una
            experiencia de usuario intuitiva para ayudarte a descubrir tu lugar perfecto
            en Los Ángeles.
          </p>
        </div>

        {/* Galería de fotos del equipo */}
        <div className={styles.gallery}>
          <h2 className={styles.galleryTitle}>Nuestro Equipo</h2>
          <div className={styles.photoGrid}>
            {teamPhotos.map((photo, index) => (
              <div key={index} className={styles.photoCard}>
                <div className={styles.photoWrapper}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{photo.name}</h3>
                  <p className={styles.memberRole}>{photo.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
