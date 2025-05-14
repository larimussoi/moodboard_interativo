// 🌙 Botão de alternar tema
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.getElementById("toggle-theme").textContent = isDark ? "☀️" : "🌙";
});

// 🎯 Listener para cada botão de emoção
    document.querySelectorAll(".emoji").forEach((btn) => {
    btn.addEventListener("click", () => {
    const emocao = btn.dataset.emocao;

    document.querySelector(".frase").textContent = `"Você está se sentindo ${emocao} hoje. Está tudo bem, viva este sentimento do seu jeito."`;

    buscarImagem(emocao); // Chama a API do Unsplash

    // 🎨 Paleta de cores
    const coresExemplo = {
        feliz: ["#fff176", "#ffca28", "#ff8f00"],
        triste: ["#90a4ae", "#78909c", "#607d8b"],
        irritado: ["#ef5350", "#e53935", "#b71c1c"],
        cansado: ["#a1887f", "#8d6e63", "#5d4037"],
        raiva: ["#ff4e42", "#d32f2f", "#9a0007"],
        surpreso: ["#ffe082", "#ffca28", "#ffb300"],
        neutro: ["#bdbdbd", "#9e9e9e", "#757575"],
        ansioso: ["#80deea", "#4dd0e1", "#00acc1"],
        apaixonado: ["#f06292", "#ec407a", "#d81b60"],
        confuso: ["#ce93d8", "#ba68c8", "#8e24aa"],
        pensativo: ["#90caf9", "#64b5f6", "#1976d2"],
        desapontado: ["#b0bec5", "#90a4ae", "#78909c"],
        entediado: ["#eeeeee", "#e0e0e0", "#bdbdbd"],
        animado: ["#aed581", "#7cb342", "#558b2f"],
    };

    const cores = coresExemplo[emocao];

   document.querySelectorAll(".cor").forEach((el) => {
     el.style.background = `linear-gradient(45deg, ${cores[0]}, ${cores[1]}, ${cores[2]})`;
});
    });
});

function buscarImagem(emocao) {
  const accessKey = "ZS00QXOOawOMsiJ0WVEVlbaqFWhB2nRSz07cW6be8Mc";
  const traducoes = {
    feliz: "happy",
    triste: "sad",
    irritado: "angry",
    cansado: "tired",
    raiva: "rage",
    surpreso: "surprised",
    neutro: "neutral",
    ansioso: "anxious",
    apaixonado: "in love",
    confuso: "confused",
    pensativo: "thoughtful",
    desapontado: "disappointed",
    entediado: "bored",
    animado: "excited",
  };

  const termoBusca = traducoes[emocao] || emocao;

  fetch(`https://api.unsplash.com/photos/random?query=${termoBusca}&orientation=landscape&client_id=${accessKey}`)
    .then((res) => {
      if (!res.ok) throw new Error("Erro na resposta da API");
      return res.json();
    })
    .then((data) => {
      if (!data.urls || !data.urls.small) {
        throw new Error("Imagem não encontrada");
      }

      const imagem = document.querySelector(".imagem");
      imagem.innerHTML = `<img src="${data.urls.small}" alt="${emocao}" crossorigin="anonymous" />`;
    })
    .catch((err) => {
      console.error("Erro ao buscar imagem:", err);
      document.querySelector(".imagem").innerHTML =
        "<p>😔 Não conseguimos carregar a imagem. Tente outra emoção!</p>";
    });
}
