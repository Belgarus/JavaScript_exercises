const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

const admitted = document.querySelector('.admitted');
const refused = document.querySelector('.refused');
admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';
guest = ""

// loop starts here
for (i = 0; i > people.length; i++)
if (people !== "Phil" && people !== "Lola"){
        admitted.textContent += people[i] + '';
} else {
    refused.textContent += people[i]
}

// refused.textContent += ;
// admitted.textContent += ;