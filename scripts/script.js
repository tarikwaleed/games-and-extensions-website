function saveData() {
    var name = document.getElementById("email").value;
    var password = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    localStorage.setItem("name",name);
    localStorage.setItem("email",password);
    localStorage.setItem("message",message)
};
