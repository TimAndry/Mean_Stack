function heap(arr, val){
  if(arr[0] == undefined){
    arr.push(val);
    console.log(arr);
    var i = arr.length -1;
    while(i > 1){
      if(arr[i] < arr[Math.ceil((i-1)/2)]){
        var temp = arr[i];
        arr[i] = arr[Math.ceil((i-1)/2)];
        arr[Math.ceil((i-1)/2)] = temp;
        i = Math.ceil(i-1)/2;
        console.log(i);
        console.log(arr[i]);
      }
      else{
        return arr
      }
      console.log(arr);
    } 
  }
  else return false;
}


heap([undefined,9,4,6,5,11,14,21,18,20,14], 1);
console.log(Math.floor(5.5));
