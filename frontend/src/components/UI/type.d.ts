// BADGE
interface BadgeProps {
  type: 'primary' | 'success' | 'danger' | 'info' | 'warning';
  className?: string;
  children: React.ReactNode;
}

// BUTTON
type BtnClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref;
  text?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  outline?: boolean;
  className?: string;
  onClick: BtnClick;
  fullWidth?: boolean;
  icon?: React.Node;
  iconPosition?: 'start' | 'end';
  isLoading?: boolean;
  disabled?: boolean;
}

// CARD
interface UICardProps {
  title?: string;
  image?: string;
  width?: string | number;
  fullWidth?: boolean;
  withShadow?: boolean;
  hoverable?: boolean;
  className?: string;
}

// INPUT
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  flat?: boolean;
  validationStatus?: 'success' | 'error' | null;
  disabled?: boolean;
}

// MODAL
interface ModalProps {
  children: React.ReactNode;
  className?: string;
  isVisible?: boolean;
  title?: string;
  animation?: 'fade' | 'zoom' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  withToolbar?: boolean;
  actionComponent?: React.ReactNode;
  onClose?: (...args: any[]) => any;
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
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
