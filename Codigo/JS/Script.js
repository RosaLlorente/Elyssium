window.onload = function () 
{
    //Gestión del menú para vistas pequeñas
    const menuToggle = document.querySelector(".menu-toggle");
    const navegacion = document.querySelector(".navegacion nav");

    if (menuToggle && navegacion) {
        menuToggle.addEventListener("click", function () {
            navegacion.classList.toggle("menu-open");
        });

        // Cierra el menú cuando el usuario hace clic fuera
        document.addEventListener("click", function (event) {
            if (!navegacion.contains(event.target) && !menuToggle.contains(event.target)) {
                navegacion.classList.remove("menu-open");
            }
        });
    }

    //Gestión del carrusel
    const carrouselWrapper = document.querySelector('.carrousel-wrapper');
    const carrouselItems = document.querySelectorAll('.carrousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0; 
    const itemWidth = carrouselItems[0].offsetWidth + parseInt(getComputedStyle(carrouselItems[0]).marginLeft) + parseInt(getComputedStyle(carrouselItems[0]).marginRight);

    /**
     * Función para actualizar la vista del carrusel
     * @returns {void}
     * @author Rosa M. Llorente
     */
    function updateCarrousel() 
    {
        const offset = -currentIndex * itemWidth; 
        carrouselWrapper.style.transform = `translateX(${offset}px)`; 
    }

    /**
     * Función para pasar a la siguiente tarjeta
     * @returns {void}
     * @author Rosa M. Llorente
     */
    function next() 
    {
        if (currentIndex < carrouselItems.length - 1) 
        {
            currentIndex++;
        } 
        else 
        {
            currentIndex = 0; 
        }
        updateCarrousel();
        resetAutoSlide(); 
    }

    /**
     * Función para pasar a la tarjeta anterior
     * @returns {void}
     * @author Rosa M. Llorente 
     */
    function prev() {
        if (currentIndex > 0) 
        {
            currentIndex--;
        } 
        else 
        {
            currentIndex = carrouselItems.length - 1; 
        }
        updateCarrousel();
        resetAutoSlide(); 
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    let autoSlideInterval;

    /**
     * Función para iniciar el carrusel automático
     * @returns {void}
     * @author Rosa M. Llorente
     */
    function startAutoSlide() 
    {
        autoSlideInterval = setInterval(next, 3000);
    }

    /**
     * Función para reiniciar el temporizador a 10 segundos
     * @returns {void}
     * @author Rosa M. Llorente
     */
    function resetAutoSlide() 
    {
        clearInterval(autoSlideInterval); 
        setTimeout(startAutoSlide, 10000); 
    }

    updateCarrousel();
    startAutoSlide();

    //Gestion de modales
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    const openLoginButtons = document.querySelectorAll(".open-login");
    const openRegisterButtons = document.querySelectorAll(".open-register");

    const closeLogin = document.getElementById("closeLoginModal");
    const closeRegister = document.getElementById("closeRegisterModal");

    openLoginButtons.forEach(button => 
    {
        button.addEventListener("click", function(e) 
        {
            e.preventDefault();
            loginModal.style.display = "block";
        });
    });

    openRegisterButtons.forEach(button => 
    {
        button.addEventListener("click", function(e) 
        {
            e.preventDefault();
            registerModal.style.display = "block";
        });
    });

    closeLogin.addEventListener("click", function() 
    {
        loginModal.style.display = "none";
    });

    closeRegister.addEventListener("click", function() 
    {
        registerModal.style.display = "none";
    });

    window.addEventListener("click", function(event) 
    {
        if (event.target === loginModal) 
        {
            loginModal.style.display = "none";
        }
        if (event.target === registerModal) 
        {
            registerModal.style.display = "none";
        }
    });
};
