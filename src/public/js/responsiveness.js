/**
 * Script de Responsividade - Verificação de tamanho mínimo da tela
 * Garante que o jogo só funcione em resoluções adequadas (1200x800)
 */

function verificarTamanhoTela() {
  const largura = window.innerWidth;
  const altura = window.innerHeight;
  const gameContainer = document.getElementById("game-container");
  const aviso = document.getElementById("aviso");

  if (largura < 1200 || altura < 800) {
    // Mostra aviso e esconde o jogo
    if (gameContainer) gameContainer.style.display = "none";
    if (aviso) aviso.style.display = "flex";
  } else {
    // Mostra o jogo e esconde o aviso
    if (aviso) aviso.style.display = "none";
    if (gameContainer) gameContainer.style.display = "block";
  }
}

// Verifica quando a página carregar
window.addEventListener("DOMContentLoaded", () => {
  verificarTamanhoTela();
  // Verifica novamente ao redimensionar
  window.addEventListener("resize", verificarTamanhoTela);
});
