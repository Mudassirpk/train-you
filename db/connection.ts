import mongoose from "mongoose";

export default async function connect_db() {
  const connection_uri = process.env.MONGO_URI;
  if (!connection_uri) throw new Error("MongoDB credentials not found");
  try {
    if (
      !(
        mongoose.connections[0].readyState ===
        mongoose.ConnectionStates.connected
      )
    ) {
      const connection = await mongoose.connect(connection_uri);
      if (
        connection.connections[0].readyState ===
        connection.ConnectionStates.connected
      ) {
        console.log("database connected....");
      }
    }
  } catch (e) {
    console.log(e);
  }
}
