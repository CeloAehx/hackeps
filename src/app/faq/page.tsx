import styles from "./page.module.css";

/**
 * Página de Preguntas Frecuentes (FAQ).
 * 
 * Responde las dudas más comunes de los usuarios sobre APMaps.
 */
export default function FAQ() {
  const faqs = [
    {
      question: "¿Cómo se calculan los datos de los barrios?",
      answer: "Utilizamos fuentes de datos públicas y privadas, incluyendo estadísticas de criminalidad, precios de vivienda, servicios cercanos y más."
    },
    {
      question: "¿Los datos están actualizados?",
      answer: "Sí, actualizamos nuestros datos regularmente para asegurar que la información sea lo más precisa y actual posible."
    },
    {
      question: "¿Es gratuito usar APMaps?",
      answer: "Sí, APMaps es completamente gratuito. Nuestro objetivo es hacer la búsqueda de vivienda accesible para todos."
    },
    {
      question: "¿Puedo guardar mis barrios favoritos?",
      answer: "Esta funcionalidad estará disponible próximamente. Estamos trabajando en implementar cuentas de usuario."
    },
    {
      question: "¿En qué ciudades está disponible APMaps?",
      answer: "Actualmente estamos enfocados en Los Ángeles, pero planeamos expandirnos a otras ciudades principales en el futuro."
    }
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Preguntas Frecuentes</h1>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h3 className={styles.question}>{faq.question}</h3>
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
