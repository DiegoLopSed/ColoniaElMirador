// Lógica común para páginas de patrocinadores

(function () {
  // Carrusel horizontal de niveles y tarjetas volteables (patrocinadores.html)
  var banner = document.querySelector('.niveles-banner__track');
  var wrapper = document.querySelector('.niveles-banner');

  if (banner && wrapper) {
    function updateScrollHint() {
      var x = banner.scrollLeft;
      var max = banner.scrollWidth - banner.clientWidth;
      if (max <= 0) wrapper.removeAttribute('data-scroll');
      else if (x <= 4) wrapper.setAttribute('data-scroll', 'start');
      else if (x >= max - 4) wrapper.setAttribute('data-scroll', 'end');
      else wrapper.setAttribute('data-scroll', 'middle');
    }

    banner.addEventListener('scroll', updateScrollHint);
    updateScrollHint();
  }

  var nivelCards = document.querySelectorAll('.nivel-carta');
  if (nivelCards.length) {
    nivelCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.nivel-carta__dorso') && e.target.closest('.nivel-carta__lista')) return;
        this.classList.toggle('is-flipped');
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.classList.toggle('is-flipped');
        }
      });
    });
  }
})();

(function () {
  // Página de perfil de patrocinador (detalle)
  var diasEl = document.getElementById('dias-patrocinio');
  var cardDias = document.getElementById('card-dias-patrocinio');
  if (!diasEl || !cardDias) return;

  // Fecha de inicio: 1 de enero. Cambiar anioInicio si el patrocinio empezó en otro año (ej. 2025).
  var anioInicio = new Date().getFullYear();
  var hoy = new Date();
  var inicioPatrocinio = new Date(anioInicio, 0, 1); // 1 de enero, 00:00
  inicioPatrocinio.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);
  var DIAS_PATROCINIO = Math.max(0, Math.floor((hoy - inicioPatrocinio) / (1000 * 60 * 60 * 24)));

  diasEl.textContent = DIAS_PATROCINIO;

  // Color de la flama en el panel de días según días transcurridos
  var fuego = 'amarillo';
  if (DIAS_PATROCINIO > 730) fuego = 'morado';
  else if (DIAS_PATROCINIO > 365) fuego = 'azul';
  else if (DIAS_PATROCINIO > 180) fuego = 'rojo';
  else if (DIAS_PATROCINIO > 30) fuego = 'naranja';
  cardDias.setAttribute('data-fuego', fuego);

  // Marcar como conseguidas solo las rachas según días (1 mes = 30 días)
  var rachas = document.querySelectorAll('.patrocinador-racha[data-dias-min]');
  rachas.forEach(function (r) {
    var diasMin = parseInt(r.getAttribute('data-dias-min'), 10);
    if (DIAS_PATROCINIO >= diasMin) {
      r.classList.remove('patrocinador-racha--pendiente');
      var estadoEl = r.querySelector('.patrocinador-racha__estado');
      if (!estadoEl) return;
      estadoEl.classList.remove('patrocinador-racha__estado--pendiente');
      estadoEl.classList.add('patrocinador-racha__estado--ok');
      estadoEl.textContent = '✓';
    }
  });
})();

