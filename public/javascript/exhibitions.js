onload();

function onload(){
  fetch('https://tinmarin.herokuapp.com/api/v1/exhibitions', {
    method: 'GET'
  }).then(res => res.json())
  .then(data => {
    let filas = "";
    let i = 1;
    data.forEach(element => {
      filas = filas + `
        <tr>
          <th scope="row">${i}</th>
          <td>${element.name}</td>
          <td><p>${element.description}</p></td>
          <td><button type="button" class="btn btn-danger">Borrar</button></td>
        </tr>
      `
      i++;
    });
    let tabla = document.getElementsByClassName("cuerpo-table")[0];
    console.log(tabla);
    tabla.innerHTML = filas;
  })
}