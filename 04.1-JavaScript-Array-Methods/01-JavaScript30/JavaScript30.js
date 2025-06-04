const inventors = [{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955},
                                  {first: 'Isaac', last: 'Newton', year: 1643, passed: 1727},
                                  {first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642},
                                  {first: 'Marie', last: 'Curie', year: 1867, passed: 1934},
                                  {first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630},
                                  {first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543},
                                  {first: 'Max', last: 'Planck', year: 1858, passed: 1947}];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick',
                            'Beddoes, Mick','eecher, Henry', 'Beethoven, Ludwig', 
                            'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchey, Robert', 
                            'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 
                            'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric',
                            'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 
                            'Bernhard, Sandra', 'Berra, Yogi' , 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 
                            'Bevan, Aneurin', 'Bevel, Ken' , 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 
                            'Billings, Josh', 'Biondo Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert', 'Blair, Tony', 'Bl william'
                        ];

//filter inventors those who were born in the 1500 's with .filter()
const fifteens = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600 );

//An Array with the full name of the inventores with .map()
const  getFullName = inventors.map(inventor => `${inventor.first} ${inventor.last}`)

//Sort the Inventors by birthdate, from oldests to youngest
const inventorsBirth = inventors.sort((a,b) => a.year - b.year);

// How many years did the inventors live? .reduce()
const inventorsAge = inventors.reduce((acc, current)=> acc + (current.passed - current.year), 0);
//sort the inventors by years lived 
const oldests = inventors.sort(function(a, b) {
        const firstGuy = a.passed - a.year;
        const lastGuy = b.passed - b.year;
    return firstGuy > lastGuy ? -1 : 1;
});
console.table(oldests)
//create a list of boulevads that lived in paris