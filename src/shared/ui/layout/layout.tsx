import { Link, NavLink, Outlet } from "react-router-dom";
import HeaderLogo from "../../assets/img/header-logo.png";

export const Layout = () => {
  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <a className="navbar-brand" href="/">
                <img src={HeaderLogo} alt="Bosa Noga" />
              </a>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <NavLink
                      to={"/"}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Главная
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={"/catalog"}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Каталог
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={"/about"}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      О магазине
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={"/contacts"}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Контакты
                    </NavLink>
                  </li>
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                    ></div>
                    {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                    <Link to={"cart"}>
                      <div className="header-controls-pic header-controls-cart">
                        <div className="header-controls-cart-full">1</div>
                        <div className="header-controls-cart-menu"></div>
                      </div>
                    </Link>
                  </div>
                  <form
                    data-id="search-form"
                    className="header-controls-search-form form-inline invisible"
                  >
                    <input className="form-control" placeholder="Поиск" />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
