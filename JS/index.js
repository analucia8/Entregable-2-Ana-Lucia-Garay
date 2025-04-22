let historias = JSON.parse(localStorage.getItem("historias")) || [];
let usuario = localStorage.getItem("usuario") || "";
let usuarioDatos = JSON.parse(localStorage.getItem("usuarioDatos")) || { edad: "", genero: "" };

document.addEventListener("DOMContentLoaded", () => {
  if (usuario) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("formularioHistoria").classList.remove("hidden");
    document.getElementById("nombreMostrado").textContent = usuario;
    document.getElementById("tituloPrincipal").textContent = `¡Bienvenida/o ${usuario} al Generador de Historias!`;
    if (usuarioDatos.edad && usuarioDatos.genero) {
      document.getElementById("edad").value = usuarioDatos.edad;
      document.getElementById("genero").value = usuarioDatos.genero;
      document.getElementById("edad").disabled = true;
      document.getElementById("genero").disabled = true;
    }
  }

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
  } else {
    alert("Por favor, ingresa un nombre válido.");
  }
}

function crearHistoria(e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombreMostrado").textContent,
    edad: document.getElementById("edad").value,
    genero: document.getElementById("genero").value.toLowerCase(),
    lugar: document.getElementById("lugar").value.trim(),
    objetoMagico: document.getElementById("objetoMagico").value.trim(),
    generoObjeto: document.getElementById("generoObjeto").value.toLowerCase()
  };

  if (!datos.edad || datos.edad <= 0) {
    alert("Por favor, ingresa una edad válida mayor a 0.");
    return;
  }
  if (!datos.genero) {
    alert("Por favor, selecciona un género.");
    return;
  }
  if (!datos.lugar) {
    alert("Por favor, ingresa un lugar válido.");
    return;
  }
  if (!datos.objetoMagico) {
    alert("Por favor, ingresa un objeto mágico válido.");
    return;
  }
  if (!datos.generoObjeto) {
    alert("Por favor, selecciona el género del objeto.");
    return;
  }

  if (usuario === datos.nombre) {
    usuarioDatos = { edad: datos.edad, genero: datos.genero };
    localStorage.setItem("usuarioDatos", JSON.stringify(usuarioDatos));
  }

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

  const edadInput = document.getElementById("edad");
  const generoSelect = document.getElementById("genero");

  if (nombre) {
    document.getElementById("nombreMostrado").textContent = nombre;
    if (usuarioDatos.edad && usuarioDatos.genero) {
      edadInput.value = usuarioDatos.edad;
      generoSelect.value = usuarioDatos.genero;
      edadInput.disabled = true;
      generoSelect.disabled = true;
    }
  } else {
    const nuevoNombre = prompt("¿Cuál es el nombre de la otra persona?");
    const nombreFinal = nuevoNombre && nuevoNombre.trim() ? nuevoNombre.trim() : "Visitante";
    usuario = nombreFinal;
    localStorage.setItem("usuario", usuario);
    usuarioDatos = { edad: "", genero: "" };
    localStorage.setItem("usuarioDatos", JSON.stringify(usuarioDatos));
    document.getElementById("nombreMostrado").textContent = nombreFinal;
    document.getElementById("tituloPrincipal").textContent = `¡Bienvenida/o ${nombreFinal} al Generador de Historias!`;
    edadInput.disabled = false;
    generoSelect.disabled = false;
  }
}

function mostrarHistoriasFiltradas(propias) {
  const nombreUsuario = localStorage.getItem("usuario");
  const lista = document.getElementById("listaHistorias");
  lista.innerHTML = "";

  if (!nombreUsuario) {
    lista.innerHTML = "<li>No hay usuario registrado. Por favor, inicia sesión.</li>";
    return;
  }

  const historiasFiltradas = historias.filter(hist => propias
    ? hist.nombre === nombreUsuario
    : hist.nombre !== nombreUsuario
  );

  if (historiasFiltradas.length === 0) {
    lista.innerHTML = `<li>No hay ${propias ? "historias propias" : "historias de otros usuarios"} para mostrar.</li>`;
    return;
  }

  historiasFiltradas.forEach(hist => {
    const li = document.createElement("li");
    li.textContent = `${hist.nombre}, ${hist.edad} años, encontró ${hist.generoObjeto} ${hist.objetoMagico} en ${hist.lugar}`;
    lista.appendChild(li);
  });
}
