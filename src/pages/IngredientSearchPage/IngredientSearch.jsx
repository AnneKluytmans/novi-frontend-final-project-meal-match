import { useForm } from 'react-hook-form';
import { MagnifyingGlass } from '@phosphor-icons/react';
import IngredientsIcon from '../../assets/icons/ingredients-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import InputField from '../../components/form/inputField/InputField.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import isQueryValid from '../../helpers/isQueryValid.js';
import './IngredientSearch.css';


function IngredientSearch() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onTouched',
    });

    const maxQueryLength = 150;

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
      <>
        <Header
            title="Ingredient Search"
            subtitle="Discover delicious recipes with what you have on hand. Just enter your ingredients."
            icon={<IngredientsIcon className="header__icon"/>}
        />
        <section className="outer-content-container">
            <div className="inner-content-container__column">
                <SectionDivider title="Search by ingredients" />
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputField
                        id="ingredients-field"
                        type="text"
                        name="ingredients"
                        placeholder="tomato, cheese, carrot"
                        register={register}
                        validation={{
                            required: 'Ingredients are required',
                            validate: isQueryValid,
                            maxLength: { value: maxQueryLength, message: `Ingredients query cannot exceed ${maxQueryLength} characters` },
                        }}
                        error={errors.ingredients}
                    />
                    <Button
                        type="submit"
                        className="btn btn-search"
                    >
                        <MagnifyingGlass size={32}/>
                    </Button>
                </form>
            </div>
        </section>
      </>
    );
}

export default IngredientSearch;

