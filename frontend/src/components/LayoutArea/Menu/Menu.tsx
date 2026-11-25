import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { type RootState } from "../../../Redux/Store";
import { TotalPaintings } from "../../ProductArea/TotalProducts/TotalProducts";
import "./Menu.css";

export function Menu() {

    const user = useSelector((state: RootState) => state.user);
    const isLoggedIn = user !== null;
    const isAdmin = user && (user as any).roleId === 1;

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            {isLoggedIn && <NavLink to="/paintings">Paintings</NavLink>}

            {isAdmin && <NavLink to="/featured">Featured</NavLink>}

            {isAdmin && <NavLink to="/gallery">Gallery</NavLink>}

            {isAdmin && <NavLink to="/add-painting">Add Painting</NavLink>}

            <NavLink to="/about">About</NavLink>

            <NavLink to="/contact-us">Contact Us</NavLink>

            {isLoggedIn && <TotalPaintings />}

        </div>
    );
}
