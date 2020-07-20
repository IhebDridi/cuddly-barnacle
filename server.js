const http = require("http")
const port = process.env.PORT || 3000;

const app = require("./app");
const server = http.createServer(app);




server.listen(4000,()=>{
    console.log("listening on port:",4000)
});