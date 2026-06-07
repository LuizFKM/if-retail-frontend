
function Button({children, className=''}){
    return (
        <button className={`py-1 px-5
                            rounded-3xl
                            cursor-pointer 
                            
                            transition-all
                            duration-300
                            ease-in-out

                            hover:-translate-y-0.5
                            hover:shadow-lg"
                            
                            ${className}`}>
            {children}
        </button>
    )
}

export default Button