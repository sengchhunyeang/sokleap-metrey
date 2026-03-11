declare module '@/app/components/ui' {
  import { ReactNode, FC, HTMLAttributes, ChangeEvent, MouseEvent } from 'react';

  // Button
  interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'dark';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
  }
  export const Button: FC<ButtonProps>;

  // Input
  interface InputProps {
    label?: string;
    name?: string;
    type?: string;
    value?: any;
    defaultValue?: any;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
  }
  export const Input: FC<InputProps>;

  // Select
  interface SelectProps {
    label?: string;
    name?: string;
    value?: any;
    defaultValue?: any;
    options?: Array<{ value: string | number | boolean; label: string }>;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    [key: string]: any;
  }
  export const Select: FC<SelectProps>;

  // Badge
  interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'success' | 'danger' | 'pending' | 'info';
    className?: string;
  }
  export const Badge: FC<BadgeProps>;

  // Card
  interface CardProps {
    children: ReactNode;
    className?: string;
  }
  interface CardHeaderProps {
    children: ReactNode;
    className?: string;
  }
  interface CardTitleProps {
    children: ReactNode;
    className?: string;
  }
  interface CardComponent extends FC<CardProps> {
    Header: FC<CardHeaderProps>;
    Title: FC<CardTitleProps>;
  }
  export const Card: CardComponent;

  // Table
  interface TableProps {
    children: ReactNode;
    className?: string;
  }
  interface TableRowProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }
  interface TableCellProps {
    children?: ReactNode;
    className?: string;
    bold?: boolean;
  }
  interface TableEmptyProps {
    children?: ReactNode;
    colSpan?: number;
  }
  interface TableComponent extends FC<TableProps> {
    Head: FC<{ children: ReactNode; className?: string }>;
    Body: FC<{ children: ReactNode; className?: string }>;
    Row: FC<TableRowProps>;
    Th: FC<TableCellProps>;
    Td: FC<TableCellProps>;
    Empty: FC<TableEmptyProps>;
  }
  export const Table: TableComponent;

  // Tabs
  interface TabItem {
    id: string;
    label: string;
    icon?: any;
    count?: number;
  }
  interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (tabId: string) => void;
  }
  export const Tabs: FC<TabsProps>;

  // Modal
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
  }
  export const Modal: FC<ModalProps>;

  // FileUpload
  interface FileUploadProps {
    accept?: string;
    onUpload: (file: File) => void;
    loading?: boolean;
    title?: string;
    description?: string;
    buttonText?: string;
    loadingText?: string;
    className?: string;
  }
  export const FileUpload: FC<FileUploadProps>;

  // SearchInput
  interface SearchInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
  }
  export const SearchInput: FC<SearchInputProps>;

  // Alert
  interface AlertProps {
    variant?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    children: ReactNode;
    className?: string;
  }
  export const Alert: FC<AlertProps>;

  // Pagination
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  export const Pagination: FC<PaginationProps>;

  // Loading
  interface LoadingProps {
    text?: string;
  }
  export const Loading: FC<LoadingProps>;

  // Skeleton
  interface SkeletonComponent {
    TableRows: FC<{ rows?: number; cols?: number }>;
    DetailPage: FC<{}>;
    [key: string]: any;
  }
  export const Skeleton: SkeletonComponent;
}
