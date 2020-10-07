const petList = document.querySelector('.pet-list');
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const statementsAsString = localStorage.getItem('statements');
const statementsAsArray = JSON.parse(statementsAsString);
let statements = [];

const getStatements = () => {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/statements",
    })
    .done(function (data) {
        statements = data;
        appendAllStatements(data);
    });
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