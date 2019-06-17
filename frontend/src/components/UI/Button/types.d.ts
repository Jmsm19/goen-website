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
