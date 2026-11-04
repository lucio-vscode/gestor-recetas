import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/agregar", label: "Agregar receta" },
  { to: "/contacto", label: "Contacto" },
];

function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <span className={styles.logo}>🍳 Gestor de Recetas</span>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
