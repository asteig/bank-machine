const ASCII = {
  ' _ | ||_|': '0',
  '     |  |': '1',
  ' _  _||_ ': '2',
  ' _  _| _|': '3',
  '   |_|  |': '4',
  ' _ |_  _|': '5',
  ' _ |_ |_|': '6',
  ' _   |  |': '7',
  ' _ |_||_|': '8',
  ' _ |_| _|': '9',
}

const app = () => {

  //handle form
  document.getElementById('bankForm').onsubmit = (event) => {
    event.preventDefault();
    
    const bankFormData = new FormData(document.forms.bankForm);
    
    const input = bankFormData.get('account-number');
    const output = decode(input);
    
    document.getElementById('output').innerHTML = output;

  };

  const decode = (input) => {

    if(input.length !== 83) {
      return Error('Invalid Entry: Not 83 chars.');
    }

    const lines = input.split('\n');

    const asciiNums = [
      lines[0].substring( 0, 3) + lines[1].substring( 0, 3) + lines[2].substring( 0, 3),
      lines[0].substring( 3, 6) + lines[1].substring( 3, 6) + lines[2].substring( 3, 6),
      lines[0].substring( 6, 9) + lines[1].substring( 6, 9) + lines[2].substring( 6, 9),
      lines[0].substring( 9,12) + lines[1].substring( 9,12) + lines[2].substring( 9,12),
      lines[0].substring(12,15) + lines[1].substring(12,15) + lines[2].substring(12,15),
      lines[0].substring(15,18) + lines[1].substring(15,18) + lines[2].substring(15,18),
      lines[0].substring(18,21) + lines[1].substring(18,21) + lines[2].substring(18,21),
      lines[0].substring(21,24) + lines[1].substring(21,24) + lines[2].substring(21,24),
      lines[0].substring(24,27) + lines[1].substring(24,27) + lines[2].substring(24,27),
    ];

    let accountNumString = '';

    for(var i=0; i<asciiNums.length; i++) {
      
      let decodedNumber = ASCII[asciiNums[i]];
      
      if(!decodedNumber) {
        decodedNumber = '?';
      }

      accountNumString = accountNumString + decodedNumber;

    }

    return accountNumString;

  }

  return {
    decode: (decode)
  }

}

const bankMachine = app();
