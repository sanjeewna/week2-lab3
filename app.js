const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

// Import pets data from the pets.js module
const petsData = require('./pets');

// GET endpoint to retrieve all pets
app.get('/pets', (req, res) => {
    res.json(petsData);
  });

  // POST endpoint to add a new pet
app.post('/pets', (req, res) => {
  const newPet = req.body; // The new pet data sent in the request body

  // Ensure that the new pet has the required properties (id, name, species, age)
  if (!newPet.id || !newPet.name || !newPet.species || !newPet.age) {
    return res.status(400).json({ error: 'Invalid pet data' });
  }

  // Add the new pet to the petsData array
  petsData.push(newPet);

  // Respond with a success message
  res.status(201).json({ message: 'Pet added successfully', pet: newPet });
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