const submit = document.getElementById("theForm");
    const registerUser = async(event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const result = await fetch("/auth/checkRegister", {
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
                console.log("was sucessfull");
                window.location.replace("/auth/login");
            }
            else{
                alert(theRes.sucess)
            }
        })
    }
    submit.addEventListener("submit", registerUser);