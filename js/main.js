document.addEventListener('DOMContentLoaded', () => {
   const windowHeight = window.innerHeight;
   let getButton = document.getElementById('getData');
   let getKey = document.getElementById('add-task');

   document.getElementById('background').style.height = windowHeight-1 + 'px';

   getButton.addEventListener('click', (e) => {
      e.preventDefault();
      handleAddQuest();
   });

   getKey.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
         e.preventDefault()
         handleAddQuest();
      }
   });

   function getCurrentDate() {
      const today = new Date();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      const year = today.getFullYear();

      if (month < 10) {
         month = '0' + month;
      }

      if (day < 10) {
         day = '0' + day;
      }

      return `${year}-${month}-${day}`;
   }

   function handleAddQuest(){
      let addTask = document.getElementById('add-task');
      let quests = document.getElementById('quests');

      if (addTask.value.trim() === "") {
         if (document.getElementById('temporary')) document.getElementById('temporary').remove();
         let newItem = document.createElement('div');
         newItem.id = 'temporary';
         newItem.classList.add('lead', 'display-3', 'mt5', 'text-uppercase', 'text-danger');
         newItem.innerText = "Nie wpisałeś żadnego zadania!";
         quests.parentNode.insertBefore(newItem, quests);
      } else if (addTask.value.trim() !== "") {
         if (document.getElementById('temporary')) document.getElementById('temporary').remove();
         if(!document.getElementById('exist')) {
            let whiteArr = document.querySelector('#panel');
            whiteArr.classList.add('border-bottom')
         }


         let newDate = document.createElement('div');
         newDate.classList.add('col-sm-1', 'text-center');
         newDate.innerHTML = '<div class="position-relative"><p class="data-panel">Data: </p><br>';
         newDate.innerHTML += `<input type="date" min="yyyy-mm-dd" class="form-control-sm bg-success text-white border-white data-control"></div>`;

         let currentDate = getCurrentDate();
         newDate.querySelector('input[type="date"]').min = currentDate;
         newDate.querySelector('input[type="date"]').max = '9999-12-31';

         let dateInput = newDate.querySelector('input[type="date"]');
         dateInput.addEventListener('change', function(event) {
            dateInput.disabled = true;
         });

         let newQuestDiv = document.createElement('div');
         newQuestDiv.classList.add('col-sm-6', 'p-3', 'text-wrap');
         newQuestDiv.innerHTML = `<p id="inner-text"> ${addTask.value} </p>`;
         addTask.value = '';

         let newRemove = document.createElement('div');
         newRemove.classList.add('col-sm-1', 'text-center','p-2', 'justify-content-center',);
         newRemove.innerHTML = '<button class="btn btn-success btn-outline-light">Zakończ</button>';
         newRemove.addEventListener('click', (e) => {
            e.preventDefault();
            let finished = e.target.parentNode.parentNode;
            finished.classList.replace('for-bird', 'for-bird-complete');
            finished.innerHTML = `<span class="h1 mt5 text-uppercase text-light" id="tmp-bird">Zaliczone!</span>`
            document.getElementById('tmp-bird').id = 'bird';
            setTimeout((e)=>{
               finished.remove();
               if(document.getElementById('quests').childElementCount === 0) document.querySelector('#panel').classList.remove('border-bottom');
            }, 950);
         })

         let row = document.createElement('div');
         row.classList.add('for-bird', 'row', 'justify-content-center', 'mt-2', 'd-flex', 'align-items-center', 'border-bottom', 'p-1', 'position-relative');
         row.innerHTML = `<div id="move-div"><span class="move-panel move-up">▲</span><br><span class="move-panel move-down">▼</span></div>`;
         row.appendChild(newDate);
         row.appendChild(newQuestDiv);
         row.appendChild(newRemove);
         quests.appendChild(row);
      }
   }

   document.addEventListener('click', (event) => {
      if (event.target.matches('.move-up')) {
         const row = event.target.closest('.row');
         const prevElement = row.previousElementSibling;
         if (prevElement) {
            const quests = document.getElementById('quests');
            quests.insertBefore(row, prevElement);
         }
      }

      if (event.target.matches('.move-down')) {
         const row = event.target.closest('.row');
         const nextElement = row.nextElementSibling;
         if (nextElement) {
            const quests = document.getElementById('quests');
            if (nextElement.nextElementSibling) {
               quests.insertBefore(row, nextElement.nextElementSibling);
            } else {
               quests.appendChild(row);
            }
         }
      }
   });
});
