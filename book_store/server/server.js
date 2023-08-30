const express = require("express");
const app = express();
const PORT = "8000";
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./modules/routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");


dotenv.config({path: './config.env'});

//commit

const url = process.env.DATABASE;
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use('/api', routes);


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the database');
})
    .catch((error) => {
        console.error('Connection error:', error);
    });


const dataSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    thumbnailUrl: String
    // Define your schema fields here
});
const Data = mongoose.model('books', dataSchema);






app.get("/", async (req, res) => {
    try {
      const data = await Data.find({}, '_id title thumbnailUrl');
      res.status(200).json({ data: data }); // Send the fetched data to the frontend
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});