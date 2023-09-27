import { app } from "./app.js"
import { db } from "./data/database.js"


db();
app.listen(process.env.PORT, () => {
    console.log("server is working")
})