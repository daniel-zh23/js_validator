let nameErrorElement = document.getElementById('nameError');
let egnErrorElement = document.getElementById('egnError');
let passwordErrorElement = document.getElementById('passwordError');
let emailErrorElement = document.getElementById('emailError');

document.getElementById('egn').addEventListener('change', (e) => {
    e.preventDefault();
    let date = validateEgn(e.target.value, egnErrorElement).date;
    document.getElementById('birthDate').valueAsDate = date;
    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
    }
    document.getElementById('age').value = age;
});

document.getElementById('mainForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let { name, egn, password, email } = Object.fromEntries(formData);
    let fields = {
        name: {
            value: name,
            errorElement: nameErrorElement,
            valid: true,
        },
        egn: {
            value: egn,
            errorElement: egnErrorElement,
            valid: true,
        },
        password: {
            value: password,
            errorElement: passwordErrorElement,
            valid: true,
        },
        email: {
            value: email,
            errorElement: emailErrorElement,
            valid: true,
        },
    };

    document.querySelectorAll('span.text-danger').forEach((e) => (e.textContent = ''));

    fields.name.valid = validateName(name, nameErrorElement);
    fields.egn.valid = validateEgn(egn, egnErrorElement).value;
    fields.password.valid = validatePassword(password, passwordErrorElement);
    fields.email.valid = validateEmail(email, emailErrorElement);

    Object.entries(fields).forEach((e) => {
        if (e[1].value === '') {
            e[1].errorElement.textContent = 'Field is required!';
        }
    });
});

function validateName(name, errorElement) {
    if (!/^([A-Z][a-z]+)(\ ([A-Z][a-z]+))?$/.test(name)) {
        errorElement.textContent = 'Name Should start with uppercase character! (second name is optional)';
        return false;
    }
    return true;
}

function validateEgn(egn, errorElement) {
    errorElement.textContent = '';
    let removefromMonth;
    let yearString;
    if (egn.length !== 10) {
        errorElement.textContent = 'EGN must be 10 numbers long!';
        return { valid: false, date: Date.now() };
    }
    if (egn[2] === '2' || egn[2] === '3') {
        yearString = '10' + egn.substring(0, 2);
        removefromMonth = 20;
    }
    if (egn[2] === '4' || egn[2] === '5') {
        yearString = '20' + egn.substring(0, 2);
        removefromMonth = 40;
    }
    let month = parseInt(egn.substring(2, 4)) - removefromMonth;
    let dayString = egn.substring(5, 6);
    let date = new Date(parseInt(yearString), parseInt(month) - 1, parseInt(dayString) + 1, 0, 0, 0, 0);
    console.log(parseInt(dayString));
    return { valid: true, date: date };
}

function validatePassword(password, errorElement) {
    let errString = '<p>Password should:</p><ul>';
    let isError = false;
    if (!/[A-Z]/.test(password)) {
        errString += '<li>   Contain uppercase!</li>';
        isError = true;
    }
    if (!/[0-9]/.test(password)) {
        errString += '<li>   Contain a number!</li>';
        isError = true;
    }
    if (!/[$&+,:;=?@#|'<>.-^*()%!]/.test(password)) {
        errString += '<li>   Containt special character!</li>';
        isError = true;
    }
    if (password.length < 8) {
        errString += '<li>   Be 8 or more characters!</li></ul>';
        isError = true;
    }

    if (isError) {
        errorElement.innerHTML = errString;
        return false;
    }

    return true;
}

function validateEmail(email, errorElement) {
    if (!/^[A-Za-z_.]+@[A-Za-z]+.[A-Za-z]+$/.test(email)) {
        errorElement.textContent = 'Email is not valid!';
    }
}

// function validateform() {
//     var name = document.valform.name.value;
//     var password = document.valform.password.value;
//     var egn = document.valform.egn.value;
//     var birthDate = document.valform.birthDate.value;
//     var email = document.valform.email.value;

//     if (!name || !/^[a-zA-Z\s]*$/.test(name)) {
//         var errMsg = !name ? "Name can't be blank." : 'Only alphabets and whitespace are allowed.';
//         alert(errMsg);
//         return false;
//     } else if (egn.length != 10) {
//         alert('EGN must be 10 numbers long.');
//         return false;
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
//         alert(
//             'Password must contain at least one lowercase letter, one uppercase letter, and one number, and be at least 8 characters long.'
//         );
//         return false;
//     } else if (birthDate == null || birthDate == '') {
//         alert("Birth date can't be blank");
//         return false;
//     } else if (email == null || email == '') {
//         alert("Email can't be blank");
//         return false;
//     }
// }
