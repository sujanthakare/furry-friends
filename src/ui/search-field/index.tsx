import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';

type Props = {
  defaultValue: string;
  onSearchClick: (searchText: string) => void;
};

const SearchField = ({ onSearchClick, defaultValue }: Props) => {
  const [state, setState] = useState(defaultValue || '');

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={(e: any) => {
        e.preventDefault();
        onSearchClick(state);
      }}
    >
      <InputBase
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search kitties"
        inputProps={{ 'aria-label': 'search kitties' }}
        endAdornment={
          <IconButton
            onClick={() => {
              setState('');
              onSearchClick('');
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchField;
