import { updateProduct } from "@/app/(Engine)/actions/updateProduct"
import EditForm from "@/app/components/EditForm"
import { connectToDb } from "@/app/(Engine)/mongodb/database"
import Product from "@/app/(Engine)/models/productSchema"

const update = async ({ params }) => {
    console.log(params.prodId, "hello")

    
    connectToDb()
    const cluster = await Product.findById(params.prodId)
    const { name, category, price, description, image, slug } = cluster
    const format = {
         name, category, price, description, image, slug
    }
    
    return (
        <EditForm
            Updater={updateProduct}
            Parameter={params.prodId}
            Prod={format}
        />

    )

}

export default update;