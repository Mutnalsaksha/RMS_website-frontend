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
  confettis: any[]=[];


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
// this.createConfetti();
  }

  createConfetti() {
    const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

// // Clear the canvas
// ctx.clearRect(0, 0, canvas.width, canvas.height);

// Set canvas size to cover the whole viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// Confetti colors
    const confettiColors: string[] = ['#fbc531', '#4cd137', '#487eb0', '#e84118', '#8c7ae6'];

    function randomInRange(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    class Confetti {
      color: string;
      dimensions: { x: number; y: number };
      position: { x: number; y: number };
      rotation: number;
      speed: { x: number; y: number };
      scale: { x: number; y: number };

      constructor() {
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.dimensions = {
          x: randomInRange(8, 10),
          y: randomInRange(10, 20),
        };
        this.position = {
          x: randomInRange(0, canvas.width),
          y: -10,
        };
        this.rotation = randomInRange(0, 2 * Math.PI);
        this.speed = {
          x: randomInRange(-5, 5),
          y: randomInRange(1, 6),
        };
        this.scale = {
          x: 1,
          y: 1,
        };
      }

      update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        this.rotation += (this.speed.x / 100) * Math.PI / 180;

        if (this.position.y >= canvas.height) {
          this.position.x = randomInRange(0, canvas.width);
          this.position.y = -10;
        }
      }

      draw() {
        if (!ctx) {
          console.error("Failed to get canvas context");
          return;
        }
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.position.x + this.dimensions.x / 2, this.position.y + this.dimensions.y / 2);
        ctx.rotate(this.rotation);
        ctx.fillRect(-this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
        ctx.restore();
      }
    }

    const confettis: Confetti[] = [];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      confettis.push(new Confetti());
    }

    let animationFrameId: number;
// const startTime = performance.now();

    function animateConfetti(startTime:number) {
      const elapsed = performance.now() - startTime + 500;
      if (elapsed > 5100) { // Stop after 1 second
        cancelAnimationFrame(animationFrameId);
        return;
      }

      animationFrameId = requestAnimationFrame(()=>animateConfetti(startTime));
// @ts-ignore
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const confetti of confettis) {
        confetti.update();
        confetti.draw();
      }
    }
// Delay the start of the animation by half a second
    setTimeout(() => {
      animateConfetti(performance.now());
    }, 100);
  }






  ngAfterViewInit(): void {}

  bookOrder() {
    if (this.isValidForm()) {
      console.log('Items:', this.items);

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
        (response) => {
          console.log('Order booked successfully', response);
          this.submissionSuccess = true;
          this.clearForm();

          this.createConfetti();


          setTimeout(() => {
            this.submissionSuccess = false;
            this.clearConfetti();
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
      this.emailError = 'Please enter your address.';
      isValid = false;
    } else if (
      !/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(this.email.trim())
    ) {
      this.emailError = 'Please enter a valid address.';
      isValid = false;
    }
    if (this.paymentType === null) {
      this.personsError = 'Please select payment method.';
      isValid = false;
    }

    return isValid;
  }

  clearConfetti() {
    const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }


  clearForm() {
    this.name = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';
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
