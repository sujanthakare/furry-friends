import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import kittyApi from '../data/kitty-api';

const AddKitty = () => {
  const navigate = useNavigate();
  const [addKitty, { isLoading }] = kittyApi.useCreateKittyMutation();

  const [formState, setFormState] = useState({
    name: '',
    dateOfBirth: '',
  });

  return (
    <Dialog open>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addKitty({
            ...formState,
          }).then(() => {
            navigate('/kitty');
          });
        }}
      >
        <DialogTitle>Add kitty</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              value={formState.name}
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
              autoFocus
              label="Name"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={formState.dateOfBirth}
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  dateOfBirth: e.target.value,
                }));
              }}
              label="Date of birth"
              type="date"
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack flexDirection="row" columnGap={2}>
            <Button
              component={Link}
              to="/kitty"
              variant="contained"
              color="error"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {isLoading ? 'Saving....' : 'Save'}
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddKitty;
