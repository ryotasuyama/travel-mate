import { TravelFormInput } from '@/types/travel';

export interface FormSectionProps {
  formData: TravelFormInput;
  onUpdate: (updates: Partial<TravelFormInput>) => void;
}

export interface FormState {
  isSubmitting: boolean;
  error: string | null;
  submitted: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}