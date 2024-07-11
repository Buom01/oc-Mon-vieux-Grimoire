const mongoose = require('mongoose');
const uri = "mongodb+srv://bastienadambuom01:kaykWXj65EcaKn8a@ocmonvieuxgrimoire.sz9gl7b.mongodb.net/?retryWrites=true&w=majority&appName=ocMonVieuxGrimoire";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    // Ensures that the client will close on error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

module.exports = mongoose;