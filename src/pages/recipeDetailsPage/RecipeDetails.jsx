import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails() {
    const { id } = useParams();
    return (
      <>
          <h1>Recipe Details</h1>
          <p>Recipe ID = {id}</p>
      </>
    );
}

export default RecipeDetails;