export interface IButton {
  children: React.ReactNode;
  backgroundColor?: string;
  size: string;
  animate?: boolean;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
