document.querySelector('#getText').addEventListener('click', getTextFunc);
document.querySelector('#getJson').addEventListener('click', getJsonFunc);
document.querySelector('#getAPI').addEventListener('click', getAPIFunc);
document.querySelector('.addPost').addEventListener('submit', prosT);

function getTextFunc(){
   fetch('sample.txt')
   .then(res => res.text())
   .then(data => {
       document.querySelector('.output').innerHTML = `<h3 class='display-5'>${data}</h3>`
   })
};

function getJsonFunc(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
        let output2 = '<h2>Users</h2>';
        data.forEach(user => {
            output2 += `
            <ul class="list-group mb-3">
                <li class='list-group-item'>${user.id}</li>
                <li class='list-group-item'>${user.name}</li>
                <li class='list-group-item'>${user.email}</li>
                <li class='list-group-item'>${user.phone}</li>
            </ul>
            `
            document.querySelector('.json_output').innerHTML = output2;
        });
        
    });
};

function getAPIFunc(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) =>{
        let amar = 'POST';
        data.forEach(post => {
            amar += `
                <div class ='card card-body mb-4'>
                     <h5>${post.title}</h5>
                     <p class ="lead">${post.body}</p>
                </div> 
            `
        })
        document.querySelector('.apipost').innerHTML = amar;
        });
};

function prosT(e){
    e.preventDefault();
    let title = document.querySelector('#title');
    let body = document.querySelector('#body');
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method : 'POST',
        headers :{ 
            'Accept' : 'application/json , text/plain */*',
            'Content-type' : 'application/json'
            },
            body : JSON.stringify({title : title.value, body : body.value})
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        title.value = '';
        body.value  = '';
    }   