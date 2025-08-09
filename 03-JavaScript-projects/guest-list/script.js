const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

const admitted = document.getElementById('admitted');
const refused = document.getElementById('refused');
admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';

// loop starts here
for (i = 0; i < people.length; i++){
if (people[i] !== "Phil" && people[i] !== "Lola"){
        admitted.textContent += people[i] + ', ';
} else {
    refused.textContent += people[i] + ', ';
}}
