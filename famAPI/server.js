const dotenv = require('dotenv');

const mongoose = require('mongoose');

// uses dotenv node package to set config.env as the file with environment variables
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log('DATABASE CONNECTED!'));
const port = process.env.PORT || 4000;

//callback func is called as soon as server starts listening
app.listen(port, () => {
  console.log(`Server running on port:  ${port}...`);
});
