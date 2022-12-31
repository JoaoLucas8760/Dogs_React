import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import styles from "./UserHeaderNav.module.css";
import { ReactComponent as MyPhotosIcons } from "../../assets/MyPhotosIcons.svg";
import { ReactComponent as StatsIcon } from "../../assets/stats.svg";
import { ReactComponent as NewPostIcon } from "../../assets/new.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import useMidia from "../../Hooks/useMedia";

export default function UserHeaderNav() {
  const { userLogOut } = React.useContext(UserContext);

  const mobile = useMidia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }   `}
      >
        <NavLink to="/conta" end activeClassName={styles.active}>
          <MyPhotosIcons />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/conta/estaticas" activeClassName={styles.active}>
          <StatsIcon />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar" activeClassName={styles.active}>
          <NewPostIcon />
          {mobile && "Novo Post"}
        </NavLink>
        <button onClick={userLogOut}>
          <Logout />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
}
