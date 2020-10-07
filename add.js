const addBtn = document.getElementById('addBtn');
const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');
const description = document.getElementById('description');
const contactPersonName = document.getElementById('contactPersonName');
const contactPersonNumber = document.getElementById('contactPersonNumber');

addBtn.addEventListener('click', () => {
    const newStatement = new Statement(titleInput.value, contactPersonName.value, contactPersonNumber.value, null, description.value, null, null, imageInput.value); 
    addStatement(newStatement);
});

const addStatement = (statementParam) => {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/statements",
        data: statementParam
    })
    .done(function (data) {
        //გადამისამართება იმის შემდეგ რაც ჩავამატეთ განცხადება
        // window.location.href = "";
    });
}
