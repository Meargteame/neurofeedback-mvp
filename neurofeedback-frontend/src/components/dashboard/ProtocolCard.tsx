import React from 'react';

interface ProtocolCardProps {
    number: string;
    title: string;
    description: string;
    onClick?: () => void;
}

export const ProtocolCard: React.FC<ProtocolCardProps> = ({
    number,
    title,
    description,
    onClick,
}) => {
    return (
        <div
            className="p-12 border-r border-[var(--ui-border)] last:border-r-0 hover:bg-[#FF3D00] hover:text-white transition-all group relative cursor-pointer"
            onClick={onClick}
        >
            <div className="text-6xl font-black text-[var(--text-primary)]/5 group-hover:text-white/10 absolute top-4 right-8">
                {number}
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-6 relative z-10">
                {title}
            </h3>
            <p className="mono text-xs opacity-50 group-hover:opacity-100 leading-relaxed relative z-10">
                {description}
            </p>
        </div>
    );
};
