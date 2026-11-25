import { useEffect, useState } from "react";
import type { PaintingModel } from "../../../Models/PaintingModel";
import { paintingService } from "../../../Services/PaintingService";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import { PaintingCard } from "../ProductCard/ProductCard";
import "./TopThree.css";

export function TopPaintings() {

    const [paintings, setPaintings] = useState<PaintingModel[]>([]);

    useTitle("Featured Paintings");

    useEffect(() => {
        paintingService.getAllPaintings()
            .then(paintings => setPaintings(paintings.slice(0, 3)))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="TopThree">

            {paintings.map(p => <PaintingCard key={p._id} painting={p} />)}

        </div>
    );
}
