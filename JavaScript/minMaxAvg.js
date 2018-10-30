function maxMinAvg(arr){
  var max = arr[0];
  var avg = arr[0];
  var min = arr[0];
  for(var i = 0; i<arr.length; i++){
    if (arr[i] > max){
      max = arr[i];
    };
    if (arr[i] < min){
      min = arr[i]
    };
    avg = avg + arr[i];
  };
  avg = avg/arr.length;
  console.log(max, min, avg);

return ('the minimum number is ' + min + ', ' + 'the max number is ' + max + ', the average is ' + avg + '!')
}

maxMinAvg(arr=[1,-2,9,4])