import "./common/env";
import Database from "./common/database";
import Server from "./common/server";
import routes from "./routes";

const port = parseInt(process.env.PORT || "3000");
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST ||
      "mongodb+srv://dbAdmin:PEPEPECASPICAPAPAS@cluster0-zzuli.gcp.mongodb.net/test?retryWrites=true&w=majority"
    : process.env.MONGODB_URI_DEV ||
      "mongodb+srv://dbAdmin:PEPEPECASPICAPAPAS@cluster0-zzuli.gcp.mongodb.net/test?retryWrites=true&w=majority";

const db = new Database('mongodb+srv://dbAdmin:PEPEPECASPICAPAPAS@cluster0-zzuli.gcp.mongodb.net/test?retryWrites=true&w=majority');
export default new Server()
  .database(db)
  .router(routes)
  .listen(port);
