let allUsers = [];
let filteredUsers = [];
let countUsers = 0;

let countMale = 0;
let countFemale = 0;
let amountAges = 0;
let averageAges = 0;

let filter = null;
let btn = null;

let userTitle = null;
let userDiv = null;
let statsTitle = 'Nada a ser exibido';
let statsDiv = null;

window.addEventListener('load', async () => {
  filter = document.querySelector('#filter');
  filter.addEventListener('keyup', handleFilter);

  btn = document.querySelector('#btn');

  userTitle = document.querySelector('#userTitle');
  userDiv = document.querySelector('#userDiv');
  statsTitle = document.querySelector('#statsTitle');
  statsDiv = document.querySelector('#statsDiv');

  await fetchData();
  render();
});

function handleFilter(event) {
  filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(event.target.value.toLowerCase());
  });
  render();
}

async function fetchData() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: `${name.first} ${name.last}`,
      picture: picture.large,
      age: dob.age,
      gender: gender,
    };
  });
}

function render() {
  renderCounts();
  renderFilteredUsers();
  renderStats();
}

function renderCounts() {
  countMale = filteredUsers.filter((user) => user.gender === 'male').length;
  countFemale = filteredUsers.filter((user) => user.gender === 'female').length;
  amountAges = filteredUsers.reduce((acc, cur) => acc + cur.age, 0);
  averageAges = amountAges / filteredUsers.length;
}

function renderFilteredUsers() {
  if (filteredUsers.length === 0) {
    userDiv.innerHTML = '<h4>Nenhum usuário filtrado</h4>';
    return;
  }

  userDiv.innerHTML = `<h4>${filteredUsers.length} usuário(s) encontrado(s)</h4>`;
  filteredUsers.forEach((user) => {
    return (userDiv.innerHTML += `
      <div class="row">
        <img src="${user.picture}" alt="${user.name}" class="circle" width="40">
        ${user.name}, ${user.age} anos
      </div>
    `);
  });
}

function renderStats() {
  if (filteredUsers.length === 0) {
    statsDiv.innerHTML = '<h4>Nada a ser exibido</h4>';
    return;
  }

  statsDiv.innerHTML = `<h4>Estatísticas</h4>
    <ul>
      <li>Sexo masculino: <strong>${countMale}</strong></li>
      <li>Sexo feminino: <strong>${countFemale}</strong></li>
      <li>Soma das idades: <strong>${amountAges}</strong></li>
      <li>Média das idades: <strong>${averageAges}</strong></li>
    </ul>
  `;
}
