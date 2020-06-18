import mongoose from "mongoose";

// clear database after connected
before(function (done) {
  this.timeout(25000);
  const db = mongoose.connection;
  db.once("open", async () => {
    await db.dropDatabase().then(() => done());
    setTimeout(done, 30000);
  });
});
