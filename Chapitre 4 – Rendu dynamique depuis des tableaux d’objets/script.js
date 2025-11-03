let produits = [
  { nom: "Bayern shirt", prix: 40, image: "https://i.pinimg.com/736x/4d/4f/35/4d4f352fef4ffdff946f532e330708de.jpg" },
  { nom: "Arsenal shirt", prix: 45, image: "https://i.pinimg.com/736x/b8/c5/46/b8c546af32064b0dafd40b98df12c04b.jpg" },
  { nom: "Man-city shirt", prix: 50, image: "https://i.pinimg.com/736x/db/13/09/db13098afcb9cabcc30b181d695aa893.jpg" }
];

let catalogue = document.getElementById("catalogue");

produits.forEach(p => {
  let carte = document.createElement("div");
  carte.className = "carte";
  carte.innerHTML = `
    <img src="${p.image}" alt="${p.nom}">
    <h3>${p.nom}</h3>
    <p>Prix : ${p.prix} €</p>
  `;
  catalogue.appendChild(carte);
});
