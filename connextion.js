
let envoie = document.getElementById("envoyer");
let essaie1 = document.getElementById("typeEmail");
let essaie2 = document.getElementById("typePassword");

envoie.addEventListener("click" , (e) => {

    let maill = essaie1.value;
    let mot = essaie2.value;

    let recup = localStorage.getItem("item");
    // let set = localStorage.setItem("item", JSON.stringify(table));
    
    if(recup){
        let recuperat = JSON.parse(recup)
        
        let valide = true;
        recuperat.forEach(item => {
            if(item.email === maill && item.pass === mot){
                alert("Exact")
                return document.location.href="accueil.html"
            }else{
                alert("Verifier vos identifiants")
                return; 
            }
        });
       
    }else{
        alert("Incorrect")
        return;
    }
});