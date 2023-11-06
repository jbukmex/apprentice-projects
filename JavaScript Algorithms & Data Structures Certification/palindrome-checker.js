function palindrome(str) {

    let newstr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
    let revstr = newstr.split('').reverse().join('');
  
    return newstr === revstr;
  
  }
  
  console.log(palindrome("0_0 (: /-\ :) 0-0"));