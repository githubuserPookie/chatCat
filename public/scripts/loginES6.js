const submit = document.getElementById("theForm");
const loginUser = async(event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const result = await fetch("/auth/checkLogin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(async(response) => {
        const theRes = await response.json();
        if(theRes.sucess === "true"){
            window.location.replace("/home");
        }
        else{
            alert(theRes.sucess)
        }
    })
}
submit.addEventListener("submit", loginUser);