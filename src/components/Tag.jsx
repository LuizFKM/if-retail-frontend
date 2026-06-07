import React from 'react';

function Tag({ children, className = '' }) {
    return (
        <div className={`
            inline-flex items-center justify-center gap-2 
            rounded-full border font-semibold tracking-wider uppercase mb-5
            px-3 py-1 text-[12px]
            
            /* TRINCA DA ESTABILIDADE: */
            w-[160px]       /* 1. Define uma largura horizontal fixa e idêntica */
            shrink-0        /* 2. Impede que containers Flexbox esmaguem a tag */
            min-w-[160px]   /* 3. Garante o tamanho mesmo em contextos restritivos */
            
            ${className}
        `}>
            <p className="truncate">{children}</p>
        </div>
    );
}

export default Tag;