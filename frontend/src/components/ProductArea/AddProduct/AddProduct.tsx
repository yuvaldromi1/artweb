import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PaintingModel } from "../../../Models/PaintingModel";
import { UserModel } from "../../../Models/UserModel";
import { paintingService } from "../../../Services/PaintingService";
import "./AddProduct.css";
import { useTitle } from "../../../Utils/UseTitle";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/Store";
import { useEffect } from "react";

export function AddPainting() {

    useTitle("Add Painting");

    const { register, handleSubmit } = useForm<PaintingModel>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    // Check if user is admin
    useEffect(() => {
        if (!user || (user as UserModel).roleId !== 1) {
            notify.error("Only admins can add paintings");
            navigate("/paintings");
        }
    }, [user, navigate]);

    async function send(painting: PaintingModel) {
        try {
            const fileList = painting.imageName as unknown as FileList;
            if (!fileList || !fileList[0]) {
                throw new Error("Please select an image");
            }
            painting.imageName = fileList[0];
            await paintingService.addPainting(painting);
            notify.success("Painting has been added.");
            navigate("/paintings");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Only render if user is admin
    if (!user || (user as UserModel).roleId !== 1) {
        return null;
    }

    return (
        <div className="AddProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Title: </label>
                <input type="text" {...register("title")} required minLength={2} maxLength={100} />

                <label>Description: </label>
                <textarea {...register("description")} required minLength={5} maxLength={500} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="1000000" />

                <label>Image: </label>
                <input type="file" {...register("imageName")} required accept="image/*" />

                <button>Add</button>

            </form>

        </div>
    );
}
