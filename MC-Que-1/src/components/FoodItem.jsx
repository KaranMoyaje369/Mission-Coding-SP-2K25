import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function FoodItem({ selectedFood }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="!container !mx-auto flex justify-center">
      <Card className="w-full md:w-1/2">
        <CardMedia
          component="img"
          image={selectedFood.image}
          alt="Paella dish"
          className="h-[300px]"
        />
        <div className="p-5">
          <CardContent>
            <Typography variant="h5" sx={{ color: "text.secondary" }}>
              {selectedFood.name}
            </Typography>
          </CardContent>
          <CardContent className="flex justify-between flex-wrap">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Meal Type : {selectedFood.mealType}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cooking Time : {selectedFood.cookTimeMinutes} Minutes.
            </Typography>
          </CardContent>
          <CardContent className="flex justify-between flex-wrap">
            <div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Rating : {selectedFood.rating} ⭐
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Review : {selectedFood.reviewCount}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Difficulty : {selectedFood.difficulty}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Calories : {selectedFood.caloriesPerServing}
              </Typography>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Ingredients:
              </Typography>
              <div sx={{ marginBottom: 2 }}>
                <ul>
                  {selectedFood.ingredients.map((ingredient, id) => (
                    <li key={id} className="list-disc">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Instructions:
              </Typography>
              <div sx={{ marginBottom: 2 }}>
                <ul>
                  {selectedFood.instructions.map((instruction, id) => (
                    <li key={id} className="list-disc">
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </div>
  );
}
