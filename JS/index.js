window.onload = function () {
    let historias = [];
  
    function iniciarSesion() {
        const nombre = document.getElementById("nombreUsuario").value.trim();
        if (nombre) {
          localStorage.setItem("usuario", nombre);
          document.getElementById("login").classList.add("hidden");
          document.getElementById("formularioHistoria").classList.remove("hidden");
          document.getElementById("nombreMostrado").textContent = nombre;
          
          document.getElementById("tituloPrincipal").textContent = `Bienvenida/o ${nombre} al Generador de Historias`;
        } else {
          alert("Por favor, ingresa un nombre.");
        }
      }
      
    // Exponer la función para que funcione el onclick en el HTML
    window.iniciarSesion = iniciarSesion;
  
    document.getElementById("formHistoria").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const datos = {
        nombre: localStorage.getItem("usuario"),
        edad: document.getElementById("edad").value,
        genero: document.getElementById("genero").value.toLowerCase(),
        lugar: document.getElementById("lugar").value,
        objetoMagico: document.getElementById("objetoMagico").value,
        generoObjeto: document.getElementById("generoObjeto").value.toLowerCase()
      };
  
      historias.push(datos);
      localStorage.setItem("historias", JSON.stringify(historias));
  
      mostrarHistoria(datos);
    });
  
    function mostrarHistoria(datos) {
      let introduccion, conflicto, finales;
  
      if (datos.genero === "niña") {
        introduccion = `En una tierra lejana, ${datos.nombre}, una valiente aventurera de ${datos.edad} años, paseaba por ${datos.lugar}.`;
        finales = [
          "Decidió usarlo para ayudar a su pueblo y se convirtió en una heroína.",
          "El objeto era demasiado poderoso y terminó perdiéndose en su magia.",
          "Vendió el objeto por una fortuna y vivió el resto de su vida como una reina."
        ];
      } else {
        introduccion = `En una tierra lejana, ${datos.nombre}, un valiente aventurero de ${datos.edad} años, paseaba por ${datos.lugar}.`;
        finales = [
          "Decidió usarlo para ayudar a su pueblo y se convirtió en un héroe.",
          "El objeto era demasiado poderoso y terminó perdiéndose en su magia.",
          "Vendió el objeto por una fortuna y vivió el resto de su vida como un rey."
        ];
      }
  
      conflicto = datos.generoObjeto === "una"
        ? `Un día, mientras exploraba, encontró una misteriosa ${datos.objetoMagico} que contenía un gran poder.`
        : `Un día, mientras exploraba, encontró un misterioso ${datos.objetoMagico} que contenía un gran poder.`;
  
      let finalElegido = finales[Math.floor(Math.random() * finales.length)];
      const historiaCompleta = `${introduccion} ${conflicto} ${finalElegido}`;
  
      document.getElementById("historiaFinal").textContent = historiaCompleta;
      document.getElementById("resultado").classList.remove("hidden");
    }
  };
  