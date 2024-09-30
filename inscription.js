
// let btn = document.getElementById("btn");
let button = document.getElementById("send");
let input1 = document.getElementById("form1");
let input2= document.getElementById("form2");
let input3 = document.getElementById("form3");


let table = [];
let tab  = JSON.parse(localStorage.getItem("item"))
button.addEventListener("click", (e) => {

    // table.push(localStorage.getItem("item"));
    let prenom = input1.value;
    let email = input2.value;
    let pass = input3.value;

    const objet = {nom: input1.value, email: input2.value, pass: input3.value};

    table.push(objet)

    localStorage.setItem("item", JSON.stringify(table));
    
    if( !email.includes("@")){
        alert("Entrez une mail correcte")
        return ;
    }else {
        document.location.href = 'connexion.html'

    }
})
