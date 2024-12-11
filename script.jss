const transliterationMap = {
    'dz': 'ძ', 'w': 'წ', 'ch': 'ჩ', 'sh': 'შ', 'f': 'ფ', 'gh': 'ღ',
    'a': 'ა', 'b': 'ბ', 'g': 'გ', 'd': 'დ', 'e': 'ე', 'v': 'ვ', 'z': 'ზ', 
    't': 'ტ', 'i': 'ი', 'k': 'კ', 'l': 'ლ', 'm': 'მ', 'n': 'ნ', 'o': 'ო',
    'p': 'პ', 'r': 'რ', 's': 'ს', 'u': 'უ', 'q': 'ქ', 'y': 'ყ', 'x': 'ხ', 'j': 'ჯ', 
    'c': 'ც', 'T': 'თ', 'J': 'ჟ', 'kh': 'ხ', 'PH': 'ფ', 'h': 'ჰ', 'W': 'ჭ'
};

const allowedUppercase = ['T', 'J', 'W'];

document.getElementById('latinText').addEventListener('input', function() {
    let text = this.value;

    // Filter out any uppercase letters not in the allowed list
    text = text.split('').filter(char => {
        return !(char >= 'A' && char <= 'Z') || allowedUppercase.includes(char);
    }).join('');

    this.value = text; // Set the filtered text back to the input field

    let transliteratedText = rewrite(text);
    document.getElementById('georgianText').value = transliteratedText;
});

function rewrite(text) {
    for (let latin in transliterationMap) {
        let georgian = transliterationMap[latin];
        let regex = new RegExp(latin, 'g'); // Create a global regex for the Latin letters
        text = text.replace(regex, georgian);
    }
    return text;
}

function copyToClipboard() {
    const georgianText = document.getElementById('georgianText');
    georgianText.select();
    document.execCommand('copy');
    
    // Show the copied message
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.style.visibility = 'visible';

    // Hide the message after 2 seconds
    setTimeout(() => {
        copyMessage.style.visibility = 'hidden';
    }, 2000);
}
