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
                lettersonly: 'Будь-ласка тільки букви',
                minlength: 'Мінімум 2 символи'
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

    $.validator.addMethod("australianDate", function (value, element) {
            return this.optional(element) || value == value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        }
    );

    jQuery.validator.addMethod('selectcheck', function (value) {
        return (value != '0');
    }, "Будь-ласка заповніть поле");

    $('#form-private-user').validate({
        errorElement: 'span',
        rules: {
            name: {
                required: true,
                minlength: 6
            },
            birthday: {
                required: true,
                australianDate: true
            },
            userId: {
                required: true,
                digits: true
            },
            passport: {
                required: true
            },
            passportDetail: {
                required: true
            },
            address: {
                required: true
            },
            contacts: {
                required: true
            },
            recommendation: {
                required: true,
                selectcheck: true
            },
            fee1: {
                required: true,
                digits: true
            },
            fee2: {
                required: true,
                digits: true
            },
            invoice: {
                required: true,
                selectcheck: true
            },
            'myCheckBox[]': {
                required: true,
                minlength: 1
            },
            customCheckbox2: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Будь-ласка заповніть поле',
                minlength: 'Мінімум 6 символів'
            },
            birthday: {
                required: 'Будь-ласка заповніть поле',
                australianDate: "Формат dd/mm/yyyy"
            },
            userId: {
                required: 'Будь-ласка заповніть поле',
                digits: 'Будь-ласка тільки цифри'
            },
            passport: {
                required: 'Будь-ласка заповніть поле'
            },
            passportDetail: {
                required: 'Будь-ласка заповніть поле'
            },
            address: {
                required: 'Будь-ласка заповніть поле'
            },
            contacts: {
                required: 'Будь-ласка заповніть поле'
            },
            recommendation: {
                required: 'Будь-ласка заповніть поле',
                selectcheck: 'Будь-ласка заповніть поле'
            },
            fee1: {
                required: 'Будь-ласка заповніть поле',
                digits: 'Будь-ласка тільки цифри'
            },
            fee2: {
                required: 'Будь-ласка заповніть поле',
                digits: 'Будь-ласка тільки цифри'
            },
            invoice: {
                required: 'Будь-ласка заповніть поле',
                selectcheck: 'Будь-ласка заповніть поле'
            },
            'myCheckBox[]': {
                required: ''
            },
            customCheckbox2: {
                required: ''
            }
        }
    });

    $("#form-private-user :checkbox").change(function(){
        if(this.checked) {
            $(this).removeClass("error");
        }
    });

});