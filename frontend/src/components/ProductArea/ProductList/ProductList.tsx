import { useEffect, useState } from "react";
import type { PaintingModel } from "../../../Models/PaintingModel";
import { paintingService } from "../../../Services/PaintingService";
import { useTitle } from "../../../Utils/UseTitle";
import { PaintingCard } from "../ProductCard/ProductCard";
import "./ProductList.css";
import { notify } from "../../../Utils/Notify";
import { Loading } from "../../SharedArea/Loading/Loading";

export function PaintingList() {

    const [paintings, setPaintings] = useState<PaintingModel[]>([]);

    useTitle("Paintings");
    
    useEffect(() => {
        paintingService.getAllPaintings()
            .then(paintings => setPaintings(paintings))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="ProductList">

            { paintings.length === 0 && <Loading /> }

            {paintings.map(p => <PaintingCard key={p._id} painting={p} />)}

        </div>
    );
}
