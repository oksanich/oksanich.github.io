//-------------------------
// jQuery validation
//-------------------------

$(document).ready(function () {

    $('#form-login').validate({
        errorElement: 'span',
        rules: {
            login: {
                required: true,
                minlength: 6
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            login: {
                required: 'Будь-ласка заповніть поле',
                minlength: 'Мінімум 6 символів'
            },
            password: {
                required: 'Будь-ласка заповніть поле',
                minlength: 'Мінімум 6 символів'
            }
        }
    });

    $('#form-forgot-password').validate({
        errorElement: 'span',
        rules: {
            mail: {
                required: true,
                email: true
            }
        },
        messages: {
            mail: {
                required: 'Будь-ласка заповніть поле',
                email: 'E-mail не корректний'
            }
        }
    });

    jQuery.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-ZА-Яа-я_\-]+$/);
    });

    $('#form-register').validate({
        errorElement: 'span',
        rules: {
            name: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            surname: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            city: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            street: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            house: {
                required: true,
                digits: true
            },
            housing: {
                digits: true
            },
            porch: {
                digits: true
            },
            apartment: {
                digits: true
            },
            phone: {
                required: true,
                digits: true
            },
            mail: {
                required: true,
                email: true
            },
            reglogin: {
                required: true,
                minlength: 6
            },
            regpassword: {
                required: true,
                minlength: 6
            },
            regpasswordconfirm: {
                required: true,
                minlength: 6,
                equalTo: '#regpassword'
            }
        },
        messages: {
            name: {
                required: 'Будь-ласка заповніть поле',
                lettersonly: 'Будь-ласка тільки букви',
                minlength: 'Мінімум 2 символи'
            },
            surname: {
                required: 'Будь-ласка заповніть поле',
                lettersonly: 'Будь-ласка тільки букви',
                minlength: 'Мінімум 2 символи'
            },
            city: {
                required: 'Будь-ласка заповніть поле',
                lettersonly: 'Будь-ласка тільки букви',
                minlength: 'Мінімум 2 символи'
            },
            street: {
                required: 'Будь-ласка заповніть поле',
                digits: 'Будь-ласка тільки цифри'
            },
            house: {
                required: 'Будь-ласка заповніть поле',
                digits: 'Будь-ласка тільки цифри'
            },
            housing: {
                digits: 'Будь-ласка тільки цифри'
            },
            porch: {
                digits: 'Будь-ласка тільки цифри'
            },
            apartment: {
                digits: 'Будь-ласка тільки цифри'
            },
            phone: {
                required: 'Будь-ласка заповніть поле',
                digits: 'Будь-ласка тільки цифри'
            },
            mail: {
                required: 'Будь-ласка заповніть поле',
                email: 'E-mail не корректний'
            },
            reglogin: {
                required: 'Будь-ласка заповніть поле',
                minlength: 'Мінімум 6 символів'
            },
            regpassword: {
                required: 'Будь-ласка заповніть поле',
                minlength: 'Мінімум 6 символів'
            },
            regpasswordconfirm: {
                required: 'Будь-ласка заповніть поле',
                minlength: 'Пароль не співпадає',
                equalTo: 'Пароль не співпадає'
            }
        }
    });
});