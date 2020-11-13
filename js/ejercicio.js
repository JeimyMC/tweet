const written = document.getElementById("tuit");
const button = document.getElementById("enviar");
const listOfTuits = document.querySelector(".person-tuits");
const ul = document.createElement("ul");
listOfTuits.appendChild(ul);

function maketweet(
  parametro1,
  parametro2,
  parametro3,
  parametro4,
  esteTexto,
  id
) {
  const li = document.createElement("li");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const footer = document.createElement("footer");
  const img = document.createElement("img");
  const texto = document.createElement("p");
  texto.setAttribute("class", "texto");
  const fecha = document.createElement("footer");
  const buttonDelete = document.createElement("button");
  const date = new Date();
  const tuit = ul.appendChild(li);
  tuit.appendChild(buttonDelete).textContent = "x";
  buttonDelete.addEventListener("click", () => {
    keep.splice(compliteTuit.id, 1);
    let changeKeep = keep;
    keep = changeKeep;
    localStorage.setItem("keep", JSON.stringify(keep));
    tuit.remove();
  });
  const compliteTuit = {
    img: (tuit.appendChild(img).src = parametro1),
    h1: (tuit.appendChild(h1).textContent = parametro2),
    p: (tuit.appendChild(p).textContent = parametro3),
    footer: (tuit.appendChild(footer).textContent = parametro4),
    texto: (tuit.appendChild(texto).textContent = esteTexto),
    fecha: (tuit.appendChild(
      fecha
    ).textContent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`),
    id: id,
  };
  return compliteTuit;
}

let keep = [];
window.onload = function () {
  const recuperar = JSON.parse(localStorage.getItem("keep"));
  if (recuperar) {
    for (let i = 0; i < recuperar.length; i++) {
      keep.push(
        maketweet(
          recuperar[i].img,
          recuperar[i].h1,
          recuperar[i].p,
          recuperar[i].footer,
          recuperar[i].texto,
          i
        )
      );
    }
  }
};

function keepTuit(tuit) {
  keep.push(tuit);
  localStorage.setItem("keep", JSON.stringify(keep));
  console.log(keep);
}

const url = "https://randomuser.me/api/?results=1";
function data(url) {
  return fetch(url).then((response) => response.json());
}

async function getData(url, esteTexto) {
  const dataOfUser = await data(url);
  let userName = await dataOfUser.results;
  keepTuit(
    maketweet(
      userName[0].picture.medium,
      userName[0].name.first,
      userName[0].login.username,
      userName[0].email,
      esteTexto,
      keep.length
    )
  );
}

async function list() {
  const guardar = written.value;
  if (guardar.length === 0) {
    alert("Está vacío");
  } else if (guardar.length >= 200) {
    alert("No más de 200 caracteres");
  } else {
    const li = document.createElement("li");
    li.textContent = await getData(url, guardar);
  }
  written.value = "";
}

button.addEventListener("click", list);
