document.addEventListener("DOMContentLoaded", () => {
    const cityDetails = {
        piter: {
            title: "Saint Petersburg",
            infrastructure: [
                "The city is crossed by canals and granite embankments where locals gather and relax.",
                "At night, famous drawbridges open for large ships crossing the Neva River.",
                "Historic landmarks like the Singer House define the skyline with iconic details."
            ],
            history: [
                "The Bronze Horseman monument represents Peter the Great and the city's long legacy.",
                "The Winter Palace, now the Hermitage, was once home to Russian tsars.",
                "St. Isaac's Cathedral reflects the wealth and artistic power of the Russian Empire."
            ],
            civilization: [
                "Palaces with golden interiors and grand staircases show imperial lifestyle and culture.",
                "Visitors from around the world come for the city's unique European atmosphere.",
                "Nighttime Saint Petersburg glows with lights and crowds watching bridge openings."
            ]
        },
        beijing: {
            title: "Beijing and Modern China",
            infrastructure: [
                "China builds advanced mountain roads and bridges to connect difficult terrain.",
                "Mega-cities like Chongqing use roads and rail lines passing through dense buildings.",
                "The country operates the world's largest high-speed rail network."
            ],
            history: [
                "The Summer Palace in Beijing reflects imperial design and royal life.",
                "The Great Wall remains a global symbol of ancient defense and engineering.",
                "Modern architecture still uses colors and roof lines inspired by historical traditions."
            ],
            civilization: [
                "Ancient temples stand next to neon districts, showing old and new eras together.",
                "Night markets and crowded streets reflect dynamic and hardworking city life.",
                "Calligraphy, red decorative motifs, and ritual aesthetics shape the cultural identity."
            ]
        },
        san: {
            title: "San Francisco",
            infrastructure: [
                "Landmark bridges, including the Golden Gate and Bay Bridge, connect the bay region.",
                "The city is known for its cable cars that handle steep hills and daily commuting.",
                "A visible urban grid with major parks like Golden Gate Park defines the layout."
            ],
            history: [
                "Victorian 'Painted Ladies' homes became an iconic symbol of 19th-century architecture.",
                "Historic Market Street photos show over a century of commerce and movement.",
                "Fisherman's Wharf and the Ferry Building grew as core waterfront trade locations."
            ],
            civilization: [
                "Diverse neighborhoods create a blend of cultures and lifestyles.",
                "The famous fog, often called 'Karl', shapes the mood and identity of the city.",
                "Today, technology, arts, and historic buildings coexist in one fast-moving urban space."
            ]
        }
    };

    const cards = document.querySelectorAll(".card[data-city]");
    const modal = document.querySelector(".city-modal");
    const modalTitle = document.getElementById("cityModalTitle");
    const modalList = document.getElementById("cityModalList");
    const modalTabs = document.querySelectorAll(".city-modal__tab");
    const closeTriggers = document.querySelectorAll("[data-modal-close]");
    const exploreButton = document.querySelector("[data-scroll-target]");

    let activeCityId = "piter";
    let activeTopic = "infrastructure";

    const renderTopic = () => {
        const city = cityDetails[activeCityId];
        if (!city || !modalTitle || !modalList) {
            return;
        }

        modalTitle.textContent = city.title;
        modalList.innerHTML = city[activeTopic]
            .map((item) => `<li class=\"city-modal__item\">${item}</li>`)
            .join("");
    };

    const openModal = (cityId) => {
        if (!modal || !cityDetails[cityId]) {
            return;
        }

        activeCityId = cityId;
        activeTopic = "infrastructure";
        modalTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.topic === activeTopic));
        renderTopic();

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    };

    const closeModal = () => {
        if (!modal) {
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };

    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            const ignoreClick = event.target.closest(".swiper-pagination-bullet, .swiper-button-prev, .swiper-button-next");
            if (ignoreClick) {
                return;
            }

            openModal(card.dataset.city);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(card.dataset.city);
            }
        });
    });

    modalTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activeTopic = tab.dataset.topic;
            modalTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
            renderTopic();
        });
    });

    closeTriggers.forEach((trigger) => {
        trigger.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    if (exploreButton) {
        exploreButton.addEventListener("click", () => {
            const target = document.querySelector(exploreButton.dataset.scrollTarget);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    if (typeof Swiper !== "undefined") {
        const sliders = document.querySelectorAll(".card__swiper");
        sliders.forEach((slider, index) => {
            new Swiper(slider, {
                loop: true,
                speed: 850,
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                autoplay: {
                    delay: 2500 + index * 220,
                    disableOnInteraction: false
                },
                pagination: {
                    el: slider.querySelector(".swiper-pagination"),
                    clickable: true
                },
                observer: true,
                observeParents: true
            });
        });
    }

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        cards.forEach((card) => revealObserver.observe(card));
    } else {
        cards.forEach((card) => card.classList.add("is-visible"));
    }
});
