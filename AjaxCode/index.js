let btn = document.querySelector('#b');
btn.addEventListener('click', myFunction);

function myFunction(){
    let xhttp ;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest(); 
    }else{
        xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    };
    xhttp.open('GET', 'user.json', true);
    xhttp.onload = function () {
        if(this.status == 200){
            var user = JSON.parse(this.responseText);
            var output = '';
            for(var i in user){
            output += `
            <ul class = 'list-unstyled mt-4'>
            <li>Id :  ${user[i].id}</li>
            <li>Name :  ${user[i].name}</li>
            <li>Email :  ${user[i].email}</li>
            <li>City :  ${user[i].address.city}</li>
            </ul>
            `
            }
            document.querySelector('#maha').innerHTML = output;
        }else if(this.status == 404){
            document.querySelector('#maha').innerHTML = 'File Not Found';
        }
    };
        xhttp.send();
}