const express = require('express');
const app = express();
const port = 3000;

// Import pets data from the pets.js module
const petsData = require('./pets');

// GET endpoint to retrieve all pets
app.get('/pets', (req, res) => {
    res.json(petsData);
  });
  
  // GET endpoint to retrieve the count of all pets
  app.get('/pets/count', (req, res) => {
    const petCount = petsData.length;
    res.json({ count: petCount });
  });
  
  // GET endpoint to retrieve a specific pet by ID
  app.get('/pets/:id', (req, res) => {
    const petId = parseInt(req.params.id);
    const pet = petsData.find((p) => p.id === petId);
    if (!pet) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    res.json(pet);
  });
  
  // GET endpoint to retrieve pets of a specific species
  app.get('/pets/species/:species', (req, res) => {
    const species = req.params.species.toLowerCase();
    const filteredPets = petsData.filter((p) => p.species.toLowerCase() === species);
    res.json(filteredPets);
  });
  
  // GET endpoint to retrieve pets of a specific age
  app.get('/pets/age/:age', (req, res) => {
    const age = parseInt(req.params.age);
    const filteredPets = petsData.filter((p) => p.age === age);
    res.json(filteredPets);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});