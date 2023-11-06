function rot13(str) {
    function shift(char) {
      if (char.match(/[A-Z]/)) {
        const charCode = char.charCodeAt(0);
        const rotatedCharCode = ((charCode - 65 + 13) % 26) + 65;
        return String.fromCharCode(rotatedCharCode);
      }
      return char;
    }
  
    const decodedStr = str.split('').map(shift).join('');
    return decodedStr;
  }
  
  console.log(rot13("RAPBQR VF NJRFBZR"));