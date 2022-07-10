import { Delete, Edit } from '@mui/icons-material';
import { Card, CardActions, CardContent, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';

import { IKitty } from '../../data/types';

type KittyCardProps = {
  data: IKitty;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const KittyCard = ({ data, onDeleteClick, onEditClick }: KittyCardProps) => {
  return (
    <Card sx={{ minWidth: 200, backgroundColor: grey[200] }}>
      <CardContent>{data.name}</CardContent>
      <CardActions>
        <IconButton
          aria-label={`Edit kitty ${data.name}`}
          onClick={onEditClick}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label={`Delete kitty ${data.name}`}
          onClick={onDeleteClick}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default KittyCard;
