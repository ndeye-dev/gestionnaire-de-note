
// // let page = document.getElementById("sec");

let tab  = JSON.parse(localStorage.getItem("table"))
let studentss = [];

document.addEventListener('DOMContentLoaded', () => {

  studentss = JSON.parse(localStorage.getItem('table')) || [];

    const ajouter = document.getElementById('formulaire');
    const rechercher = document.getElementById('search');
    const nombrEtudiant = document.getElementById('compteur');
    const totalNote = document.getElementById('total-sum');
    const grandMoyenne = document.getElementById('grande');
    const tab = document.querySelector('#table-container');
    const pagination = document.getElementById('pagination-controls');

    // Fonction pour mettre à jour les cards
    function lesCard() {
      const compteur = studentss.length;
      const totalNoteSum = studentss.reduce((somme, student) => somme + student.note, 0);
      // const totalNoteSum = studentss.reduce((c, a) => c + a.note, 0);
      const moyenneEleve = studentss.reduce((max, student) => Math.max(max, student.moyenne), 0);
  
      nombrEtudiant.textContent = compteur;
      totalNote.textContent = totalNoteSum;
      grandMoyenne.textContent = moyenneEleve;

    }
  // localStorage

  const page = 5;
  let currentPage = 1;

  function tableaux() {
    const start = (currentPage - 1) * page;
    const end = start + page;
    const tabEtudiant = studentss.slice(start, end);

      let tableHtml = '<table>';
      tableHtml += '<tr><th>Prenom</th><th>Nom</th><th>Note</th><th>Moyenne</th><th>Action</th></tr>';

      tabEtudiant.forEach((student, index) => {
        // const actualIndex = start + index;
          tableHtml += `</td>
          <td>${student.prenom}</td><td>${student.nom}</td><td>${student.note}</td><td>${student.moyenne}</td>
          <td> <i class="fa-regular fa-eye voir" donnee="${index}"></i>
               <i class="fa-regular fa-pen-to-square modifier " donnee="${index}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
               <i class="fa-solid fa-trash supprimer" donnee="${index}"></i>
              </td>
               </td>
          </tr>`;
          
      });

      tableHtml += '</table>';
      document.querySelector('#table-container').innerHTML = tableHtml;

        // Ajouter des écouteurs d'événements pour les icônes
          document.querySelectorAll('.voir').forEach(icon => {
          icon.addEventListener('click', voirEtudiant);
        });
          document.querySelectorAll('.supprimer').forEach(icon => {
          icon.addEventListener('click', suppEtudiant);
        });
      
          document.querySelectorAll('.modifier').forEach(icon => {
          icon.addEventListener('click', modifieEtudiant);
      });
   
      afficherPagination();
  }
  function afficherPagination() {
         const totalPages = Math.ceil(studentss.length / page);
    
         let paginationHtml = '';
         for (let i = 1; i <= totalPages; i++) {
             paginationHtml += `<button class="pagination-button" data-page="${i}">${i}</button>`;
         }
         pagination.innerHTML = paginationHtml;
    
         document.querySelectorAll('.pagination-button').forEach(button => {
             button.addEventListener('click', function () {
                 currentPage = parseInt(this.getAttribute('data-page'));
                 tableaux();
             });
         });
     }
     
      function voirEtudiant(e) {
        const index = e.target.getAttribute('donnee');
        const student = studentss[index];
        alert(`Prenom: ${student.prenom}\nNom: ${student.nom}\nNote: ${student.note}\nMoyenne: ${student.moyenne}`);
    }

    // fonction modification
    function modifieEtudiant(e) {
      const index = e.target.getAttribute('donnee');
      const student = studentss[index];
  
      document.getElementById('first').value = student.prenom;
      document.getElementById('last').value = student.nom;
      document.getElementById('notee').value = student.note;
      document.getElementById('moyennn').value = student.moyenne;
  
      document.getElementById('formul').addEventListener('submit', function(e) {
          e.preventDefault();
          const newFirstName = document.getElementById('first').value;
          const newLastName = document.getElementById('last').value;
          const newNote = parseInt(document.getElementById('notee').value);
          const newMoyenne = parseInt(document.getElementById('moyennn').value);
  
          studentss[index] = { prenom: newFirstName, nom: newLastName, note: newNote, moyenne: newMoyenne };
          
          localStorage.setItem('table', JSON.stringify(studentss));
  
          tableaux();
          lesCard();
  
          // Fermer le modal après modification
          const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
          modal.hide();
      });
  }

    function suppEtudiant(e) {
        const index = e.target.getAttribute('donnee');
        studentss.splice(index, 1);
        localStorage.setItem('table', JSON.stringify(studentss));
        tableaux();
        lesCard();
    }
    function addStudent(prenom, nom, note, moyenne) {
      studentss.push({ prenom, nom, note, moyenne });
      localStorage.setItem('table', JSON.stringify(studentss));
      tableaux();
      lesCard();
    }
  
    ajouter.addEventListener('submit', (event) => {
      event.preventDefault();
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const note = parseFloat(document.getElementById('note').value);
      const moyenn = parseFloat(document.getElementById('moyenn').value);
      addStudent(firstName, lastName, note, moyenn);


      ajouter.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
      modal.hide();

      console.log(firstName);
      console.log(lastName);
      console.log(note);
      console.log(moyenn);
    });
  
    // Fonction pour filtrer les étudiants
    function filter() {
      const filterValue = rechercher.value.toLowerCase();
      const ligne = tab.querySelectorAll('tr');
  
      ligne.forEach(letter => {
        const firstName = letter.textContent.toLowerCase();
        if (firstName.includes(filterValue)) {
          letter.style.display = '';
        } else {
          letter.style.display = 'none';
        }
      });
    }
    rechercher.addEventListener('input', filter);

    tableaux();
    lesCard();
  });


//   function rtn() {
//     window.history.back();
//  }