const express = require('express');
const app = express();

// OJO los middleware se usan antes de definir las rutas

// Creando un middleware
function logger(req, res, next) {
  console.log('Middleware executed');
  console.log(`TargetUrl: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

// Para que express entienda las peticiones json ejem en: res.body de /user |POST se utiliza el siguiente middleware
app.use(express.json());
// Instanciación del middelware
app.use(logger);


app.get('/', (req, res) => {
  res.send('<h1>Server ok</h1>')
})

/* 
  Se ejecuta para todos los metodos http que coincidan con la ruta, en este caso "/user".
  Notar el parámetro "next" se agrega para que tambien ejecute la siguiente coincidencia para /user
  incluyendo "/user |GET", "/user/:id |POST", etc.
*/
/* app.all('/user', (req, res, next) => {
  console.log('Method all for /user was executed');
  next();
}) */

app.get('/user', (req, res) => {
  res.json({
    name: 'Jhon',
    lastname: 'Doe'
  })
})

app.post('/user', (req, res) => {
  console.log(req.body);
  res.send('Post request received');
})

// Peticion POST con pase de parametro en la url
app.post('/user/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.params.id);
  res.send('Post request received with params');
})


app.listen(3000, () => {
  console.log('Server on port 3000');
})