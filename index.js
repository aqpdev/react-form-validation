import React, {useState} from "react"

export function useFormValidation(rules)
{
    const [errorsList, setErrors] = useState({});
    const [myForm, setMyForm] = useState({});
    let formElement = {};
    let formErrors = {};
    let formInputs = {};
    const parseForm = () => {
        formErrors = {};
        const formItems = new FormData(formElement);
        formItems.forEach((field_value, field_name) => {
            formInputs[field_name] = field_value;
            validate(field_name);
        });
        setErrors(formErrors);
        setMyForm(formElement);
    }

    const handleForm = (event, callbackFunction) =>
    {
        event.preventDefault();
        formElement = event.target;
        parseForm();
        if(Object.keys(formErrors).length === 0){
            callbackFunction(formInputs)
        }

    }

    const validate = (field_name) =>     {

        const item = rules.find(e => e.field_name === field_name);
        if(typeof item === "undefined"){
            return true;
        }
        const element = formElement[field_name];

        let validRegex = '';
        const splitted = item.rules.split('|');


        for(var i=0; i<splitted.length; i++){
            let propertyName = splitted[i];
            let propertyValue = 0;

            validRegex = /^[a-zA-Z0-9-_]+\[+(.*)+\]*$/;
            if(propertyName.match(validRegex)){
                const subSplit = propertyName.split(/\[(.*)\]/);
                propertyName = subSplit[0];
                propertyValue = subSplit[1];
            }

            if(propertyName === 'required') {
                if(element.type === 'checkbox'){
                    if(!element.checked){
                        formErrors[field_name] = item.errors[propertyName];
                        return false;
                    }
                }else if (element.value === "") {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }

            if(element.value === ""){
                return true;
            }

            if(propertyName === 'matches') {
                const inputValidator = formElement[propertyValue];
                if(typeof inputValidator === "undefined"){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }else{
                    if (inputValidator.value !== element.value) {
                        formErrors[field_name] = item.errors[propertyName];
                        return false;
                    }
                }
            }else if(propertyName === 'regex_match'){
                if(!element.value.match(eval(propertyValue))){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'differs'){
                const inputValidator = formElement[propertyValue];
                if(typeof inputValidator !== "undefined"){
                    if (inputValidator.value === element.value) {
                        formErrors[field_name] = item.errors[propertyName];
                        return false;
                    }
                }
            }else if(propertyName === 'min_length'){
                if(element.value.length < propertyValue){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'max_length'){
                if(element.value.length > propertyValue){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'exact_length'){
                if(element.value.length !== parseInt(propertyValue)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'greater_than'){
                if(!isNumeric(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
                if(parseFloat(element.value) <= parseFloat(propertyValue)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'greater_than_equal_to'){
                if(!isNumeric(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }

                if(parseFloat(element.value) < parseFloat(propertyValue)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'less_than'){
                if(!isNumeric(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
                if(parseFloat(element.value) >= parseFloat(propertyValue)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'less_than_equal_to') {
                if (!isNumeric(element.value)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
                if (parseFloat(element.value) > parseFloat(propertyValue)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'in_list'){
                const subPropertySplit = propertyValue.split(',');
                var in_list_found = false;
                for(var il = 0; il < subPropertySplit.length; il++) {
                    if(subPropertySplit[il] === element.value){
                        in_list_found = true;
                    }
                }
                if(in_list_found !== true){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha'){
                validRegex = /^[a-zA-Z]*$/;
                if(!element.value.match(validRegex)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_spaces'){
                validRegex = /^[a-zA-Z/\s]*$/;
                if(!element.value.match(validRegex)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_numeric') {
                validRegex = /^[a-zA-Z0-9]*$/;
                if (!element.value.match(validRegex)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_numeric_spaces'){
                validRegex = /^[a-zA-Z0-9/\s]*$/;
                if(!element.value.match(validRegex)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_dash') {
                validRegex = /^[a-zA-Z0-9-_]*$/;
                if (!element.value.match(validRegex)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_and_numeric'){
                validRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
                if (!element.value.match(validRegex)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_with_upper_and_numeric'){
                validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
                if (!element.value.match(validRegex)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'alpha_with_upper_numeric_special'){
                validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/;
                if (!element.value.match(validRegex)) {
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'numeric'){
                if(!isNumeric(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'integer'){
                if(!isInteger(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'decimal'){
                if(!isNumeric(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
                if(parseFloat(element.value) === parseInt(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'is_natural'){
                if(!isInteger(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }else if(parseInt(element.value) < 0){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'is_natural_no_zero'){
                if(!isInteger(element.value)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }else if(parseInt(element.value) <= 0){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'valid_email'){
                validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(!element.value.match(validRegex)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'valid_url'){
                try{
                    let validURlVal = new URL(element.value);
                }catch (error){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === 'valid_ip'){
                validRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
                if(!element.value.match(validRegex)){
                    formErrors[field_name] = item.errors[propertyName];
                    return false;
                }
            }else if(propertyName === "if_requires"){
                const inputValidator = formElement[propertyValue];
                if(typeof inputValidator === "undefined"){
                    formErrors[propertyValue] = item.errors[propertyName];
                    return false;
                }else{
                    if (inputValidator.value === "") {
                        formErrors[propertyValue] = item.errors[propertyName];
                        return false;
                    }
                }
            }else if(propertyName === "if_use_requires"){
                const subPropertySplit = propertyValue.split(',');
                if(element.value === subPropertySplit[0]){
                    const inputValidator = formElement[subPropertySplit[1]];
                    if(typeof inputValidator === "undefined"){
                        formErrors[subPropertySplit[1]] = item.errors[propertyName];
                        return false;
                    }else{
                        if (inputValidator.value === "") {
                            formErrors[subPropertySplit[1]] = item.errors[propertyName];
                            return false;
                        }
                    }
                }
                //Update this
                const propertyRequired = element.dataset.requires;
                if(propertyRequired !== undefined){
                    if(element.value === propertyValue){
                        const inputValidator = this.formElements[propertyRequired];
                        if(inputValidator.value === '' || inputValidator.value === null){
                            inputValidator.classList.add('is-invalid');
                            return false;
                        }
                    }
                }
            }

        }
        return true;

    }

    const isNumeric = (val) => {
        return !isNaN(val);
    }

    const isInteger = (val) => {
        if(!isNumeric(val)){
            return false;
        }
        return parseInt(val) === parseFloat(val);
    }

    const uniqID = (prefix="",random=true) =>
    {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
    }

    const hasErrors = (field_name) => {
        return (errorsList[field_name] !== undefined);
    }
    const showError = (field_name) => {
        if(errorsList[field_name] !== undefined){
            const element = myForm[field_name];
            if(typeof element.id === "undefined" || element.id === ""){
                element.id = uniqID(field_name);
            }
            const elementByID = document.getElementById(element.id);
            if(elementByID !== null){
                elementByID.scrollIntoView({block: "end", behavior: "smooth"})
                elementByID.focus();
            }
            return errorsList[field_name];
        }else{
            return null;
        }
    }
    return {handleForm, hasErrors, showError};
}