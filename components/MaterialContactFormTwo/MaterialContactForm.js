import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle';
import { ic_cancel } from 'react-icons-kit/md/ic_cancel';
import Fade from 'react-reveal/Fade';
import { FormattedMessage } from 'react-intl';
import useTimeout from '@deadline/common/hooks/useTimeout';
import MaterialTextField from '../MaterialTextField/MaterialTextField';
import Button from '../Button/';
import Loader from '../Loader';
import { Form, InputFeedback } from './MaterialContactForm.style';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inputRef, setInputRef] = useState(null);
  const [formField, setFormFieldRef] = useState(null);
  const [pending, setPending] = useState(false);
  const { start } = useTimeout(() => {
    if (error) setError(false);
    if (success) setSuccess(false);
  }, 3500);

  // const setActive = active => {
  //   if (active) {
  //     formField.current.classList.add('form-field--is-active');
  //   } else {
  //     formField.current.classList.remove('form-field--is-active');
  //     inputRef.current.value === ''
  //       ? formField.current.classList.remove('form-field--is-filled')
  //       : formField.current.classList.add('form-field--is-filled');
  //   }
  //   console.log(inputRef.current.value);
  // };
  
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   setPending(true);

  //   const response = await fetch(
  //     'https://api.sendgrid.com/v3/marketing/contacts',
  //     {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
  //       },
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         list_ids: [],
  //         contacts: [{ email: email, name: name, phoneNumber: phoneNumber, message: message }],
  //       }),
  //     }
  //   );

  //   const data = await response.json();
  //   console.log(data, 'data');
    
  //   if (data.job_id) {
  //     setPending(false);
  //     setSuccess(true);
  //     start();
  //     setEmail('');
  //     setPhoneNumber('');
  //     setName('');
  //     setMessage('');
  //     setActive(false);
  //   } else if (data.errors.length) {
  //     setPending(false);
  //     setError(true);
  //     start();
  //   }

  //   console.log('contact form');

  //   setTimeout(function() {
  //     setPending(false);
  //     setSuccess(true);
  //     start();
  //     setEmail('');
  //     setPhoneNumber('');
  //     setName('');
  //     setMessage('');
  //     setActive(false);
  //   }, 2000);
  // };

  const handleChange = (inputEl, formField) => {
    let value = inputEl.current.value;
    console.log('email', inputEl);
    setInputRef(inputEl);
    setFormFieldRef(formField);
    setEmail(value);
  };

  const handleChangePhone = (inputEl, formField) => {
    let value = inputEl.current.value;
    console.log('phone', inputEl);
    setInputRef(inputEl);
    setFormFieldRef(formField);
    setPhoneNumber(value);
  };

  const handleChangeName = (inputEl, formField) => {
    let value = inputEl.current.value;
    console.log('name', inputEl);
    setInputRef(inputEl);
    setFormFieldRef(formField);
    setName(value);
  };

  const handleChangeMessage = (inputEl, formField) => {
    let value = inputEl.current.value;
    console.log('message', inputEl);
    setInputRef(inputEl);
    setFormFieldRef(formField);
    setMessage(value);
  };

  const contactNumber = Math.random().toString(36).slice(-5);

  const sendEmail = (e) => {
    // const success = document.getElementById("success");
    // const failed = document.getElementById("failed");
    const button = document.getElementById("buttonsent");
    const form = document.querySelector('.formcontact');
    
    e.preventDefault();

    emailjs.sendForm('service_m4qma54', 'template_z451j6c', e.target, 'user_cx87NjlVaO6uTBTRaDeaT')
           .then((result) => {
             console.log(result.text);
            //  success.classList.add('show');
             button.classList.add('show');
            //  failed.classList.remove('show');
             Swal.fire({
              icon: 'success',
              title: 'Your message has been sent Successfully'
            })
            form.reset();
           }, (error) => {
             console.log(error.text);
            //  failed.classList.add('show');
             Swal.fire({
              icon: 'error',
              title: 'Ooops, something went wrong',
              text: error.text,
            })
           });
  }

  return (
    <Form className="formcontact" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" value={contactNumber} />
      <MaterialTextField
        labelText="nameInputLabel"
        type="text"
        name="user_name"
        required="required"
        value={name}
        error={error}
        success={success}
        onChange={handleChangeName}
      />
      <MaterialTextField
        labelText="emailInputLabel"
        type="email"
        name="user_email"
        required="required"
        value={email}
        error={error}
        success={success}
        onChange={handleChange}
      />
      <MaterialTextField
        labelText="phoneNumberInputLabel"
        type="number"
        name="user_phone"
        required="required"
        value={phoneNumber}
        error={error}
        success={success}
        onChange={handleChangePhone}
      />
      <MaterialTextField
        labelText="messageInputLabel"
        type="textarea"
        name="message"
        required="required"
        value={message}
        error={error}
        success={success}
        onChange={handleChangeMessage}
      />
      <Button
        type="submit"
        id='buttonsent'
        title="contactFormButton"
        isLoading={pending}
        loader={<Loader loaderColor="white" />}
      />
      {error && (
        <Fade bottom duration={2000}>
          <InputFeedback error>
            <Icon icon={ic_cancel} />
            <FormattedMessage id="errorMsg" defaultMessage="errorMessage" />
          </InputFeedback>
        </Fade>
      )}
      {success && (
        <Fade bottom duration={2000}>
          <InputFeedback success>
            <Icon icon={ic_check_circle} />
            <FormattedMessage id="successMsg" defaultMessage="successMessage" />
          </InputFeedback>
        </Fade>
      )}
    </Form>
  );
}
