import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'sharp' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'sharp',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-bold uppercase transition-all inline-flex items-center gap-3';

    const sizeClasses = {
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-8 py-4 text-xs',
        lg: 'px-10 py-5 text-sm',
    };

    const variantClasses = {
        sharp: `btn-sharp ${size === 'sm' ? 'px-4 py-2' : ''}`, // btn-sharp might handle its own padding
        outline: `border border-[var(--ui-border)] mono hover:bg-[var(--surface-hover)] ${sizeClasses[size]}`,
        ghost: `mono hover:text-[#FF3D00] ${sizeClasses[size]}`,
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
