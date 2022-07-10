import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Box, Button, Card, Container, Divider, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';

import useSearchQuery from '../data/hooks/useSearchQuery';
import kittyApi from '../data/kitty-api';
import KittyCard from '../ui/kitty-card';
import SearchField from '../ui/search-field';

const Home = () => {
  const { queryText, setQueryText } = useSearchQuery();

  const { data, isLoading } = kittyApi.useGetKittiesQuery({
    searchQuery: queryText,
  });
  const [deleteKitty] = kittyApi.useDeleteKittyMutation();

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="flex-end" m={2}>
        <SearchField
          defaultValue={queryText}
          onSearchClick={(searchText) => {
            setQueryText(searchText);
          }}
        />
      </Box>
      <Divider sx={{ m: 2 }} />
      <Grid container spacing={1}>
        {data?.map((item) => {
          return (
            <Grid item key={item.id} xs={3}>
              <KittyCard
                onEditClick={() => {
                  navigate('/kitty/edit/' + item.id);
                }}
                onDeleteClick={() => {
                  deleteKitty(item.id);
                }}
                data={item}
              />
            </Grid>
          );
        })}
        {queryText ? null : (
          <Grid item xs={3}>
            <Card
              sx={{
                backgroundColor: grey[200],
                minHeight: 100,
                height: '100%',
                minWidth: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                aria-label="Add kitty"
                component={Link}
                to="/kitty/add"
                variant="contained"
              >
                Add
              </Button>
            </Card>
          </Grid>
        )}

        <Outlet />
      </Grid>
    </Container>
  );
};

export default Home;
