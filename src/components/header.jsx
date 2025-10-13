// header componet

const Header = () => {
  const { Link } = ReactRouterDOM;
  
  return (
    <header>
      <Link to="/" class="logo">
        fewercharacter.com
      </Link>
      <nav aria-label="main-navigation">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

window.Header = Header;
