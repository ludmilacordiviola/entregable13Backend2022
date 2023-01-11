const database = require('../databaseSqlite.js')

const createTableInsertChat = async () => {
    try {
        await database.schema.dropTableIfExists('chat')

        await database.schema.createTable('chat', table => {
            table.increments('id').primary()
            table.string('userEmail', 100).notNullable()
            table.string('message', 500). notNullable()
        })

        console.log("Chat talbe created")

        const chats = [
            {
                "userEmail": "ludmilaC2022@gmail.com [28/6/2022 23:38:12]",
                "message": "Buenas Tardes!"
            },
            {
                "userEmail": "estefaniaS1234@hotmail.com [28/6/2022 23:38:12]",
                "message": "Hola, buenas tardes!"
            },
            {
                "userEmail": "martinFR@hotmail.com [28/6/2022 23:37:00]",
                "message": "Hola, como estan?!"
            }
        ]

        await database('chat').insert(chats)

        console.log("History chat added!")

        database.destroy()

    } catch (error) {
        console.log(error)
    }
}

createTableInsertChat()