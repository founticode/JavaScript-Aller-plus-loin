let container = document.getElementById("articles");

fetch('https://api.github.com/users/founticode/repos')
  .then(response => response.json())
  .then(posts => {
    let ul = document.createElement('ul');

    posts.forEach(post => {
      let li = document.createElement('li');
      li.textContent = post.name;
      ul.appendChild(li);
    });

    container.appendChild(ul);
  })
  .catch(error => {
    container.innerText = "Erreur lors de la récupération des données.";
    console.error(error);
  });
