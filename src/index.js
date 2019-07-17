const express = require('express');
const morgan = require('morgan');
var path = require('path');

const app = express();


// Settings
app.set('appName', 'Fatz express tutorial');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// Middlewares
// OJO los middleware se usan antes de definir las rutas

// Middleware personalizado
function logger(req, res, next) {
  console.log('Middleware executed');
  console.log(`TargetUrl: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}
// Instanciación del middelware personalizado
app.use(logger);

// Para que express entienda las peticiones json ejem en: res.body de /user |POST se utiliza el siguiente middleware
app.use(express.json());

// Middleware de morgan para hacer un log de la peticion = a al md personalizado
app.use(morgan('dev'));




// Routes
app.get('/', (req, res) => {
  // Simulando una query a la DB
  const data = [{name: 'john'}, {name: 'joe'}, {name: 'cameron'}];

  // Enviando la query a la plantilla
  res.render('index.ejs', {people: data});
})

/* 
  La siguiente ruta se ejecuta para todos los metodos http que coincidan con la ruta, en este caso "/user".
  Notar el parámetro "next" se agrega para que tambien ejecute la siguiente coincidencia para /user
  incluyendo "/user |GET", "/user/:id |POST", etc.
*/
app.all('/user', (req, res, next) => {
  console.log('Method all for /user was executed');
  next();
})

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


// Sirviendo archivos estáticos
app.use(express.static('public'));

// Escucha del servidor
app.listen(3000, () => {
  console.log(app.get('appName'));
  console.log('Server on port 3000');
})