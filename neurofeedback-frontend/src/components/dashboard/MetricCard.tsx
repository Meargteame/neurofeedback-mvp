import React from 'react';

interface MetricCardProps {
    label: string;
    value: string | number;
    sublabel?: string;
    variant?: 'default' | 'danger' | 'success';
    showBar?: boolean;
    barValue?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    sublabel,
    variant = 'default',
    showBar = false,
    barValue = 0,
}) => {
    const valueColor = variant === 'danger' ? 'text-[#FF3D00]' : variant === 'success' ? 'text-green-500' : 'text-[var(--text-primary)]';

    return (
        <div className="p-6 border-r border-[var(--ui-border)] last:border-r-0 space-y-3">
            <div className="text-[10px] mono opacity-40 font-bold tracking-widest uppercase">{label}</div>
            <div className="flex flex-col">
                <span className={`text-4xl lg:text-5xl font-black ${valueColor}`}>{value}</span>
                {sublabel && (
                    <span className="text-[10px] mono opacity-40 mt-1 uppercase tracking-tight">{sublabel}</span>
                )}
            </div>
            {showBar && (
                <div className="h-1.5 w-full bg-[var(--surface-hover)] mt-2">
                    <div
                        className={`h-full transition-all duration-1000 ${variant === 'danger' ? 'bg-[#FF3D00]' : 'bg-[var(--text-primary)]'}`}
                        style={{ width: `${Math.min(100, barValue)}%` }}
                    />
                </div>
            )}
        </div>
    );
};
