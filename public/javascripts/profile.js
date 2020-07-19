window.addEventListener('DOMContentLoaded', () => {
   
    const inputAvatar = document.querySelector('#input-avatar');
    const formContainer = document.querySelector('#form-conatainer');
    
    formContainer.addEventListener('click', (e) => {
        console.log('click!');
        inputAvatar.click();
    })

    inputAvatar.addEventListener('change', () => {
        formContainer.submit();
    })


})