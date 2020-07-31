window.addEventListener('load', function () {
  doFetch();

  executeDivisionPromise();
});

async function doFetch() {
  const res = await fetch('https://api.github.com/users/raphatorres89');
  const json = await res.json();
  console.log(json);
  showData(json);
}

async function executeDivisionPromise() {
  const division = await divisionPromise(12, 6);
  console.log(division);
}

const showData = (data) => {
  const user = document.querySelector('#user');
  user.textContent = `${data.login} ${data.name}`;
};

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por zero');
    }

    resolve(a / b);
  });
}
