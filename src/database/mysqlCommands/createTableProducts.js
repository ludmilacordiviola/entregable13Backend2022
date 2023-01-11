const database = require('../databaseMysql.js')

const createTableInsertProducts = async () => {
    try {
        await database.schema.dropTableIfExists('products')

        await database.schema.createTable('products', table =>{
            table.increments('id').primary()
            table.string('title', 150).notNullable()
            table.string('price', 50).notNullable()
            table.string('thumbnail', 150).notNullable()
        })
        console.log("Products table Created")

        const products = [
            {
                "title": "Led Zeppelin: Celebration Day",
                "price": 670,
                "thumbnail": "https://discography.ledzeppelin.com/images/cd.jpg",
                "id": 1
            },
            {
                "title": "Led Zeppelin: Mothership",
                "price": 580,
                "thumbnail": "https://discography.ledzeppelin.com/images/ms.jpg",
                "id": 2
            },
            {
                "title": "Led Zeppelin: The Complete BBC Sessions",
                "price": 450,
                "thumbnail": "https://discography.ledzeppelin.com/images/bbc.jpg",
                "id": 3
            }
        ]

        await database('products').insert(products)

        console.log('products inserted!')

        database.destroy()

    } catch (error) {
        console.log(error)
    }
}

createTableInsertProducts()