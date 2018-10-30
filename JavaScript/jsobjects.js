let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];
 
for(var i in students){
  console.log(Object.keys(students[i])[0] +': '+ students[i].name + ', ' + Object.keys(students[i])[1] + ': '+ students[i].cohort);
  //           "prints the first key at that student"
}


