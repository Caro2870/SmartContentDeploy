import { extend } from 'vee-validate';
import {
  email,
  length,
  max,
  min,
  min_value,
  max_value,
  required,
} from 'vee-validate/dist/rules';



// create a rule for a range of @1, @2, @3 ..... @x with range
extend('containsAtRange', {
  params: ['range'],
  validate: (value, { range }) => {
    for (let i = 1; i <= range; i++) {
      const variable = `@${i}`;
      if (!value.includes(variable)) {
        return false;
      }
    }
    return true;
  },
  message: 'The string must contain variables from "@1" to "@{range}"',
});

extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word',
});
extend('title-required', {
  validate(value) {
    return !!value.title;
  },
  message: 'Title is required',
});
extend('length', {
  ...length,
  message: 'is length',
});
extend('min_value', {
  ...min_value,
  message: 'is min',
});
extend('min', {
  ...min,
  message: 'is min',
});
extend('max_value', {
  ...max_value,
  message: 'is max',
});
extend('max', {
  ...max,
  message: 'is max',
});
extend('valid-document', {
  validate: value => value.length == 11 || value.length == 0,
  message: 'Please enter a valid Document',
});
extend("max_value", {
  params: ["max_value"],
  validate: (value, { max_value }) => {
    return value <= max_value
  },
  message: "is max",
});
extend('required', {
  ...required,
  message: 'is required',
});
extend('email', {
  ...email,
  message: 'This field must be a valid email',
});
extend('chat-compose-required', {
  ...required,
  message: '{_field_} is required',
});
extend('mobile', {
  validate: value => value.length == 14,
  message: 'This field must be a valid mobile number',
});

extend('validate-amount', {
  validate: value => value > 0,
  message: 'The amount must be greater than 0.00',
});
extend('validate-amount-ce', {
  params: ['params'],

  validate: (value, params) => {
    const cadena = params.params[0] + params.params[1];
    const regex1 = /balanceAmount: (\d+(\.\d+)?)/;
    const regex2 = /program_min: (\d+\.\d+)/;
    const match1 = cadena.match(regex1);
    const match2 = cadena.match(regex2);
    const balanceAmount = match1 ? parseFloat(match1[1]) : null;
    const program_min = match2 ? parseFloat(match2[1]) : null;
    if (value >= program_min && value <= balanceAmount) {
      return true;
    } else if (balanceAmount <= program_min && value == balanceAmount) {
      return true
    } else {
      return { valid: false, message: "Custom error message" };
    }

  },
  message: (field, params) => {
    const value = params._value_;
    const cadena = params.params[0] + params.params[1];
    const regex1 = /balanceAmount: (\d+(\.\d+)?)/;
    const regex2 = /program_min: (\d+\.\d+)/;
    const match1 = cadena.match(regex1);
    const match2 = cadena.match(regex2);
    const balanceAmount = match1 ? parseFloat(match1[1]) : null;
    const program_min = match2 ? parseFloat(match2[1]) : null;
    if (value < program_min && balanceAmount >= program_min) {
      return `The amount must be equal or greater than Minimal program Amount: ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(program_min)}`;
    } if ((balanceAmount <= program_min && value != balanceAmount)) {
      return `The amount must be equal to  Remaining Balance: ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(balanceAmount)}`;
    } if ((value > balanceAmount && value >= program_min)) {
      return `The amount must be equal or lower than Remaining Balance: ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(balanceAmount)}`;
    }
  },

});
extend('validate-amount-zero', {
  validate: value => value >= 0,
  message: 'The amount must be greater or equal to 0.00',
});
extend('greated-than-zero', {
  validate: value => value > 0,
  message: 'The amount must be greater or equal to 0',
});
extend('array', {
  validate: value => value.length > 0,
  message: 'This field is required',
});
extend('boolean', {
  validate: value => value == true,
  message: '',
});
extend('validate-hours-92', {
  validate: value => value >= 92,
  message: 'The minimum of hours is 92',
});
extend('money-1', {
  validate: value => value >= 1,
  message: 'Required',
});

extend('money-2', {
  validate: value => value >= 1,
  message: 'The amount must be greater than 0.00',
});
extend('money-required', {
  validate: value => value > 0,
  message: 'Required',
});
extend('module-required', {
  validate: obj => obj.id !== 0,
  message: 'Required',
});
extend('validate-spaces', {
  validate: value => value.replace(/\s/g, '') != '',
  message: 'The field is required',
});
extend('password', {
  params: ['confirm'],
  validate(value, { confirm }) {
    return value === confirm;
  },
  message: 'Password confirmation does not match',
});
extend('specialpassword', {
  validate: value => {
    const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regularExpression.test(value);
  },
  message:
    'The Format must have a minimum. A capital letter, a lowercase, a number, a special character, and a minimum of 8 characters. Example: Abcd1234@',
});
extend('specialemail', {
  validate: value => {
    const regularExpression = /^[a-zA-Z][-_.a-zA-Z0-9]{4,29}@alarcongroup.us$/;
    return regularExpression.test(value);
  },
  message:
    'is invalid. Example: xxxxx@alarcongroup.us',
});




extend('truthy', {
  validate: value => value === true,
  message: 'Has to be true',
});

extend('required-tracking', {
  validate: value => value.length == 19,
  message: 'Incorrect Track Number',
});

extend('validate-day', {
  validate: value => value <= 31,
  message: 'Incorrect Day',
});

extend('validate-month', {
  validate: value => value <= 12,
  message: 'Incorrect Month',
});

extend('validate-not-overflow', {
  params: ['balanceAmount'],
  validate: (value, { balanceAmount }) => value <= balanceAmount,
  message: (field, { balanceAmount }) => `The amount must be equal to ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(balanceAmount)}`,

});
extend("validate-mobile-number", {
  validate: (value) => !!value && value.length == 14,
  message: "This field must be a valid mobile number",
})
extend('max-hours', {
  validate: value => value <= 24 && value > 0,
  message: 'Invalid Hours(1-24)',
});
extend('validate-percentage-min', {
  validate: value => value > 0,
  message: 'The value must be greater than 0',
});

extend("max-hours", {
  validate: (value) => value <= 24 && value > 0,
  message: "Invalid Hours(1-24)",
});

extend("valid-number-account", {
  validate: (value) => value.length >= 7,
  message: "Please enter a valid Account number",
});

extend('validate-percentage-max', {
  validate: value => value <= 100,
  message: 'The value must be less than or equal to 100',
});

extend("valid-cci-code", {
  validate: (value) => value.length >= 7,
  message: "Please enter a valid CCI code",
});

extend("valid-detail", {
  validate: (value) => value.length <= 300,
  message: "The detail entered cannot exceed 300 characters",
});