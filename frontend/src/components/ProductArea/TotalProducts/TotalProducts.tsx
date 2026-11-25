import { useSelector } from "react-redux";
import { type AppState } from "../../../Redux/Store";
import "./TotalProducts.css";

export function TotalPaintings() {

    const count = useSelector<AppState, number>(state => state.paintings.length);

    return (
        <div className="TotalProducts">

            <span>Total Paintings: {count}</span>

        </div>
    );
}
