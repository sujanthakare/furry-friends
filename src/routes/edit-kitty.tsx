import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

const EditKitty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateKitty] = kittyApi.useUpdateKittyMutation();

  const { data, isLoading } = kittyApi.useGetKittyQuery(parseInt(id || '0'), {
    skip: !id,
  });

  const [formState, setFormState] = useState({
    name: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (data) {
      setFormState({
        name: data?.name,
        dateOfBirth: data?.dateOfBirth,
      });
    }
  }, [data]);

  if (!id) {
    return null;
  }

  return (
    <Dialog open>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateKitty({
            id: parseInt(id),
            ...formState,
          }).then(() => {
            navigate('/kitty');
          });
        }}
      >
        <DialogTitle>Edit kitty</DialogTitle>
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
          <Stack flexDirection="row" columnGap={1}>
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

export default EditKitty;
