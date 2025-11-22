import WizardContainer from '@/components/wizard/WizardContainer';

/**
 * Página "Encuentra tu barrio ideal".
 * 
 * Muestra el Wizard de preferencias para guiar al usuario.
 */
export default function EncuentraTuCasaPage() {
    return (
        <main style={{
            minHeight: '100vh',
            padding: '4rem 1rem',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        }}>
            <WizardContainer />
        </main>
    );
}
