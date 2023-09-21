let expenseList = document.querySelector(".expense-list");
let leaderboardBtn = document.querySelector('#leaderboard-btn');
let generateReportBtn = document.querySelector('.generateReport');

expenseList.addEventListener("click", deleteExpense);
leaderboardBtn.addEventListener('click', updateLeaderboard);
generateReportBtn.addEventListener('click', generateReport);

window.addEventListener('load', showExpense(1));

const expensesPreferenceDropdown = document.getElementById('expensesPreference');


function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
}) {

    const button = document.getElementById('pagination');
    let buttonsHTML = []; // Create an array to store the pagination buttons

    if (hasPreviousPage) {
        // console.log("hasPreviousPage")
        buttonsHTML.push(`<button class="btn btn-primary" onclick="showExpense(${previousPage})">Previous Page</button>`);
    }

    if (hasNextPage) {
        // console.log("hasNextPage")
        buttonsHTML.push(`<button class="btn btn-primary" onclick="showExpense(${nextPage})">Next Page</button>`);
    }

    button.innerHTML = buttonsHTML.join(' ');
}

function generateReport(e) {
    const token = localStorage.getItem("token");
    axios
        .get("http://localhost:3000/download", {
            headers: { Authorization: token },
        })
        .then((response) => {
            if (response.status === 201) {
                //the bcakend is essentially sending a download link
                //  which if we open in browser, the file would download
                var a = document.createElement("a");
                a.href = response.data.fileUrl;
                a.download = "myexpense.csv";
                a.click();
            } else {
                throw new Error(response.data.message);
            }
        })
        .catch((err) => {
            showError(err);
        });
};

//  buy premium button function

document.getElementById("rzp-button1").onclick = async function (e) {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/get_order", {
        headers: { Authorization: token },
    });

    var option = {
        key: response.data.key_id,
        order_id: response.data.order.id,

        handler: async function (response) {
            await axios.post(
                "http://localhost:3000/post_order",
                {
                    order_id: option.order_id,
                    payment_id: response.razorpay_payment_id,
                },
                { headers: { authorization: token } }
            );

            alert("you are a Premium User Now");
            document.getElementById("rzp-button1").style.visibility = "hidden";
            document.querySelector('.leaderboard').classList.remove('d-none');

        },
    };
    const rzp1 = new Razorpay(option);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", function (response) {
        console.log(response);
        alert("Something went wrong");
    });
};

//  save expenses in database

async function savetolocalstorage(e) {
    try {
        e.preventDefault();
        const expense = e.target.expense.value;
        const description = e.target.description.value;
        const category = e.target.category.value;

        const obj = {
            expense,
            description,
            category,
        };
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/expense", obj, {
            headers: { Authorization: token },
        });

        e.target.reset();
        showOnScreen(obj);
    } catch (err) {
        console.log(err);
    }
}

// show expenses on screen

function showOnScreen(obj) {
    try {

        let output = `<tr>
    <th scope="row">${obj.description}</th>
    <td>${obj.category}</td>
    <td>${obj.expense}</td>
    <td id="delete-btn">
        <button type="button" id="${obj.id}" class="btn small delete">Delete</button>
    </td>
   </tr>`;
        let t = document.getElementById("tbody");
        t.innerHTML += output;
    } catch (err) {
        console.log(err);
    }
}

// update leaderboard

async function updateLeaderboard(e) {

    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(
            "http://localhost:3000/leaderboard",
            { headers: { Authorization: token } }
        );

        response.data.forEach(userDetail => {
            let output = `<tr>
            <td>${userDetail.name}</td>
            <td>${userDetail.totalExpense || 0}</td>
           </tr>`;
            var tablerow = document.getElementById("tbodyleader");
            tablerow.innerHTML += output;

        })
    } catch (e) {
        console.log(e);
    }
}

// Delete Expense From Database

async function deleteExpense(e) {
    if (e.target.classList.contains("delete")) {
        const id = e.target.getAttribute("id");
        e.target.parentElement.parentElement.remove();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await axios.delete(`http://localhost:3000/delete_expense/${id}`, {
                    headers: { Authorization: token },
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
}

function saveExpensePreference(expensePreference) {
    localStorage.setItem('expensesPreference', expensePreference);
    showExpense()
}

expensesPreferenceDropdown.addEventListener('change', function () {
    const selectedValue = expensesPreferenceDropdown.value;
    saveExpensePreference(selectedValue);
});

// show leaderboard button and hide buyPremium button on screen
// show expenses on screen

async function showExpense(page) {
    tbody.innerHTML = "";

    const token = localStorage.getItem("token");

    const expensePreference = localStorage.getItem('expensesPreference');

    const pagesize = expensePreference ? parseInt(expensePreference) : 10;
    if (!page || page < 1) {
        page = 1;
    }
    try {
        await axios.get(`http://localhost:3000/get_expenses?page=${page}&pagesize=${pagesize}`, {
            headers: { Authorization: token },
        })
            .then((result) => {
                const { currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage } = result.data;
                for (let i = 0; i < result.data.expenses.length; i++) {
                    showOnScreen(result.data.expenses[i]);
                }
                showPagination({ currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage })
            })
            .catch((err) => {
                throw new Error(err);
            });
    } catch (err) {
        console.log(err);
    }

}

window.addEventListener("DOMContentLoaded", (req, res) => {
    const token = localStorage.getItem("token");

    try {
        axios
            .get("http://localhost:3000/ispremiumuser", {
                headers: { Authorization: token },
            })
            .then((response) => {

                if (response.data === true) {
                    document.getElementById("rzp-button1").style.visibility = "hidden";
                    document.querySelector('.leaderboard').classList.remove('d-none');
                    document.querySelector('.generateReport').classList.remove('d-none');

                    updateLeaderboard();
                    res.status(202).json({ response: response });
                }
            })
            .catch((err) => {
                throw new Error(err);
            });

        // commit se h
    } catch (err) {
        res.status(500).json({ err: err });
    }
});