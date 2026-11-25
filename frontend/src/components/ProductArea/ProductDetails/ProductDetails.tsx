import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaintingModel } from "../../../Models/PaintingModel";
import { UserModel } from "../../../Models/UserModel";
import { paintingService } from "../../../Services/PaintingService";
import "./ProductDetails.css";
import { useTitle } from "../../../Utils/UseTitle";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/Store";

export function PaintingDetails() {

    useTitle("Painting Details");

    const [painting, setPainting] = useState<PaintingModel>();
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id as string;
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        paintingService.getOnePainting(id)
            .then(painting => setPainting(painting))
            .catch(err => notify.error(err));
    }, []);

    async function deleteMe() {
        try {
            const sure = confirm("Are you sure?");
            if (!sure) return;
            await paintingService.deletePainting(id);
            notify.success("Painting has been deleted.");
            navigate("/paintings");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    function editMe() {
        navigate("/edit-painting/" + id);
    }

    function buyNow() {
        if (!user) {
            notify.error("Please login first to purchase");
            navigate("/login");
            return;
        }
        notify.success(`Added "${painting?.title}" to cart!`);
    }

    function inquireAbout() {
        if (!user) {
            notify.error("Please login first to inquire");
            navigate("/login");
            return;
        }
        const subject = `Inquiry about: ${painting?.title}`;
        const body = `I am interested in learning more about "${painting?.title}". Price: $${painting?.price}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // Check if user is admin (roleId === 1)
    const isAdmin = user && (user as UserModel).roleId === 1;

    return (
        <div className="ProductDetails">

            <h3>Title: {painting?.title}</h3>
            <h3>Description: {painting?.description}</h3>
            <h3>Price: ${painting?.price}</h3>
            <img src={`http://localhost:3000/uploads/${painting?.imageName}`} alt={painting?.title} />

            <hr />

            {isAdmin && (
                <>
                    <button onClick={editMe}>Edit</button>
                    <button onClick={deleteMe}>Delete</button>
                </>
            )}

            {!isAdmin && (
                <>
                    <button onClick={buyNow} className="buy-btn">Buy Now</button>
                    <button onClick={inquireAbout} className="inquire-btn">Inquire About</button>
                </>
            )}

        </div>
    );
}
