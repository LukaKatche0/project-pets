const petList = document.querySelector('.pet-list');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const statementsAsString = localStorage.getItem('statements');
const statementsAsArray = JSON.parse(statementsAsString);
const btn = document.getElementById('btn');
const input = document.getElementById('txt-input');
let statements = [];

localStorage.setItem('userName', 'luka');

const obj = {
    firstName: 'luka',
    lastName: 'katcheishvli'
};

// const objAsString = JSON.stringify(obj);
// localStorage.setItem('userObj', objAsString);

// const userName = localStorage.getItem('userName');
// console.log(userName);

// const objFromLocalStorage = localStorage.getItem('userObj');
// console.log(objFromLocalStorage);

// const parsedObj = JSON.parse(objFromLocalStorage);
// console.log(parsedObj);

btn.addEventListener('click', () => {
    localStorage.setItem('inputValue', input.value);
})

const getStatements = () => {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/statements",
    })
        .done(function (data) {
            statements = data;
            appendAllStatements(data);
            const deleteBtns = document.querySelectorAll('.delete-btn');
            console.log(statements);
            for (let i = 0; i < deleteBtns.length; i++) {
                deleteBtns[i].addEventListener('click', () => {
                    const statementId = parseInt(deleteBtns[i].getAttribute('statementId'));
                    // const statement = statements.find((statement) => {
                    //     return statement.id === statementId;
                    // });
                    deleteStatement(statementId);
                })
            }
        });
}

function toggleButtonVisibility() {
    const statementButtons = document.querySelectorAll('.statement-button');
    for (let i = 0; i < statementButtons.length; i++) {
        statementButtons[i].classList.toggle('hidden');
    }
}

const deleteStatement = (id) => {
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/statements/${id}`,
    })
        .done(function (data) {
            statements = data;
            getStatements();
        });
}

getStatements();

const appendStatement = (statement) => {
    const statementTemplate = `
    <div class="statement">
                <p class="statement-title">${statement.title}</p>
                <img class="statement-img" src=${statement.image} alt="">
                <p class="description">${statement.description}</p>
                <p class="author-info">ავტორის სახელი: ${statement.contactPersonName}</p>
                <p class="author-info">საკონტაქტო ნომერი: ${statement.contactPersonNumber}</p>
                <button class="delete-btn" statementId="${statement.id}">Delete Statement with Id: ${statement.id}</button>
    </div>`;
    petList.innerHTML += statementTemplate;
}

const appendAllStatements = (statements) => {
    petList.innerHTML = '';
    for (const statement of statements) {
        appendStatement(statement);
    }
}

searchBtn.addEventListener('click', () => {
    petList.innerHTML = '';
    if (searchInput.value === '') {
        appendAllStatements(statements);
        return;
    }
    const filteredArr = statements.filter((statement) => {
        // if (statement.title === searchInput.value) {
        //     return true;
        // } else {
        //     return false;
        // }
        return statement.title.includes(searchInput.value);
    });
    appendAllStatements(filteredArr);
});