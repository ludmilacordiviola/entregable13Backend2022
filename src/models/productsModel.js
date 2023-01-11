import mongoose from "mongoose"

await mongoose.connect('mongodb+srv://ludmi:lcordivi1198@cluster0.oxbotfj.mongodb.net/?retryWrites=true&w=majority')
console.log("Conectado a la base Mongo")

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const Product = mongoose.model('products', productSchema)

export { Product }