import { CaretDown, CaretUp } from '@phosphor-icons/react';
import Dropdown from '../dropdown/Dropdown.jsx';
import './DropdownFaq.css';

function DropdownFaq( { question, answer } ) {
    return (
        <Dropdown
            title={question}
            openIcon={<CaretUp size={28}/>}
            closedIcon={<CaretDown size={28}/>}
            closeOnContentClick={false}
            className="dropdown__faq-page"
        >
            <p className="faq__answer">
                {answer}
            </p>
        </Dropdown>
    );
}

export default DropdownFaq;