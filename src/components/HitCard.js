import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { amber, green, grey, lightBlue, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Barcode from 'react-barcode';
import { Highlight } from 'react-instantsearch-dom';
import { isGlutFree, isKeto, isAllergyFree, isVegan } from '../util';
import DietaryInfoBadge from './DietaryInfoBadge';

export default function HitCard({ hit, onHitClick, containerClass = '' }) {
  const theme = useTheme();
  const { Sku, Categories, Tags } = hit;
  return (
      <Card
        component="article"
        className={containerClass}
        sx={{ '& :hover': { background: theme.palette.mode === 'dark' ? grey[900] : grey[100] } }}
      >
        <CardActionArea
          onClick={() => onHitClick(hit)}
          className="flex-vert"
          sx={{ display: 'flex', height: '100%', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <CardContent sx={{ width: '100%' }}>
            <CardMedia alt={Sku}>
              <div style={{ textAlign: 'center' }}>
                {/*-- WOULD PREFER TO USE PRODUCT IMAGE, but unable to map hit.Image filePath to an accessible graphic --*/}
                {/*-- So, instead, here's this ditty that's unique to each hit --*/}
                {/*-- https://github.com/kciter/react-barcode --*/}
                <Barcode
                  value={Sku}
                  height={32}
                  fontSize={14}
                  lineColor={theme.palette.mode === 'dark' ? lightBlue[500] : grey[800]}
                  background="transparent"
                />
              </div>
            </CardMedia>
            {Categories.length > 0 && (
              <Typography color="text.secondary" gutterBottom sx={{ fontSize: 14, fontWeight: 500 }}>
                {Categories[Categories.length - 1].Name}
              </Typography>
            )}
            <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>
              <Highlight attribute="Name" hit={hit} />
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13, lineHeight: 1.1, fontWeight: 350 }}>
              <Highlight attribute="Description" hit={hit} />
            </Typography>
          </CardContent>
          <Stack direction="row" spacing={1} sx={{ p: 2 }}>
            {isGlutFree(Tags) && <DietaryInfoBadge label="GF" title="Gluten-Free" size={24} color={grey[400]} fontSize={14} />}
            {isVegan(Tags) && <DietaryInfoBadge label="V" title="Vegan" size={24} color={green[300]} fontSize={14} />}
            {isKeto(Tags) && <DietaryInfoBadge label="K" title="Keto-Friendly" size={24} color={amber[400]} fontSize={14} />}
            {isAllergyFree(Tags) && <DietaryInfoBadge label="AF" title="Major 8 Allergy Free" size={24} color={red[300]} fontSize={14} />}
          </Stack>
        </CardActionArea>
        {/*-- could add buttons via <CardActions />, but sort went with the little dietary icons for now (above) --*/}
      </Card>
  );
}

HitCard.propTypes = {
  hit: PropTypes.shape({
    Sku: PropTypes.string.isRequired,
    Categories: PropTypes.array.isRequired,
    Tags: PropTypes.array.isRequired
  }).isRequired,
  onHitClick: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};
