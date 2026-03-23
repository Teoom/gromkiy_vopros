import './Header.css';
import Logo from '../../assets/IgrovoiKLUB.svg';

export default function Header() {
  return (
    <header className='header'>
      <nav className='container'>
        <ul className='nav-list'>
          <li className='logo header-item'>
            <img src={Logo} alt='Логотип «Громкий Вопрос»' />
          </li>
          <li className='nav-list'>
            <a className='tel' href='tel:+79029197000'>
              +7 902 919 7000
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
