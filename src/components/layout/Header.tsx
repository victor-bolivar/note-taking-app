import { NavLink } from "react-router"

const Header = () => {

    const activeClass = "text-red-500"
    const className = ({ isActive }: { isActive: boolean }) => isActive ? activeClass : "text-black"

    return (
        <header>
            <nav>
                <ul>
                    <NavLink to={'/'} className={className} end>Active</NavLink>
                    <NavLink to={'/archived'} className={className} end>Archived</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header