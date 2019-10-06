const base_url = 'https://jsonplaceholder.typicode.com/users'

window.onload = function(){
//when need from database some data show on my site
const tbody = document.querySelector('tbody');
axios.get(base_url)
.then((res) => {
    res.data.forEach(userData => {
        createTdElement(userData, tbody)
    });
})
.catch((err) => console.log(err));

//when user new data save on your data base...
let savebtn = document.querySelector('#saveData');
savebtn.addEventListener('click', function(){
    createPostData();
})
}
//user post data collaction system...
function createPostData(){
    let nameField = document.querySelector('#name');
    let phoneField = document.querySelector('#phoneNum');
    let emailField = document.querySelector('#email');
    
    let userPostData = {
        name : nameField.value,
        phone : phoneField.value,
        email : emailField.value
    }
    axios.post(base_url, userPostData)
    .then(res =>{
        let tbody = document.querySelector('tbody');
        createTdElement(res.data, tbody);
        nameField.value = '';
        phoneField.value = '';
        emailField.value = '';
    })
}

//from server data while we need to save on my website...
function createTdElement(userData, parentElem){
    const mainTR = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.innerHTML = userData.name;
    mainTR.appendChild(nameTd);

    const PhoneTd = document.createElement('td');
    PhoneTd.innerHTML = userData.phone ? userData.phone : N/A;
    mainTR.appendChild(PhoneTd);

    const EmailTd = document.createElement('td');
    EmailTd.innerHTML = userData.email;
    mainTR.appendChild(EmailTd);

    const ActionTd = document.createElement('td');
    const actionEditBtn = document.createElement('button');
    actionEditBtn.className = 'btn btn-warning mr-2'
    actionEditBtn.innerHTML = 'Edit';

    actionEditBtn.addEventListener('click',function(){
        let mainModal = $('#editModal');
        mainModal.modal('toggle');

        let editNameF = document.querySelector('#EditName');
        let editPhoneF = document.querySelector('#EditPhone');
        let editEmailF = document.querySelector('#EditEmail');
        let updateSaveBtn = document.querySelector('#updateSave');

        editNameF.value = userData.name;
        editPhoneF.value = userData.phone;
        editEmailF.value = userData.email;
        updateSaveBtn.addEventListener('click',function(){
            let putUpdateData = {
                name : editNameF.value,
                phone : editPhoneF.value,
                email : editEmailF.value
            }
            axios.put(`${base_url}/${userData.id}`, putUpdateData)
                .then(res => {
                    nameTd.innerHTML = res.data.name;
                    PhoneTd.innerHTML = res.data.phone;
                    EmailTd.innerHTML = res.data.email;
                    mainModal.modal('hide');
                    editNameF.value = '';
                    editPhoneF.value = '';
                    editEmailF.value = '';
                })
                .catch(err => console.log(err))
        })
       
    })
    ActionTd.appendChild(actionEditBtn);

    const actionDeleteBtn = document.createElement('button');
    actionDeleteBtn.className = 'btn btn-danger';
    actionDeleteBtn.innerHTML = 'Delete';
    actionDeleteBtn.addEventListener('click', function () {
        axios.delete(`${base_url}/${userData.id}`)
            .then(res => {
                parentElem.removeChild(mainTR)
        })
        .catch(err => console.log(err))
    })

    ActionTd.appendChild(actionDeleteBtn);
    mainTR.appendChild(ActionTd);
    parentElem.appendChild(mainTR);
}
