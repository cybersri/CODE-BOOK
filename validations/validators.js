exports.validatePhone = phone => {
    if(phone===undefined) phone = ''
    phone = String(phone).trim();
    const pattern = /^[0-9]*$/;
    let phoneErr = '';
    if (!pattern.test(phone)) {
      phoneErr = 'Please enter a valid phone number';
    } else if (phone.length !== 10 || phone.length < 8 || phone.length > 12) {
      phoneErr = 'Phone number should be in 10 digits';
    }
    return {
      isValid: phoneErr === '' ? true : false,
      data:phone,
      err: phoneErr
    };
  };

exports.validatePassword = (password)=>{
      if (password===undefined) password=''
      password = String(password)
      let passErr = '';
      if(password.length!==password.trim().length){
          passErr = 'password should not contain leading or tailing spaces'
      }
      else if(password.length<8 || password.length >64){
        passErr = 'password should contain atleast 8 char and not more than 64 char'
      }
      return{
          isValid: passErr==='' ? true:false,
          data: password,
          err:passErr
      }
  }

exports.validateAddress = (address) =>{
    let addErr = {}
    try {
        address = JSON.parse(address)
            const streetErr = this.validateName(address.street,'street', 'alphaNumericWithComma',5, 35);
            const cityErr = this.validateName(address.city,'city','alphaWithSpace',2,20);
            const pinErr = this.validateName(address.pin,'pin', 'numeric',6,6);
            if(streetErr.isValid && cityErr.isValid && pinErr.isValid){
                return{
                    isValid: true,
                    data:address,
                    err:addErr
                }
            }
            else{
                if(!streetErr.isValid) addErr.street = streetErr.err
                if(!cityErr.isValid) addErr.city = cityErr.err
                if(!pinErr.isValid) addErr.pin = pinErr.err
                return{
                    isValid:false,
                    data:address,
                    err:addErr
                }
            }
        } catch (error) {
            return{
                isValid:false,
                data:address,
                err:'invalid address format'
            }
        }
  }

exports.validateBool = (value) =>{
    if(value===undefined) value = '';
    let boolErr = '';
    if(typeof value !== Boolean){
        if(String(value).toLowerCase().trim()==='true') value = true;
        else if(String(value).toLowerCase().trim()==='false') value = false;
        else boolErr = 'only true or false value is allowed'
    }
    return{
        isValid: boolErr===''?true:false,
        data: value,
        err:boolErr
    }
}

exports.validateNumber = (number, name = 'number', min = 0, max = 0) => {
      if(number===undefined) number=''
    let numErr = '';
    number = String(number).trim()
    if (!number.length) {
      numErr = 'Please enter '+ name;
    } else if (isNaN(number)) {
      numErr = 'please enter a valid ' + name ;
    } else if (Number(min) && Number(number) < Number(min)) {
      numErr = name + ' cannot be less than ' + min;
    } else if (Number(max) && Number(number) > Number(max)) {
      numErr = name + ' cannot be greater than ' + max;
    }
    return {
      isValid: numErr === '' ? true : false,
      data:number,
      err: numErr
    };
  };
exports.validateEmail = (email,normalize=true) => {
      if(email==undefined) email=''
    const pattern = /^[a-z0-9]+[\w.]+[a-z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let emailErr = '';
    email = String(email).trim()
    if (email.length === 0) {
      emailErr = 'Please Enter eMail id';
    } else if (!pattern.test(email)) {
      emailErr = 'Please enter valid email id';
    }
    const data =(normalize)? email.toLowerCase(): email;
    return {
      isValid: emailErr === '' ? true : false,
      data, 
      err: emailErr
    };
  };

  exports.validateText = (text, min, max, uriEncode=false)=>{
    let Err = '';
    try {
        if(typeof text===Object) text = JSON.stringify(text)
        
        text = String(text).trim();
        if(text.length<min){
            Err = 'this field should have minimum of '+min+' characters';
        }
        else if(text.length>max){
            Err = 'this field should have maximum of '+max+' characters';
        }
        if(uriEncode) text = encodeURI(text);
        return{
            isValid : Err===''?true:false,
            data: text,
            err:Err
        }
    } catch (error) {
        return{
            isValid:false,
            data:text,
            err:error
        }
    }
  }

  exports.validateName = (
    name = '',
    type = 'Name',
    pattern = 'alpha',
    min = 3,
    max = 40
  ) => {
      if(name===undefined) name=''
      name = String(name).trim()
    const numeric = /^[0-9]*$/;
    const alpha = /^[a-zA-Z]*$/;
    const alphaNumeric = /^([a-zA-Z0-9]+)$/;
    const alphaNumericWithUnder = /^([a-zA-Z0-9 _-]+)$/;
    const alphaWithSpace = /^[a-zA-Z ]*$/;
    const alphaNumericWithComma = /^([a-zA-Z0-9 /,.]+)$/;
    const alphaNumericWithAll = /^([a-zA-Z0-9 ,._\-()&|#@!\*{}]+)$/;
    let err = '';
    if (pattern === 'numeric') {
      pattern = numeric;
      err = 'numbers';
    } else if (pattern === 'alphaNumeric') {
      pattern = alphaNumeric;
      err = 'alphabets and numbers';
    } else if (pattern === 'alphaNumericWithComma') {
      pattern = alphaNumericWithComma;
      err = 'alphabers, numbers, space, comma, forward slash and period';
    } else if (pattern === 'alphaNumericWithUnder') {
      pattern = alphaNumericWithUnder;
      err = 'alphabets, numbers, underscore, and white space';
    } else if (pattern === 'alphaWithSpace') {
      pattern = alphaWithSpace;
      err = 'alphabets and whitespace';
    } else if (pattern === 'alphaNumericWithAll') {
      pattern = alphaNumericWithAll;
      err = 'alphabets, numbers, underscore, special symbols, and white space ';
    } else {
      pattern = alpha;
      err = 'alphabets';
    }
    // pattern = (pattern==='alphaNumeric'?alphaNumeric:(pattern==='alphaNumericWithUnder'?alphaNumericWithUnder:alpha))
    let nameErr = '';
    if (name.length === 0) {
      nameErr = 'Please enter the ' + type;
    } else if (min === max && name.length !== min) {
      nameErr = type + ' should contain exactly ' + min + ' characters';
    } else if (name.length < min) {
      nameErr = type + ' should contain atleast ' + min + ' characters';
    } else if (name.length > max) {
      nameErr = type + ' can only contain upto ' + max + ' characters';
    } else if (!pattern.test(name)) {
      nameErr = type + ' can contain only ' + err;
    }
    return {
      isValid: nameErr === '' ? true : false,
      data:name,
      err: nameErr
    };
  };

  exports.simplify=(obj)=>{
    try {
        const arr = Object.keys(obj)
        const result = {isValid:true, err:{}, data:{}}
        for(let i=0; i<arr.length; i++){
            if(!obj[arr[i]].isValid){
                result.isValid = false;
                result.err[arr[i]] = obj[arr[i]].err;
            }
            result.data[arr[i]] = obj[arr[i]].data;
        }
        return result;
    } catch (error) {
        return {isValid:false, err:'invalid input format'}
    }
}