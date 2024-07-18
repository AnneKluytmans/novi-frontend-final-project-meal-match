import './Header.css';

function Header( { title, subtitle, icon } ) {
    return (
        <header className="header outer-content-container">
            <div className="header__content-wrapper inner-content-container__row">
                <div className="default-text-restrictor">
                    <h1 className="header__title">{title}</h1>
                    <h3>{subtitle}</h3>
                </div>
                <div className="header__icon-wrapper">
                    <span>{icon}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;