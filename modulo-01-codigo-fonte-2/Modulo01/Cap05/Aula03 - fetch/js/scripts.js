fetch('https://api.github.com/users/raphatorres89').then((res) => {
  res
    .json()
    .then((data) => {
      showData(data);
    })
    .catch((error) => {
      console.log('erro');
    });
});

const showData = (data) => {
  const user = document.querySelector('#user');
  user.textContent = `${data.login} ${data.name}`;
};
