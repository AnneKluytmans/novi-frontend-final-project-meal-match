import { CaretRight } from '@phosphor-icons/react';
import Button from '../button/Button.jsx';

function NextButton( { count, setCount, maxCount } ) {
    return (
        <Button
            disabled={ count === maxCount }
            onClick={ () => {setCount(count + 1)} }
            className="btn btn__next-prev"
        >
            <CaretRight size={24} weight="bold" stroke="#EEFFCA" strokeWidth={6}/>
        </Button>
    );
}

export default NextButton;