var myForm=document.getElementById('myform')
async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementsByName('name')[0].value;
    const description = document.getElementById('description').value;
    console.log(description);
    const response = await fetch('http://localhost:3300/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await response.json();
      console.log('Inserted data:', data);
    }  

  myForm.addEventListener('submit', handleSubmit);

