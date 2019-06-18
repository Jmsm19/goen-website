// BUTTON
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: React.Ref;
  text?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  outline?: boolean;
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  fullWidth?: boolean;
  icon?: React.Node;
  iconPosition?: 'start' | 'end';
  isLoading?: boolean;
  disabled?: boolean;
}

// INPUT
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: any) => void;
  type?: string;
  className?: string;
  flat?: boolean;
  validationStatus?: 'success' | 'error' | null;
  disabled?: boolean;
}

// SELECT
type SelectOptions = {
  text: string;
  value: string | number | undefined;
  disabled?: boolean;
}[];

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  loading?: boolean;
  options?: SelectOptions;
  onChange: (value: any) => void;
  defaultSelected?: string;
  className?: string;
}
