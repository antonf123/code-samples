var printSpiral = function (matrix) {
  console.log('hello');
  var i;
  var top = 0;
  var left = 0;
  var bottom = matrix.length;
  var right = matrix[0].length;

  console.log('top:' + top);
  console.log('bottom:' + bottom);
  console.log('left:' + left);
  console.log('right:' + right);

  while (top < bottom && left < right) {

    //print top 
    for (i = left; i < right; i += 1) {
      console.log(matrix[top][i]);
    }
    top++;

    //print right column
    for (i = top; i < bottom; i += 1) {
      console.log(matrix[i][right - 1]);
    }
    right--;

    if (top < bottom) {
      //print bottom
      for (i = right - 1; i >= left; i -= 1) {
        console.log(matrix[bottom - 1][i]);
      }
      bottom--;
    }

    if (left < right) {
      //print left column
      for (i = bottom - 1; i >= top; i -= 1) {
        console.log(matrix[i][left]);
      }
      left++;
    }
  }
};

