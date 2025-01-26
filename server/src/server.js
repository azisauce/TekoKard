const app = require("./app");
const connectDB = require("./data/database");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
