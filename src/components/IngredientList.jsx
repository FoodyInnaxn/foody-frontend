import React from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

function IngredientList({ setIngredients, ingredients }) { // Accept setIngredients and ingredients as props
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleIngredientNameChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = event.target.value;
    setIngredients(newIngredients);
  };

  const handleIngredientQuantityChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = event.target.value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddIngredient}>Add Ingredient</Button>
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <ListItemText>
              <TextField
                label={`Ingredient ${index + 1} Name`}
                value={ingredient.name}
                onChange={(event) => handleIngredientNameChange(index, event)}
              />
              <TextField
                label={`Ingredient ${index + 1} Quantity`}
                value={ingredient.quantity}
                onChange={(event) => handleIngredientQuantityChange(index, event)}
              />
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveIngredient(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default IngredientList;
