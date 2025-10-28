    const btn = document.getElementById('load');
    const out = document.getElementById('output');

    btn.addEventListener('click', () => {
      out.textContent = 'Loading...';

      // 1) نطلب من ال API
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        // 2) نبدلو الجواب من نص الى JSON
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        // 3) نستعملو الداتا باش نعرضوها
        .then(data => {
          out.textContent = JSON.stringify(data, null, 2);
        })
        // 4) نتعاملو مع الخطأ
        .catch(err => {
          out.textContent = 'Error: ' + err.message;
        });
    });