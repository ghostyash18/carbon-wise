import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface StepNavigationProps {
  /** Callback fired when the user clicks the Next button */
  onNext: () => void;
  /** Callback fired when the user clicks the Back button (optional) */
  onBack?: () => void;
  /** Custom text for the Next button */
  nextText?: string;
  /** Disables the Next button if true */
  nextDisabled?: boolean;
}

/**
 * Reusable navigation buttons for multi-step forms.
 * Adheres to accessibility standards and handles i18n fallbacks.
 */
export function StepNavigation({ onNext, onBack, nextText, nextDisabled = false }: StepNavigationProps) {
  const { t } = useTranslation();

  return (
    <div className="pt-6 flex justify-between items-center w-full">
      {onBack ? (
        <Button variant="outline" onClick={onBack} size="lg" aria-label="Go to previous step">
          {t("common.back")}
        </Button>
      ) : (
        <div></div> // Empty div for flex-between spacing when no back button
      )}
      <Button onClick={onNext} size="lg" disabled={nextDisabled} aria-label="Go to next step">
        {nextText || t("common.next")}
      </Button>
    </div>
  );
}
