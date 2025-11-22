'use client';

import { useState } from 'react';
import { UserPreferences, INITIAL_PREFERENCES } from '@/types';
import StepHousing from './steps/StepHousing';
import StepLifestyle from './steps/StepLifestyle';
import StepPriorities from './steps/StepPriorities';
import styles from './Wizard.module.css';

/**
 * Contenedor principal del Wizard de preferencias.
 * Maneja el estado global de las respuestas y la navegación entre pasos.
 */
export default function WizardContainer() {
    const [currentStep, setCurrentStep] = useState(1);
    const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_PREFERENCES);

    const totalSteps = 3;

    /**
     * Actualiza una parte del estado de preferencias.
     * @param updates Objeto parcial con los campos a actualizar.
     */
    const updatePreferences = (updates: Partial<UserPreferences>) => {
        setPreferences((prev) => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // Finalizar
            console.log('Preferencias Finales:', preferences);
            alert('¡Búsqueda iniciada! Revisa la consola para ver el objeto de datos.');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    /**
     * Maneja el clic en un indicador de paso.
     * Permite navegar directamente a cualquier paso.
     * @param step El número del paso al que se quiere ir.
     */
    const handleStepClick = (step: number) => {
        setCurrentStep(step);
    };

    // Renderizado condicional del paso activo
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepHousing data={preferences} update={updatePreferences} />;
            case 2:
                return <StepLifestyle data={preferences} update={updatePreferences} />;
            case 3:
                return <StepPriorities data={preferences} update={updatePreferences} />;
            default:
                return null;
        }
    };

    // Cálculo del progreso para la barra visual
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Encuentra tu Barrio Ideal</h1>
                <p className={styles.subtitle}>Paso {currentStep} de {totalSteps}</p>
            </header>

            {/* Barra de Progreso */}
            <div className={styles.progressContainer}>
                <div className={styles.progressLine}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                {[1, 2, 3].map((step) => (
                    <button
                        key={step}
                        className={`
              ${styles.stepIndicator} 
              ${currentStep === step ? styles.stepActive : ''}
              ${step < currentStep ? styles.stepCompleted : ''}
            `}
                        onClick={() => handleStepClick(step)}
                        aria-label={`Ir al paso ${step}`}
                        aria-current={currentStep === step ? 'step' : undefined}
                        type="button"
                    >
                        {step < currentStep ? '✓' : step}
                    </button>
                ))}
            </div>

            {/* Contenido del Paso */}
            <div className={styles.stepContent}>
                {renderStep()}
            </div>

            {/* Botones de Navegación */}
            <div className={styles.actions}>
                <button
                    className={styles.prevButton}
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
                >
                    Atrás
                </button>

                <button className={styles.nextButton} onClick={nextStep}>
                    {currentStep === totalSteps ? 'Buscar mi Barrio' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
}
