import { useState } from "react";
export const useFormErrors = (inputValue) => {
  const [values, setValues] = useState(inputValue);
  const [errors, setErrors] = useState({});

  const inputControl = (e) => {
    const { name, value } = e.target; // prendo nome e valore dell'input

    setValues((prev) => ({
      // prendo lo stato attuale prima che venga aggiornato
      ...prev, // aggiorno lo stato inserendo il nome e il valore dell'input es:
      [name]: value, // se si compila l'input email name sarà email e value sarà l'input dell'utente
    }));
  };

  const validateInput = (options = {}) => {
    const errorsInput = {};

    if (!values.firstName || values.firstName.trim().length < 2) {
      errorsInput.firstName = "Nome troppo corto";
    }
    if (!values.lastName || values.lastName.trim().length < 2) {
      errorsInput.lastName = "Cognome troppo corto";
    }

    if (!values.email) {
      errorsInput.email = "Email obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errorsInput.email = "Email non valida";
    }

    if (!values.password) {
      errorsInput.password = "Password obbligatoria";
    } else if (values.password.length < 8) {
      errorsInput.password = "Password minimo 8 caratteri";
    }
    /*const dateStr = values.dateOfBirth;
    const year = dateStr.getYear();
    const now = Date.now();
    const yearNow = now.getYear();
    if (!dateStr) {
      errorsInput.dateOfBirth = "La data è richiesta";
    } else if (year - yearNow) {
    } else {
      const date = new Date(dateStr);
      if (Number.isNaN(date.getTime())) {
        errorsInput.dateOfBirth = "Data non valida";
      } else if (options.noFuture && date > new Date()) {
        errorsInput.dateOfBirth = "Arrivi dal futuro?";
      }
    }*/
    if (!values.country) {
      errorsInput.country = "Country obbligatoria";
    }
    setErrors(errorsInput);

    return errorsInput;
  };

  return {
    values,
    errors,
    inputControl,
    validateInput,
  };
};
