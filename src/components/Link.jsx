import {NavLink} from "react-router-dom";

function Link({children, rota}) {
    return (
        <NavLink to={rota} className="
            inline-block
            cursor-pointer

            transition-all
            duration-300
            ease-in-out
            

            hover:-translate-y-0.5
        ">
            {children}
        </NavLink>
    );
}

export default Link;