import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'sharp' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'sharp',
    children,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-bold uppercase transition-all inline-flex items-center gap-3';

    const variantClasses = {
        sharp: 'btn-sharp',
        outline: 'px-8 py-4 border border-[var(--ui-border)] text-xs mono hover:bg-[var(--surface-hover)]',
        ghost: 'px-6 py-3 text-xs mono hover:text-[#FF3D00]',
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
