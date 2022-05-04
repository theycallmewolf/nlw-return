import express from "express";

const app = express();

app.get("/test", (req, res) => {
  return res.send("Hello Wolf!");
});

app.listen(3333, () => {
  console.log(`
  -----
  server running on port 3333
  -----
`);
});
