document.getElementById('mainForm').addEventListener('submit', (e) => {
    e.preventDefault();
});

function validateform() {
    var name = document.valform.name.value;
    var password = document.valform.password.value;
    var egn = document.valform.egn.value;
    var birthDate = document.valform.birthDate.value;
    var email = document.valform.email.value;

    if (!name || !/^[a-zA-Z\s]*$/.test(name)) {
        var errMsg = !name ? "Name can't be blank." : 'Only alphabets and whitespace are allowed.';
        alert(errMsg);
        return false;
    } else if (egn.length != 10) {
        alert('EGN must be 10 numbers long.');
        return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
        alert(
            'Password must contain at least one lowercase letter, one uppercase letter, and one number, and be at least 8 characters long.'
        );
        return false;
    } else if (birthDate == null || birthDate == '') {
        alert("Birth date can't be blank");
        return false;
    } else if (email == null || email == '') {
        alert("Email can't be blank");
        return false;
    }
}
