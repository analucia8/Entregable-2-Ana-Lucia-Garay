let historias = JSON.parse(localStorage.getItem("historias")) || [];
let usuarioOriginal = localStorage.getItem("usuario") || "";
let usuarioDatos = JSON.parse(localStorage.getItem("usuarioDatos")) || { edad: "", genero: "" };
let nombreMostradoActual = usuarioOriginal;

document.addEventListener("DOMContentLoaded", () => {
  if (usuarioOriginal) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("formularioHistoria").classList.remove("hidden");
    document.getElementById("nombreMostrado").textContent = nombreMostradoActual;
    document.getElementById("tituloPrincipal").textContent = `¡Bienvenida/o ${usuarioOriginal} al Generador de Historias!`;
    actualizarMensajeUsuario();
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
    resetFormulario(usuarioOriginal);
  });
  document.getElementById("otraPersona").addEventListener("click", () => {
    const nuevoNombre = prompt("¿Cuál es el nombre de la otra persona?");
    const nombreFinal = nuevoNombre && nuevoNombre.trim() ? nuevoNombre.trim() : "Visitante";
    resetFormulario(nombreFinal);
  });
  document.getElementById("verPropias").addEventListener("click", () => mostrarHistoriasFiltradas(true));
  document.getElementById("verOtras").addEventListener("click", () => mostrarHistoriasFiltradas(false));
});

function iniciarSesion() {
  const nombre = document.getElementById("nombreUsuario").value.trim();
  if (nombre) {
    usuarioOriginal = nombre;
    nombreMostradoActual = nombre;
    localStorage.setItem("usuario", usuarioOriginal);
    document.getElementById("login").classList.add("hidden");
    document.getElementById("formularioHistoria").classList.remove("hidden");
    document.getElementById("nombreMostrado").textContent = nombreMostradoActual;
    document.getElementById("tituloPrincipal").textContent = `¡Bienvenida/o ${usuarioOriginal} al Generador de Historias!`;
    actualizarMensajeUsuario();
  } else {
    alert("Por favor, ingresa un nombre válido.");
  }
}

function actualizarMensajeUsuario() {
  const mensajeEl = document.getElementById("mensajeUsuario");
  if (usuarioOriginal === nombreMostradoActual) {
    mensajeEl.textContent = `Hola ${usuarioOriginal}, crea una historia para ti.`;
  } else {
    mensajeEl.textContent = `Hola ${usuarioOriginal}, estás creando una historia para ${nombreMostradoActual}.`;
  }
}

function crearHistoria(e) {
  e.preventDefault();

  const datos = {
    nombre: nombreMostradoActual,
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

  if (usuarioOriginal === datos.nombre) {
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

  nombreMostradoActual = nombre;
  document.getElementById("nombreMostrado").textContent = nombreMostradoActual;

  const edadInput = document.getElementById("edad");
  const generoSelect = document.getElementById("genero");

  if (usuarioOriginal === nombreMostradoActual && usuarioDatos.edad && usuarioDatos.genero) {
    edadInput.value = usuarioDatos.edad;
    generoSelect.value = usuarioDatos.genero;
    edadInput.disabled = true;
    generoSelect.disabled = true;
  } else {
    edadInput.disabled = false;
    generoSelect.disabled = false;
  }

  actualizarMensajeUsuario();
}

function mostrarHistoriasFiltradas(propias) {
  const lista = document.getElementById("listaHistorias");
  lista.innerHTML = "";

  if (!usuarioOriginal) {
    lista.innerHTML = "<li>No hay usuario registrado. Por favor, inicia sesión.</li>";
    return;
  }

  const historiasFiltradas = historias.filter(hist => propias
    ? hist.nombre === usuarioOriginal
    : hist.nombre !== usuarioOriginal
  );

  if (historiasFiltradas.length === 0) {
    lista.innerHTML = `<li>No hay ${propias ? "historias propias" : "historias de otros usuarios"} para mostrar.</li>`;
    return;
  }

  historiasFiltradas.forEach((hist, index) => {
    const li = document.createElement("li");
    const resumen = `📖 ${hist.nombre}, ${hist.edad} años, encontró ${hist.generoObjeto} ${hist.objetoMagico} en ${hist.lugar}.`;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️ Eliminar";
    btnEliminar.addEventListener("click", () => eliminarHistoria(hist));

    li.textContent = resumen;
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

function eliminarHistoria(historiaAEliminar) {
  historias = historias.filter(h =>
    !(
      h.nombre === historiaAEliminar.nombre &&
      h.edad === historiaAEliminar.edad &&
      h.genero === historiaAEliminar.genero &&
      h.lugar === historiaAEliminar.lugar &&
      h.objetoMagico === historiaAEliminar.objetoMagico &&
      h.generoObjeto === historiaAEliminar.generoObjeto
    )
  );
  localStorage.setItem("historias", JSON.stringify(historias));
  mostrarHistoriasFiltradas(historiaAEliminar.nombre === usuarioOriginal);
}
