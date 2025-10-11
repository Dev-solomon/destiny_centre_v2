// Scripture data for each continent with passages
const scriptureData = {
            northAmerica: [
                { ref: "Acts 1:8", passage: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." },
                { ref: "Psalm 107:2", passage: "Let the redeemed of the Lord tell their story—those he redeemed from the hand of the foe." },
                { ref: "2 Peter 3:9", passage: "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance." }
            ],
            southAmerica: [
                { ref: "John 3:16", passage: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
                { ref: "John 10:10", passage: "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full." },
                { ref: "Luke 4:18", passage: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor." }
            ],
            europe: [
                { ref: "Matthew 28:19", passage: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
                { ref: "Luke 19:10", passage: "For the Son of Man came to seek and to save the lost." },
                { ref: "Psalm 96:3", passage: "Declare his glory among the nations, his marvelous deeds among all peoples." }
            ],
            africa: [
                { ref: "Acts 17:26", passage: "From one man he made all the nations, that they should inhabit the whole earth; and he marked out their appointed times in history and the boundaries of their lands." },
                { ref: "Psalm 24:1", passage: "The earth is the Lord's, and everything in it, the world, and all who live in it." },
                { ref: "Acts 4:12", passage: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved." }
            ]
        };

        const badgePositions = [
            'badge-top-left',
            'badge-top-right',
            'badge-middle-right',
            'badge-middle-left',
            'badge-bottom-center',
            'badge-bottom-left'
        ];

        let currentContinent = null;

        function createBadges(continent) {
            const container = document.getElementById('scripture-badges');
            container.innerHTML = '';

            const scriptures = scriptureData[continent];
            if (!scriptures) return;

            scriptures.forEach((scripture, index) => {
                const badge = document.createElement('div');
                badge.className = `scripture-badge ${badgePositions[index % badgePositions.length]}`;
                badge.textContent = scripture.ref;
                badge.dataset.passage = scripture.passage;

                badge.addEventListener('mouseenter', (e) => showTooltip(e, scripture.passage));
                badge.addEventListener('mouseleave', hideTooltip);
                badge.addEventListener('mousemove', (e) => updateTooltipPosition(e));

                container.appendChild(badge);

                setTimeout(() => badge.classList.add('active'), index * 100);
            });
        }

        function showTooltip(e, passage) {
            const tooltip = document.getElementById('tooltip');
            const globeContainer = document.querySelector('.globe-container');
            const containerRect = globeContainer.getBoundingClientRect();
            
            tooltip.textContent = passage;
            tooltip.classList.add('show');
            
            // Position relative to globe container
            tooltip.style.left = (e.clientX - containerRect.left) + 'px';
            tooltip.style.top = (e.clientY - containerRect.top + 20) + 'px';

            updateTooltipPosition(e);
        }

        function hideTooltip() {
            const tooltip = document.getElementById('tooltip');
            tooltip.classList.remove('show');
        }

        function updateTooltipPosition(e) {
            const tooltip = document.getElementById('tooltip');
            const globeContainer = document.querySelector('.globe-container');
            const containerRect = globeContainer.getBoundingClientRect();
            
            tooltip.style.left = (e.clientX - containerRect.left) + 'px';
            tooltip.style.top = (e.clientY - containerRect.top + 20) + 'px';
        }

        function hideBadges() {
            document.querySelectorAll('.scripture-badge').forEach(badge => {
                badge.classList.remove('active');
            });
            setTimeout(() => {
                document.getElementById('scripture-badges').innerHTML = '';
            }, 300);
        }

        const continentLinks = document.querySelectorAll('.continent a');

        continentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const continent = link.dataset.continent;

                if (currentContinent === continent) {
                    hideBadges();
                    currentContinent = null;
                } else {
                    hideBadges();
                    setTimeout(() => {
                        createBadges(continent);
                        currentContinent = continent;
                    }, 300);
                }
            });
        });

// Hide badges when scrolling
window.addEventListener("scroll", () => {
  hideBadges();
  currentContinent = null;
});

// Hide badges when clicking outside continent links or badges
document.addEventListener("click", (e) => {
  const isContinentLink = e.target.closest(".continent a");
  const isBadge = e.target.closest(".scripture-badge");

  if (!isContinentLink && !isBadge) {
    hideBadges();
    currentContinent = null;
  }
});
