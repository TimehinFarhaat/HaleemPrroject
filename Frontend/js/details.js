function getUser(id){
    window.location.href = 'widget.html';
    fetch(`http://localhost:3300/getbyId/${id}`)
    .then((response) => {
      // First attempt to read the JSON data
      return response.json();
    })
    .then((data) => {
      console.log(data)
        // document.getElementById('name').innerText=data.name;
        // document.getElementById('description').innerText=data.description;
      

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}