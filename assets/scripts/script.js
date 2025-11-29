// =========================================================
// Lógica para Galeria de Fotos (Carrossel Simples) - REFEITA
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('simple-carousel');
    
    // Verifica se o carrossel existe antes de continuar
    if (!carouselContainer) {
        console.log("Carousel container not found. Skipping carousel initialization.");
        return; 
    }

    const carouselTrack = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    // Se faltar algum elemento crucial, não inicializa
    if (!carouselTrack || slides.length === 0 || !prevBtn || !nextBtn || !indicatorsContainer) {
        console.error("Missing essential carousel elements. Check HTML IDs/classes.");
        return;
    }

    let currentIndex = 0;
    const slideCount = slides.length;
    let slideWidth = carouselContainer.offsetWidth; // Largura inicial do slide

    // --- Funções Auxiliares ---

    function setSlideDimensions() {
        slideWidth = carouselContainer.offsetWidth; // Atualiza a largura
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        // Garante que o track tem a largura suficiente para todos os slides
        carouselTrack.style.width = `${slideWidth * slideCount}px`; 
        updateCarouselPosition(false); // Atualiza a posição sem transição no redimensionamento
    }

    function updateCarouselPosition(animated = true) {
        const offset = -currentIndex * slideWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;
        carouselTrack.style.transition = animated ? 'transform 0.5s ease-in-out' : 'none';
        updateIndicators();
    }

    function createIndicators() {
        indicatorsContainer.innerHTML = ''; // Limpa indicadores antigos
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement('button');
            indicator.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white/40', 'hover:bg-white/80', 'transition', 'duration-300', 'focus:outline-none');
            indicator.setAttribute('aria-label', `Ver slide ${i + 1}`);
            indicator.dataset.slideIndex = i; // Guarda o índice no botão

            indicator.addEventListener('click', () => {
                currentIndex = i;
                updateCarouselPosition(true);
            });
            indicatorsContainer.appendChild(indicator);
        }
        updateIndicators(); // Garante que o indicador atual é destacado
    }

    function updateIndicators() {
        document.querySelectorAll('#carousel-indicators button').forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('bg-white', 'bg-opacity-100');
                indicator.classList.remove('bg-white/40');
            } else {
                indicator.classList.remove('bg-white', 'bg-opacity-100');
                indicator.classList.add('bg-white/40');
            }
        });
    }

    // --- Lógica de Navegação ---

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarouselPosition();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount; // Garante que o índice não fica negativo
        updateCarouselPosition();
    }

    // --- Inicialização ---

    // Define as dimensões dos slides e a posição inicial
    setSlideDimensions(); 
    // Cria os pontos indicadores
    createIndicators(); 

    // Adiciona event listeners aos botões
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);

    // Ajusta o carrossel se a janela for redimensionada
    window.addEventListener('resize', setSlideDimensions);

    // Opcional: Autoplay (descomente para ativar)
    // let autoPlayInterval = setInterval(showNextSlide, 5000); // Muda de slide a cada 5 segundos

    // Para parar o autoplay ao interagir e reiniciar depois de um tempo
    // carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    // carouselContainer.addEventListener('mouseleave', () => {
    //     clearInterval(autoPlayInterval);
    //     autoPlayInterval = setInterval(showNextSlide, 5000);
    // });
});

//
// Header
fetch("assets/header/index.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    const script = document.createElement("script");
    script.src = "assets/header/script.js";
    document.body.appendChild(script);
  });
