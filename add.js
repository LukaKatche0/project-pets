const addBtn = document.getElementById('addBtn');
const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');
const description = document.getElementById('description');
const contactPersonName = document.getElementById('contactPersonName');
const contactPersonNumber = document.getElementById('contactPersonNumber');

// const newStatement = new Statement(titleInput.nodeValue, contactPersonName.value, contactPersonNumber.value, null, description.value, null, null, imageInput.value); 

addBtn.addEventListener('click', () => {
    const newStatement = new Statement(titleInput.value, contactPersonName.value, contactPersonNumber.value, null, description.value, null, null, imageInput.value); 
    console.log(newStatement);
});
