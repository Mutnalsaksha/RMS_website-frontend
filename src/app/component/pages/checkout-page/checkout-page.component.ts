import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../shared/models/order';
import { AddressService } from '../../../services/address.service';
import { HttpErrorResponse } from '@angular/common/http';

interface BookingResponse {
  message: string;
  data: any;
}

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit, AfterViewInit {
  items: any[];

checkAddress() {
throw new Error('Method not implemented.');
}
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  address: string = '';
  paymentType: string | null = null;
  addressError: string = '';
  nameError: string = '';
  phoneError: string = '';
  emailError: string = '';
  personsError: string = '';
  submissionSuccess: boolean = false;
  errorMessage: string = '';
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private addressService: AddressService
  ) {
    const cart = this.cartService.getCart();
    this.items=cart.items;
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit() {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  ngAfterViewInit(): void {}

  bookOrder() {
    if (this.isValidForm()) {
      const orderData = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
        address: this.address,
        paymentType: this.paymentType,
        items: this.items.map(item => ({
          name:item.name,
          quantity:item.quantity,
          price:item.price
        }))
      };
      console.log('Order data to be sent:', orderData);


      this.addressService.bookOrder(orderData).subscribe(
        (response: BookingResponse) => {
          console.log('Order booked successfully', response);
          this.submissionSuccess = true;
          setTimeout(() => {
            this.submissionSuccess = false;
          }, 5000);
        },
        (error: HttpErrorResponse) => {
          console.error('Error booking order', error);
          this.errorMessage = 'Error occurred while submitting the form.';
        }
      );
    } else {
      // Validation errors, do nothing
    }
  }

  isValidForm() {
    this.nameError = '';
    this.phoneError = '';
    this.emailError = '';
    this.addressError='';
    this.personsError='';

    let isValid = true;

    if (this.name.trim().length === 0) {
      this.nameError = 'Please enter your name.';
      isValid = false;
    } else if (/\d/.test(this.name.trim())) {
      this.nameError = 'Name should not contain numbers.';
      isValid = false;
    }
    if (this.address.trim().length === 0) {
      this.addressError = 'Please enter your address.';
      isValid = false;
    }


    if (this.phoneNumber.trim().length === 0) {
      this.phoneError = 'Please enter your phone number.';
      isValid = false;
    } else if (!/^\d+$/.test(this.phoneNumber.trim())) {
      this.phoneError = 'Phone number should contain only digits.';
      isValid = false;
    }

    if (this.email.trim().length === 0) {
      this.emailError = 'Please enter your  address.';
      isValid = false;
    } else if (
      !/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(this.email.trim())
    ) {
      this.emailError = 'Please enter a valid  address.';
      isValid = false;
    }
    if (this.paymentType === null) {
      this.personsError = 'Please select payment method.';
      isValid = false;
    }

    return isValid;
  }

  clearForm() {
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.paymentType = null;
  }

  onPhoneNumberChange() {
    if (/\D/.test(this.phoneNumber.trim())) {
      this.phoneError = 'Phone number should contain only digits.';
    } else if (this.phoneNumber.trim().length !== 10) {
      this.phoneError = 'Phone number should contain exactly 10 digits.';
    } else {
      this.phoneError = '';
    }
  }

  checkName() {
    if (!/^[a-zA-Z\s]*$/.test(this.name.trim())) {
      this.nameError = 'Name should only contain alphabets and white spaces.';
    } else {
      this.nameError = '';
    }
  }
}
