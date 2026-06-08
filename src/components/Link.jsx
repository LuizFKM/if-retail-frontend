import {NavLink} from "react-router-dom";

function Link({ children, to, className='', ...props }) {
    return (
        <NavLink to={to} {...props} className={
            `
            inline-block
            cursor-pointer

            transition-all
            duration-300
            ease-in-out
            

            hover:-translate-y-0.5
            ${className}`
        }>
            {children}
        </NavLink>
    );
}

export default Link;