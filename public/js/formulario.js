const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  password: /^.{8,16}$/
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.querySelector(`.${campo}`).classList.remove("ocultar");
    document.querySelector(`.${campo}`).classList.remove("fa-times-circle");
    document.querySelector(`.${campo}`).classList.add("fa-check-circle");
  } else {
    document.querySelector(`.${campo}`).classList.remove("ocultar");
    document.querySelector(`.${campo}`).classList.remove("fa-check-circle");
    document.querySelector(`.${campo}`).classList.add("fa-times-circle");
  }
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target ,'nombre' );
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target ,'apellido' );
      break;
    case "email":
      validarCampo(expresiones.email, e.target ,'email' );
      break;
    case "password":
      validarCampo(expresiones.password, e.target ,'password' );
      break;
    default:
      break;
  }
};

// formulario.addEventListener("submit", (e) => {
//   console.log("formulario enviado");
//   e.preventDefault();
// });

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
