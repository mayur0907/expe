async function login(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj = {
        email,
        password,
    };

    await axios
        .post("http://localhost:3000/login", obj)
        .then((response) => {
            alert(response.data.message);
            event.target.reset();
            localStorage.setItem("token", response.data.token);
            window.location.href = "./expense.html";
        })
        .catch((err) => {
            document.body.innerHTML += `<div style= "color:black;">${err.response.data.message}</div>`;
        });
}