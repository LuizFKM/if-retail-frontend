import React from 'react';

function Tag({ children, className = '' }) {
    return (
        <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wider uppercase mb-5 ${className}`}>
            <p>{children}</p>
        </div>
    );
}

export default Tag;