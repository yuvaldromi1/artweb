import { useNavigate } from "react-router-dom";
import type { PaintingModel } from "../../../Models/PaintingModel";
import "./ProductCard.css";

type PaintingCardProps = {
    painting: PaintingModel;
};

export function PaintingCard(props: PaintingCardProps) {

    const navigate = useNavigate(); // React Hook

    function showDetails() {
        navigate("/painting-details/" + props.painting._id);
    }

    return (
        <div className="ProductCard" onClick={showDetails}>

            <div>
                <span>{props.painting.title}</span>
                <span>{props.painting.description}</span>
                <span>Price: ${props.painting.price}</span>
            </div>

            <div>
                <img src={`http://localhost:3000/uploads/${props.painting.imageName}`} alt={props.painting.title} />
            </div>

        </div>
    );
}
