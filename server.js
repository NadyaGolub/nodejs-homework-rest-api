const mongoose = require("mongoose");

const app = require('./app')
// eIAaJbf7e1KIJpYM
const DB_HOST = "mongodb+srv://Nadya:eIAaJbf7e1KIJpYM@cluster0.zwr14ev.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000)
})

  .catch(error => {
    console.log(error.message);
    process.exit(1);
})