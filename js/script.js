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

const DIGITS = {
  '0': ' _ | ||_|',
  '1': '     |  |',
  '2': ' _  _||_ ',
  '3': ' _  _| _|',
  '4': '   |_|  |',
  '5': ' _ |_  _|',
  '6': ' _ |_ |_|',
  '7': ' _   |  |',
  '8': ' _ |_||_|',
  '9': ' _ |_| _|',
}

const app = () => {

  //handle form
  document.getElementById('bankForm').onsubmit = (event) => {
    
    event.preventDefault();
    
    const bankFormData = new FormData(document.forms.bankForm);
    
    const input = bankFormData.get('account-number');
    const output = convert(input);
    
    document.getElementById('output').value = output;

  };

  const convert = (input) => {
    if(input.length === 9) {
      return encode(input);
    } else if(input.length >= 83) {
      const output = decode(input);
      return output;
    } else {
      return Error('Invalid length: ' + input.length);
    }
  }

  const decode = (input) => {

    const lines = input.split('\n');

    asciiNums = [];

    for(var i = 0; i < 9; i++) {
      asciiNums.push(
        lines[0].substring(3*i, (3*i)+3) + 
        lines[1].substring(3*i, (3*i)+3) + 
        lines[2].substring(3*i, (3*i)+3)
      );
    }

    for(var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].slice(0, 27);
    }

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

  const encode = (input) => {

    input = input.toString();

    if(input.length !== 9) {
      return Error('Invalid length.');
    }

    const lines = [];

    for(var i = 0; i < input.length; i++) {
      
      const digit = input[i];
      const encoded = DIGITS[digit];

      lines.push([
        encoded.substring(0,3),
        encoded.substring(3,6),
        encoded.substring(6,9)
      ]);

    }

    const outputLines = [
      lines[0][0] + lines[1][0] + lines[2][0] + lines[3][0] + lines[4][0] + lines[5][0] + lines[6][0] + lines[7][0] + lines[8][0],
      lines[0][1] + lines[1][1] + lines[2][1] + lines[3][1] + lines[4][1] + lines[5][1] + lines[6][1] + lines[7][1] + lines[8][1],
      lines[0][2] + lines[1][2] + lines[2][2] + lines[3][2] + lines[4][2] + lines[5][2] + lines[6][2] + lines[7][2] + lines[8][2],
    ];

    return outputLines.join('\n');

  }

  return {
    convert: (convert),
    decode: (decode),
    encode: (encode)
  }

}

const bankMachine = app();
