const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
const app = express();
const PORT =  process.env.PORT || 4002

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

module.exports = app;
