import { useState } from "react";
import useForm from "../hooks/useForm";
import styles from "./Forms.module.css";

function Contact() {
  const { values, handleChange, reset } = useForm({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !values.name.trim() ||
      !values.email.includes("@") ||
      !values.message.trim()
    ) {
      setError("Completá todos los campos con un email válido.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    reset();
  }

  return (
    <section>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {sent && (
          <p className={styles.success}>¡Gracias! Tu mensaje fue enviado.</p>
        )}

        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Contact;
