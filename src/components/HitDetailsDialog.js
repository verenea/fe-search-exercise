import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { cleanValue } from '../util';
import NutrientsList from './NutrientsList';

export default function HitDetailsDialog(props) {
  const {
    onClose,
    open,
    details: { Categories, Name, ProductId, Tags, nutrition, ingredients }
  } = props;

  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up('lg'));

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={large ? 'lg' : 'md'}>
      <DialogTitle>
        {Name}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List sx={{ pt: 0, pb: 0, maxWidth: 860 }}>
          <ListItem>
            <ListItemText primary="Product Id" secondary={cleanValue(ProductId)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Categories" secondary={map(Categories, x => x.Name).join(' | ')} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Ingredients" secondary={cleanValue(ingredients)} />
          </ListItem>
        </List>

        <Box sx={{ fontSize: 12, padding: 2, pt: 0 }}>
          <Divider sx={{ m: '10px 0' }} />
          <div style={{ display: 'flex' }}>
            <Box sx={{ width: 320, fontSize: 12 }}>
              <Typography>Nutrition</Typography>
              {nutrition ? (
                <NutrientsList nutritionValues={nutrition[0]} />
              ) : (
                <Typography gutterBottom color="text.secondary" variant="p">
                  <em>Nutritional data unavailable</em>
                </Typography>
              )}
            </Box>
            <Box sx={{ width: 320, fontSize: 12 }}>
              <Typography>Dietary Info</Typography>
              {!isEmpty(Tags) ? (
                <ul style={{ margin: '0 0 0 1rem', padding: 0, listStyleType: 'square', fontSize: '.9rem' }}>
                  {map(Tags, t => {
                    return <li key={t.TagId} style={{ margin: '0 0 0 0.5rem' }}>{t.Name}</li>
                  })}
                </ul>
              ) : (
                <Typography gutterBottom color="text.secondary" variant="p">
                  <em>Dietary/Allergy unavailable</em>
                </Typography>
              )}
            </Box>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

HitDetailsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  details: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
};
