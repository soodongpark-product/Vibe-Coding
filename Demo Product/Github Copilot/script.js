document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator-buttons button');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            if (value === 'C') {
                currentInput = '';
                display.value = '';
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                    display.value = currentInput;
                } catch {
                    display.value = 'Error';
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
});
