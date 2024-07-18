import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/homePage/Home.jsx';
import SignIn from './pages/signInPage/SignIn.jsx';
import SignUp from './pages/signUpPage/SignUp.jsx';
import RecipeQuiz from './pages/recipeQuizPage/RecipeQuiz.jsx';
import IngredientSearch from './pages/IngredientSearchPage/IngredientSearch.jsx';
import AllRecipes from './pages/allRecipesPage/AllRecipes.jsx';
import RecipeDetails from './pages/recipeDetailsPage/RecipeDetails.jsx';
import Profile from './pages/profilePage/Profile.jsx';
import FavoriteRecipes from './pages/favoriteRecipesPage/FavoriteRecipes.jsx';
import Contact from './pages/contactPage/Contact.jsx';
import Faq from './pages/faqPage/Faq.jsx';
import TermsAndPolicy from './pages/termsAndPolicyPage/TermsAndPolicy.jsx';
import NotFound from './pages/notFoundPage/NotFound.jsx';
import Footer from './components/footer/Footer.jsx';
import './App.css';


function App() {
  const [footerClassName, setFooterClassName] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/sign-in' || location.pathname === '/sign-up') {
      setFooterClassName('footer--light');
    } else {
      setFooterClassName('footer--default');
    }
  }, [location]);

  return (
      <>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/recipe-quiz" element={<RecipeQuiz/>}/>
            <Route path="/ingredient-search" element={<IngredientSearch/>}/>
            <Route path="/all-recipes" element={<AllRecipes/>}/>
            <Route path="/recipe-details/:id" element={<RecipeDetails/>}/>
            <Route path="/favorite-recipes" element={<FavoriteRecipes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/faq" element={<Faq/>}/>
            <Route path="/terms-and-policy" element={<TermsAndPolicy/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer className={footerClassName}/>
      </>
  )
}

export default App
