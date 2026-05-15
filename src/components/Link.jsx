function Link(props) {
    return (
        <a className="
            inline-block
            cursor-pointer

            transition-all
            duration-300
            ease-in-out
            

            hover:-translate-y-0.5
        ">
            {props.children}
        </a>
    );
}

export default Link;