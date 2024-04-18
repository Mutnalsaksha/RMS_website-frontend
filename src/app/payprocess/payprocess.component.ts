import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-payprocess',
  templateUrl: './payprocess.component.html',
  styleUrls: ['./payprocess.component.css']
})
export class PayprocessComponent  {
  // name: string = '';
  // phoneNumber: string = '';
  // email: string = '';nameError: string = '';
  // phoneError: string = '';
  // emailError: string = '';submissionSuccess: boolean = false;
  // errorMessage: string = '';
  // constructor(private addressService: AddressService) {}
  
  // bookEvent() {
  //   console.log('Form Submitted');

  //   // Check if the form is valid and the date is valid
  //   if (this.isValidForm() && newFunction()) {
  //     const eventData = {
  //       name: this.name,
  //       phoneNumber: this.phoneNumber,
  //       email: this.email,
        
  //     };

  //     this.addressService.bookEvent(eventData).subscribe(
  //       (response: BookingResponse) => {
  //         console.log('Event booked successfully', response);
  //         this.submissionSuccess = true;
  //         setTimeout(() => {
  //           this.submissionSuccess = false;
  //         }, 5000);
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Error booking event', error);
  //         this.errorMessage = 'Error occurred while submitting the form.';
  //       }
  //     );
  //   } else {
  //     // Validation errors, do nothing
  //   }

  //   function newFunction() {
  //     return this.isDateValid();
  //   }
  // }
  // isDateValid() {
  //   throw new Error('Method not implemented.');
  // }

  // isValidForm() {
  //   this.nameError = '';
  //   this.phoneError = '';
  //   this.emailError = '';
    

  //   let isValid = true;

  //   if (this.name.trim().length === 0) {
  //     this.nameError = 'Please enter your name.';
  //     isValid = false;
  //   } else if (/\d/.test(this.name.trim())) {
  //     this.nameError = 'Name should not contain numbers.';
  //     isValid = false;
  //   }

  //   if (this.phoneNumber.trim().length === 0) {
  //     this.phoneError = 'Please enter your phone number.';
  //     isValid = false;
  //   } else if (!/^\d+$/.test(this.phoneNumber.trim())) {
  //     this.phoneError = 'Phone number should contain only digits.';
  //     isValid = false;
  //   }

  //   if (this.email.trim().length === 0) {
  //     this.emailError = 'Please enter your email address.';
  //     isValid = false;
  //   } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email.trim())) {
  //     this.emailError = 'Please enter a valid email address.';
  //     isValid = false;
  //   }

    

  //   return isValid;
  // }
  
  

  // onPhoneNumberChange() {
  //   // Check if the phone number contains non-digit characters
  //   if (/\D/.test(this.phoneNumber.trim())) {
  //     this.phoneError = 'Phone number should contain only digits.';
  //   } else if (this.phoneNumber.trim().length !== 10) {
  //     this.phoneError = 'Phone number should contain exactly 10 digits.';
  //   } else {
  //     this.phoneError = ''; // Clear the error message if the phone number is valid
  //   }
  // }


  // checkName() {
  //   if (!/^[a-zA-Z\s]*$/.test(this.name.trim())) {
  //     this.nameError = 'Name should only contain alphabets and white spaces.';
  //   } else {
  //     this.nameError = ''; // Clear the error message if the name is valid
  //   }
  // }
  // clearForm() {
  //   // Clear form fields
  //   this.name = '';
  //   this.phoneNumber = '';
  //   this.email = '';
    
  // }
    


}

