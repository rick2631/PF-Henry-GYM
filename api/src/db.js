require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE
} = process.env;

const sequelize = new Sequelize(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  // Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Exercise, Bodypart, Muscle, Routine, Product, User, Bodysale, Headersale, Categoryproduct, Review} = sequelize.models;

// Aca vendrian las relaciones

// User.hasOne(Routine);
// Routine.belongsTo(User)

// Routine.belongsToMany(Exercise, {through: 'Exercise_Routine'});
// Exercise.belongsToMany(Routine, {through: 'Exercise_Routine'});

// Muscle.hasMany(Exercise);
// Exercise.belongsTo(Muscle);

// Bodypart.hasMany(Exercise);
// Exercise.belongsTo(Bodypart);

Headersale.hasMany(Bodysale);
Bodysale.belongsTo(Headersale);

Product.hasOne(Bodysale);
Bodysale.belongsTo(Product);

Categoryproduct.hasMany(Product);
Product.belongsTo(Categoryproduct);

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
