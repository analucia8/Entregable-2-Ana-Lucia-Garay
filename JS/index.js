window.onload = function () {
    let historias = JSON.parse(localStorage.getItem("historias")) || [];
    let usuarioActual = "";
  
    function guardarHistorias() {
      localStorage.setItem("historias", JSON.stringify(historias));
    }
  
    window.iniciarSesion = function () {
      const nombre = document.getElementById("nombreUsuario").value.trim();
      if (nombre) {
        usuarioActual = nombre;
        localStorage.setItem("usuario", nombre);
        document.getElementById("titulo").textContent = `¡Bienvenida/o ${nombre} al Generador de Historias!`;
        document.getElementById("login").classList.add("hidden");
        document.getElementById("formularioHistoria").classList.remove("hidden");
        document.getElementById("nombreMostrado").textContent = nombre;
      } else {
        alert("Por favor, ingresa un nombre.");
      }
    };
  
    document.getElementById("formHistoria").addEventListener("submit", function (e) {
      e.preventDefault();
      const datos = {
        nombre: usuarioActual,
        edad: document.getElementById("edad").value,
        genero: document.getElementById("genero").value.toLowerCase(),
        lugar: document.getElementById("lugar").value,
        objetoMagico: document.getElementById("objetoMagico").value,
        generoObjeto: document.getElementById("generoObjeto").value.toLowerCase()
      };
      historias.push(datos);
      guardarHistorias();
      mostrarHistoria(datos);
    });
  
    function mostrarHistoria(datos) {
      let introduccion = datos.genero === "niña"
        ? `En una tierra lejana, ${datos.nombre}, una valiente aventurera de ${datos.edad} años, paseaba por ${datos.lugar}.`
        : `En una tierra lejana, ${datos.nombre}, un valiente aventurero de ${datos.edad} años, paseaba por ${datos.lugar}.`;
  
      let conflicto = datos.generoObjeto === "una"
        ? `Un día, mientras exploraba, encontró una misteriosa ${datos.objetoMagico} que contenía un gran poder.`
        : `Un día, mientras exploraba, encontró un misterioso ${datos.objetoMagico} que contenía un gran poder.`;
  
      let finales = datos.genero === "niña"
        ? [
          "Decidió usarlo para ayudar a su pueblo y se convirtió en una heroína.",
          "El objeto era demasiado poderoso y terminó perdiéndose en su magia.",
          "Vendió el objeto por una fortuna y vivió como una reina."
        ]
        : [
          "Decidió usarlo para ayudar a su pueblo y se convirtió en un héroe.",
          "El objeto era demasiado poderoso y terminó perdiéndose en su magia.",
          "Vendió el objeto por una fortuna y vivió como un rey."
        ];
  
      const finalElegido = finales[Math.floor(Math.random() * finales.length)];
      const historiaCompleta = `${introduccion} ${conflicto} ${finalElegido}`;
  
      document.getElementById("historiaFinal").textContent = historiaCompleta;
      document.getElementById("resultado").classList.remove("hidden");
      document.getElementById("filtroHistorias").classList.remove("hidden");
  
      setTimeout(() => {
        document.getElementById("crearOtra").classList.remove("hidden");
        document.getElementById("opcionesNueva").classList.remove("hidden");
      }, 500);
    }
  
    document.getElementById("crearOtra").addEventListener("click", () => {
      document.getElementById("opcionesNueva").classList.remove("hidden");
    });
  
    document.getElementById("nuevaPropia").addEventListener("click", () => {
      resetFormulario();
    });
  
    document.getElementById("nuevaAjena").addEventListener("click", () => {
      usuarioActual = prompt("¿Cuál es el nombre de la nueva persona?");
      document.getElementById("nombreMostrado").textContent = usuarioActual;
      resetFormulario();
    });
  
    function resetFormulario() {
      document.getElementById("formHistoria").reset();
      document.getElementById("resultado").classList.add("hidden");
      document.getElementById("opcionesNueva").classList.add("hidden");
      document.getElementById("crearOtra").classList.add("hidden");
      document.getElementById("formularioHistoria").classList.remove("hidden");
    }
  
    window.filtrarHistorias = function (esPropia) {
      const usuario = localStorage.getItem("usuario");
      const lista = document.getElementById("listaHistorias");
      lista.innerHTML = "";
  
      const historiasFiltradas = historias.filter(historia =>
        esPropia ? historia.nombre === usuario : historia.nombre !== usuario
      );
  
      historiasFiltradas.forEach(historia => {
        const li = document.createElement("li");
        li.textContent = `${historia.nombre} - ${historia.objetoMagico}`;
        lista.appendChild(li);
      });
    };
  };
  