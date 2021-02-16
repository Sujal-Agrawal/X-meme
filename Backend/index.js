const app = require('./app');
const port = process.env.PORT || 8081;
const swaggerPort = process.env.SWAGGER_PORT || 8080;
app.swagger.listen(swaggerPort,()=>{
    console.log(`SwaggerUI running on port ${process.env.SWAGGER_PORT}`);
  })
app.listen(port,()=>{
    console.log('Server is up on port ',port)
})