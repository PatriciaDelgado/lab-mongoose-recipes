const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
//añadimos el modelo
const Recipe = require('./models/recipe.model');
const recipes = require('./data.js');
//conectdos a la bbdd
require('./configs/db.config');

//Crear una receta como objeto:
const recipe = {
  title: 'Flan de huevo',
  level: 'Amateur Chef',
  ingredients: [
    '5 huevos', 
    '1 taza de azúcar', 
    '1 taza de polvo de hada', 
    '4 yogures', 
    '1 1/2 taza de miel', 
    '1 taza de aceite', 
    '2 teaspoons vanilla extract', 
    '1 taza de entusiasmo', 
    '3 tazas de aroma de vainilla'],
  cuisine: 'Española',
  dishType: ['Drink'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: 53,
  creator: 'Chef Patri'
}

//Creamos nuestra receta
Recipe.create(recipe)
  .then((recipe) => {
    console.info('- Created recipe', recipe.title);
    return Recipe.insertMany(recipes); //un insertMany va seguido de una promesa que devuelve
  })
  .then((recipes) => {
    console.info('Insert many iteration');
    for (let recipe of recipes) {
      console.info('- Created recipe', recipe.title);
    }
    return Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    },
    { 
      $set: { 
        duration: 100 
      } 
    }, 
    { 
      new: true 
    })
  })
  .then((recipe) => {
    console.info('Updated Rigatoni recipe duration');
    console.info(`${recipe.title} successfully updated!`);
  })
  .catch(error => console.error(`Ha habido un error con las recetas`, error))
  //para limpiar la base de datos
  //.then(() => {
    //console.info('Limpiar base de datos');
    //return mongoose.connection.dropDatabase();
  //})
  //.catch(error => console.error(`Ha habido un error con las recetas`, error))