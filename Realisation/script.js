let products =  [];
let input = document.getElementById('search');
let btn = document.getElementById('btn');
let container = document.getElementById('shirt');
let tpl = document.getElementById('template');
let filter = document.getElementById('filter');
let prcFilter = document.getElementById('priceFilter');
let frag = document.createDocumentFragment();
let teamFilter = filter;

fetch('shirts.json')
    .then(response => {
      if (!response.ok) throw new Error('Products not found!');
      return response.json();
    })

    .then(data => {
        products = data;
        let teams = [];
        
        products.forEach(p => {
            if (!teams.includes(p.team)){
                teams.push(p.team);
            }
        });
        teams.unshift('All');

        teams.forEach(team => {
            let opt = document.createElement('option');
            opt.value = team;
            opt.textContent = team;
            filter.appendChild(opt);
        });
        console.log(products);
        disProducts(products);
    });

function disProducts(list) {
    container.innerHTML = "";
    if (!list || list.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'No products found.';
        container.appendChild(msg);
        return;
    }
    list.forEach(p => {
        let clone = tpl.content.cloneNode(true);
        
        clone.querySelector('.pic').src = p.image;
        clone.querySelector('.pic').alt = p.name;
        clone.querySelector('.shirtName').textContent = p.name;
        clone.querySelector('.price').textContent = `${p.price} €`;
        frag.appendChild(clone);
    });
    container.appendChild(frag);
}

// combine team, price and search filters
function applyFilters() {
    const searchTerm = input.value.trim().toLowerCase();
    const team = teamFilter.value;
    const price = prcFilter.value;

    const filtered = products.filter(p => {
        // team filter
        if (team && team !== 'All' && p.team !== team) return false;

        // price filter
        if (price === 'under50' && !(p.price < 50)) return false;
        if (price === 'between50&100' && !(p.price >= 50 && p.price <= 100)) return false;
        if (price === 'over100' && !(p.price > 100)) return false;

        // search filter (match name or team)
        if (searchTerm) {
            const name = p.name.toLowerCase();
            const teamName = p.team.toLowerCase();
            if (!name.includes(searchTerm) && !teamName.includes(searchTerm)) return false;
        }
        return true;
    });

    disProducts(filtered);
}

teamFilter.addEventListener('change', applyFilters);
prcFilter.addEventListener('change', applyFilters);
btn.addEventListener('click', applyFilters);
input.addEventListener('keydown', function(k) {
    if (k.key === 'Enter') {
        k.preventDefault();
        applyFilters();
    }
});