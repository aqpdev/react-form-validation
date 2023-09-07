# react-ci-form-validation

React hook to validate form values inspired in CodeIgniter (PHP framework).

## Installation

```bash
npm i @aqpdev/react-form-validation
```

## Usage

```javascript
import React from "react"
import {useFormValidation} from "@aqpdev/react-form-validation";

export default function Home() {
    const {handleForm, hasErrors, showError} = useFormValidation([
        {
            field_name: "username",
            rules: "required|min_length[5]|alpha_dash",
            errors: {
                required: "Username is required.",
                min_length: "Username must contains at least 5 characters.",
                alpha_dash: "Username may only contain alpha-numeric characters, underscores, and dashes."
            }
        },
        {
            field_name: "password",
            rules: "required|min_length[6]|alpha_with_upper_numeric_special",
            errors: {
                required: "Password is required.",
                min_length: "Password must contains at least 6 characters.",
                alpha_with_upper_numeric_special: "Password must contains letters (lowercase and uppercase), numbers and special characters.",
            }
        },
        {
            field_name: "confirm_password",
            rules: "required|matches[password]",
            errors: {
                required: "Confirm your password.",
                matches: "Passwords do not match.."
            }
        },
        {
            field_name: "email",
            rules: "required|valid_email",
            errors: {
                required: "Enter your email address.",
                valid_email: "Email address is not valid."
            }
        }
    ]);

    const myHandle = (data) => {
        //Data returns a JSON of form elements
        console.log(data);
    }

    return (
        <form onSubmit={(e) => handleForm(e, myHandle)}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control"/>
                {hasErrors('username') && <div className="text-danger">{showError('username')}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control"/>
                {hasErrors('password') && <div className="text-danger">{showError('password')}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirm_password" className="form-control"/>
                {hasErrors('confirm_password') && <div className="text-danger">{showError('confirm_password')}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" name="email" className="form-control"/>
                {hasErrors('email') && <div className="text-danger">{showError('email')}</div>}
            </div>

            <div>
                <button className="btn btn-primary">Submit</button><br/>
                <button type="button" className="btn btn-primary">Button blocked</button><br/>
            </div>
        </form>
    )
}
```

## Rules Reference

| Rule                             | Parameter | Description                                                                                                                                                           | Example                     |
|----------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
| required                         | No        | Returns error if the form element is empty.                                                                                                                           |                             |
| matches                          | Yes       | Returns error if the form element does not match the one in the parameter.                                                                                            | matches[form_item]          |
| regex_match                      | Yes       | Returns error is the form element does not match the regular expresion.                                                                                               | regex_match[/regex/]        |
| differs                          | Yes       | Returns error if the form element does not differ from the one in the parameter.                                                                                      | differs[form_item]          |
| min_length                       | Yes       | Returns error if the form element is shorter than the parameter value.                                                                                                | min_length[3]               |
| max_length                       | Yes       | Returns error if the form element is longer than the parameter value.                                                                                                 | max_length[12]              |
| exact_length                     | Yes       | Returns error if the form element is not exactly the parameter value.                                                                                                 | exact_length[8]             |
| greater_than                     | Yes       | Returns error if the form element is less than or equal to the parameter value or not numeric.                                                                        | greater_than[8]             |
| greater_than_equal_to            | Yes       | Returns error if the form element is less than the parameter value, or not numeric.                                                                                   | greater_than_equal_to[8]    |
| less_than                        | Yes       | Returns error if the form element is greater than or equal to the parameter value or not numeric.                                                                     | less_than[8]                |
| less_than_equal_to               | Yes       | Returns error if the form element is greater than the parameter value, or not numeric.                                                                                | less_than_equal_to[8]       |
| in_list                          | Yes       | Returns error if the form element is not within a predetermined list.                                                                                                 | in_list[red,blue,green]     |
| alpha                            | No        | Returns error if the form element contains anything other than alphabetical characters.                                                                               |                             |
| alpha_numeric                    | No        | Returns error if the form element contains anything other than alpha-numeric characters.                                                                              |                             |
| alpha_numeric_spaces             | No        | Returns error if the form element contains anything other than alpha-numeric characters or spaces. Should be used after trim to avoid spaces at the beginning or end. |                             |
| alpha_dash                       | No        | Returns error if the form element contains anything other than alpha-numeric characters, underscores or dashes.                                                       |                             |
| alpha_and_numeric                | No        | Returns error if the form element does not contain letters and numbers.                                                                                               |                             |
| alpha_with_upper_and_numeric     | No        | Returns error if the form element does not contain letters (lowercase and uppercase) and numbers.                                                                     |                             |
| alpha_with_upper_numeric_special | No        | Returns error if the form element does not contain letters (lowercase and uppercase), numbers and special characters.                                                 |                             |
| numeric                          | No        | Returns error if the form element contains anything other than numeric characters.                                                                                    |                             |
| integer                          | No        | Returns error if the form element contains anything other than an integer.                                                                                            |                             |
| decimal                          | No        | Returns error if the form element contains anything other than a decimal number.                                                                                      |                             |
| is_natural                       | No        | Returns error if the form element contains anything other than a natural number: 0, 1, 2, 3, etc.                                                                     |                             |
| is_natural_no_zero               | No        | Returns error if the form element contains anything other than a natural number, but not zero: 1, 2, 3, etc.                                                          |                             |
| valid_url                        | No        | Returns error if the form element does not contain a valid URL.                                                                                                       |                             |
| valid_email                      | No        | Returns error if the form element does not contain a valid email address.                                                                                             |                             |
| valid_ip                         | No        | Returns error if the form element does not contain a valid IP address (‘ipv4’ or ‘ipv6’).                                                                             |                             |
| if_requires                      | Yes       | Returns error if the form element is filled and the other form element (parameter) is empty.                                                                          | if_requires[form_item]      |
| if_use_requires                  | Yes       | Returns error if the form element is equal to first parameter and the other form element (second parameter) is empty.                                                 | if_requires[user,form_item] |
