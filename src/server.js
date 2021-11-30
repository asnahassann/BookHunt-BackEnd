require("./db/connection"); 
const express = require("express") 
const cors = require("cors");
const userRouter = require("./user/user.routes")
const app = express(); 
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors()); 
app.use(userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
