import mongoose from "mongoose"

await mongoose.connect('mongodb+srv://ludmi:lcordivi1198@cluster0.oxbotfj.mongodb.net/?retryWrites=true&w=majority')
console.log("Conectado a la base Mongo")

const cartSchema = new mongoose.Schema({
    products: [
        {
        productId:{type: mongoose.Schema.Types.ObjectId, ref: "products"},
        quantity: { type: Number }
        }
    ]
})

const Cart = mongoose.model('carts', cartSchema)

export { Cart }