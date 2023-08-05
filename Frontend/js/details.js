
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idValue = urlParams.get('id');
console.log(idValue); 
function getUser(id){
 
    fetch(`http://localhost:3300/getbyId/${id}`)
    .then((response) => {
      // First attempt to read the JSON data
      return response.json();
    })
    .then((data) => {
       
      console.log(data)
      for (const item of data) {
        document.getElementById('name').innerText=item.name;
        document.getElementById('description').innerText=item.description;
      }
 
      

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


let deleteUser=(id)=>{
 
    fetch(`http://localhost:3300/delete/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then((response) => {
      // First attempt to read the JSON data
      return response.json();
    })
    .then((data) => {
       
      console.log(data)
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    location.reload(true);
    window.location.href="index.html"

}

getUser(idValue);
var button=document.getElementById('delete');
button.addEventListener('click',e =>{
  e.preventDefault();
  deleteUser(idValue);
});

var button=document.getElementById('update');
button.addEventListener('click',e =>{
  e.preventDefault();
  var name=document.getElementById('name').innerText;
  var description=document.getElementById('description').innerText;
  const baseUrl = 'update.html'; 
  const urlWithQueryParam = `${baseUrl}?id=${idValue}&name=${name}&description=${description}`;
   window.location.href = urlWithQueryParam;
});