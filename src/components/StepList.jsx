import React from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

function StepList({ steps, setSteps }) { // Accept steps and setSteps as props
  const handleAddStep = () => {
    setSteps([...steps, { text: '' }]);
  };

  const handleStepTextChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index].text = event.target.value;
    setSteps(newSteps);
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddStep}>Add Step</Button>
      <List>
        {steps.map((step, index) => (
          <ListItem key={index}>
            <ListItemText>
              <TextField
                label={`Step ${index + 1}`}
                value={step.text}
                onChange={(event) => handleStepTextChange(index, event)}
              />
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveStep(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default StepList;
