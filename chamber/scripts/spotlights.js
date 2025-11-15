async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const businesses = await response.json();

    const filtered = businesses.filter(b => b.membership >= 2);

    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selected.forEach(b => {
      const card = document.createElement("div");
      card.classList.add("business-card");

      card.innerHTML = `
        <div class="card-header">
          <h3>${b.name}</h3>
          <p class="tagline">${b.membership == 3 ? "Gold Member" : "Silver Member"}</p>
        </div>

        <div class="card-body">
          <div class="image-box">
            <img src="images/${b.image}" alt="${b.name}">
          </div>

          <div class="info">
            <p><strong>PHONE:</strong> ${b.phone}</p>
            <p><strong>EMAIL:</strong> ${b.email}</p>
            <p><strong>URL:</strong> <a href="${b.website}" target="_blank">${b.website}</a></p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

loadSpotlights();