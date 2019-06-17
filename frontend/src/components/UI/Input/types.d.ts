interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: any) => void;
  type?: string;
  className?: string;
  flat?: boolean;
  validationStatus?: 'success' | 'error' | null;
  disabled?: boolean;
}
