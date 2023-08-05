const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idValue = urlParams.get('id');
const nameValue = urlParams.get('name');
const descriptValue = urlParams.get('description');
console.log(idValue); 
console.log(nameValue); 
console.log(descriptValue); 

nameElement=document.getElementsByName('name')[0];
nameElement.setAttribute('placeholder', nameValue);
descriptElement=document.getElementById('description');
descriptElement.setAttribute('placeholder',descriptValue)

var myForm=document.getElementById('myform')
async function handleSubmit(event) {
    event.preventDefault();
    var name = document.getElementsByName('name')[0].value;
    var description = document.getElementById('description').value;
    if(name == null || name ==""){
        name=nameValue;
    }
    if(description == "" || description== null){
        description = descriptValue;
    }
    console.log(description);
    const response = await fetch(`http://localhost:3300/update/${idValue}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await response.json();
      console.log('Inserted data:', data);
  
      const baseUrl = 'widget.html'; 
      const urlWithQueryParam = `${baseUrl}?id=${idValue}`;
      location.reload(true);
      window.location.href = urlWithQueryParam;
    }  

  myForm.addEventListener('submit', handleSubmit);