import { AuthMenu } from "../../UserArea/AuthMenu/AuthMenu";
import { Menu } from "../Menu/Menu";
import "./Header.css";

export function Header() {
    return (
        <header className="Header">
            <div className="Header-container">
                <h1>ART GALLERY</h1>
                <Menu />
            </div>
            <AuthMenu />
        </header>
    );
}
