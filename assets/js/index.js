document.addEventListener("DOMContentLoaded", () => {
    const cityDetails = {
        piter: {
            title: "Saint Petersburg",
            infrastructure: [
                "Saint Petersburg is known as the \"City of Water\" because of its canals and granite embankments where people relax.",
                "At night, drawbridges open to let ships pass along the Neva River.",
                "The city also features grand historic buildings like the Singer House with its glass globe."
            ],
            history: [
                "The Bronze Horseman statue represents the city's strength and long past.",
                "The Winter Palace, once home to Russian tsars, is now a major museum.",
                "Large cathedrals such as St. Isaac's reflect the wealth and artistry of the Russian Empire."
            ],
            civilization: [
                "Palaces display golden interiors and grand staircases that show royal luxury.",
                "Visitors admire the city's European-style architecture.",
                "At night, illuminated monuments and opening bridges create a magical atmosphere."
            ]
        },
        beijing: {
            title: "Beijing",
            infrastructure: [
                "China builds mountain roads and bridges to connect cities in hard terrain.",
                "Mega-cities like Chongqing use creative designs, with trains and roads passing through buildings.",
                "China also has a huge high-speed train network that makes long travel fast and easy."
            ],
            history: [
                "Historic places like the Summer Palace show how emperors lived long ago.",
                "The Great Wall is a famous symbol of protection from the past.",
                "Many modern buildings still use traditional red colors and classic roof shapes."
            ],
            civilization: [
                "Chinese cities mix old temples with modern lights, showing past and present together.",
                "Busy streets and night markets reflect active city life.",
                "Traditional art, like calligraphy and red decorations, gives the culture a unique identity."
            ]
        },
        san: {
            title: "San Francisco",
            infrastructure: [
                "San Francisco is famous for its huge bridges, like the Golden Gate and Bay Bridge, which connect the city over the water.",
                "The city also has a unique cable car system that helps people travel on its steep hills.",
                "From above, the city shows a clear grid layout with large parks like Golden Gate Park."
            ],
            history: [
                "The colorful Victorian houses called the Painted Ladies represent the city's old building style.",
                "Historic photos of Market Street show San Francisco has been a busy city for many years.",
                "The waterfront areas, like Fisherman's Wharf and the Ferry Building, have long been important for trade and fishing."
            ],
            civilization: [
                "San Francisco is a mix of cultures where people live and work together.",
                "The famous morning fog gives the city a special atmosphere.",
                "Today, modern technology and art exist alongside historic buildings."
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
