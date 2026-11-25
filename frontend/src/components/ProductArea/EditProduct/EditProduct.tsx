import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PaintingModel } from "../../../Models/PaintingModel";
import { UserModel } from "../../../Models/UserModel";
import { paintingService } from "../../../Services/PaintingService";
import "./EditProduct.css";
import { useEffect } from "react";
import { useTitle } from "../../../Utils/UseTitle";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/Store";

export function EditPainting() {

    useTitle("Edit Painting");

    const { register, handleSubmit, setValue } = useForm<PaintingModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id as string;
    const user = useSelector((state: RootState) => state.user);

    // Check if user is admin
    useEffect(() => {
        if (!user || (user as UserModel).roleId !== 1) {
            notify.error("Only admins can edit paintings");
            navigate("/paintings");
        }
    }, [user, navigate]);

    useEffect(() => {
        paintingService.getOnePainting(id)
            .then(painting => {
                setValue("title", painting.title);
                setValue("description", painting.description);
                setValue("price", painting.price);
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(painting: PaintingModel) {
        try {
            painting._id = id;
            const fileList = painting.imageName as unknown as FileList;
            if (fileList && fileList[0]) {
                painting.imageName = fileList[0];
            }
            await paintingService.updatePainting(painting);
            notify.success("Painting has been updated.");
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
        <div className="EditProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Title: </label>
                <input type="text" {...register("title")} required minLength={2} maxLength={100} />

                <label>Description: </label>
                <textarea {...register("description")} required minLength={5} maxLength={500} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="1000000" />

                <label>Image: </label>
                <input type="file" {...register("imageName")} accept="image/*" />

                <button>Update</button>

            </form>

        </div>
    );
}
