let historias = JSON.parse(localStorage.getItem("historias")) || [];
let usuario = "";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", iniciarSesion);
  document.getElementById("formHistoria").addEventListener("submit", crearHistoria);
  document.getElementById("crearOtra").addEventListener("click", mostrarOpcionesOtraHistoria);
  document.getElementById("mismaPersona").addEventListener("click", () => {
    resetFormulario(usuario);
  });
  document.getElementById("otraPersona").addEventListener("click", () => {
    resetFormulario("");
  });
  document.getElementById("verPropias").addEventListener("click", () => mostrarHistoriasFiltradas(true));
  document.getElementById("verOtras").addEventListener("click", () => mostrarHistoriasFiltradas(false));
});

function iniciarSesion() {
  const nombre = document.getElementById("nombreUsuario").value.trim();
  if (nombre) {
    usuario = nombre;
    localStorage.setItem("usuario", usuario);
    document.getElementById("login").classList.add("hidden");
    document.getElementById("formularioHistoria").classList.remove("hidden");
    document.getElementById("nombreMostrado").textContent = usuario;
    document.getElementById("tituloPrincipal").textContent = `¡Bienvenida/o ${usuario} al Generador de Historias!`;
  }
}

function crearHistoria(e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombreMostrado").textContent,
    edad: document.getElementById("edad").value,
    genero: document.getElementById("genero").value.toLowerCase(),
    lugar: document.getElementById("lugar").value,
    objetoMagico: document.getElementById("objetoMagico").value,
    generoObjeto: document.getElementById("generoObjeto").value.toLowerCase()
  };

  historias.push(datos);
  localStorage.setItem("historias", JSON.stringify(historias));
  mostrarHistoria(datos);
}

function mostrarHistoria(datos) {
  let introduccion, finales;
  if (datos.genero === "niña") {
    introduccion = `En una tierra lejana, ${datos.nombre}, una valiente aventurera de ${datos.edad} años, paseaba por ${datos.lugar}.`;
    finales = [
      "Decidió usarlo para ayudar a su pueblo y se convirtió en una heroína.",
      "El objeto era demasiado poderoso y terminó perdiéndose en su magia.",
      "Vendió el objeto por una fortuna y vivió como una reina."
    ];
  } else {
    introduccion = `En una tierra lejana, ${datos.nombre}, un valiente aventurero de ${datos.edad} años, paseaba por ${datos.lugar}.`;
    finales = [
      "Decidió usarlo para ayudar a su pueblo y se convirtió en un héroe.",
      "El objeto era demasiado poderoso y terminó perdiéndose en su magia.",
      "Vendió el objeto por una fortuna y vivió como un rey."
    ];
  }

  let conflicto = datos.generoObjeto === "una"
    ? `Un día, encontró una misteriosa ${datos.objetoMagico} con gran poder.`
    : `Un día, encontró un misterioso ${datos.objetoMagico} con gran poder.`;

  const finalElegido = finales[Math.floor(Math.random() * finales.length)];
  const historiaCompleta = `${introduccion} ${conflicto} ${finalElegido}`;

  document.getElementById("historiaFinal").textContent = historiaCompleta;
  document.getElementById("resultado").classList.remove("hidden");
  document.getElementById("filtroHistorias").classList.remove("hidden");
}

function mostrarOpcionesOtraHistoria() {
  document.getElementById("opcionesOtraHistoria").classList.remove("hidden");
}

function resetFormulario(nombre) {
  document.getElementById("formHistoria").reset();
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("opcionesOtraHistoria").classList.add("hidden");
  document.getElementById("formularioHistoria").classList.remove("hidden");

  if (nombre) {
    document.getElementById("nombreMostrado").textContent = nombre;
  } else {
    const nuevoNombre = prompt("¿Cuál es el nombre de la otra persona?");
    document.getElementById("nombreMostrado").textContent = nuevoNombre || "Visitante";
  }
}

function mostrarHistoriasFiltradas(propias) {
  const nombreUsuario = localStorage.getItem("usuario");
  const lista = document.getElementById("listaHistorias");
  lista.innerHTML = "";

  const historiasFiltradas = historias.filter(hist => propias
    ? hist.nombre === nombreUsuario
    : hist.nombre !== nombreUsuario
  );

  if (historiasFiltradas.length === 0) {
    lista.innerHTML = "<li>No hay historias para mostrar.</li>";
    return;
  }

  historiasFiltradas.forEach(hist => {
    const li = document.createElement("li");
    li.textContent = `${hist.nombre}, ${hist.edad} años, encontró ${hist.generoObjeto} ${hist.objetoMagico} en ${hist.lugar}`;
    lista.appendChild(li);
  });
}
