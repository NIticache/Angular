// import { Component, OnInit , Inject} from '@angular/core';
// import { Dish } from '../shared/dish';
// import { Params, ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
// import { DishService } from '../services/dish.service';
// import { switchMap } from 'rxjs/operators';
// import { FormBuilder } from '@angular/forms';




// @Component({
//   selector: 'app-dishdetail',
//   templateUrl: './dishdetail.component.html',
//   styleUrls: ['./dishdetail.component.scss']
// })
// export class DishdetailComponent implements OnInit {

//     dish: Dish;
//     dishIds: string[];
//     prev: string;
//     next: string;
    
  
//     constructor(private dishservice: DishService,
//       private route: ActivatedRoute,
//       private location: Location,
//       private fb:FormBuilder,
//       @Inject('BaseURL') private BaseURL)  { }
  
//       ngOnInit() {
//         this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
//         this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
//         .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
//       }
    
//       setPrevNext(dishId: string) {
//         const index = this.dishIds.indexOf(dishId);
//         this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
//         this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
//       }
  
  
 
//     goBack(): void {
//       this.location.back();
//     }
  
//   }

  
//  import { Component, OnInit, Inject } from '@angular/core';
//   import { Dish } from '../shared/dish';
//   import { Params, ActivatedRoute } from '@angular/router';
//   import { Location } from '@angular/common';
//   import { DishService } from '../services/dish.service';
//   import { switchMap } from 'rxjs/operators';
  
  
  
  
//   @Component({
//     selector: 'app-dishdetail',
//     templateUrl: './dishdetail.component.html',
//     styleUrls: ['./dishdetail.component.scss']
//   })
//   export class DishdetailComponent implements OnInit {
  
//       dish: Dish;
//       dishIds: string[];
//       prev: string;
//       next: string;
      
    
//       constructor(private dishservice: DishService,
//         private route: ActivatedRoute,
//         private location: Location,
//         @Inject('BaseURL') private BaseURL) { }  
    
//         ngOnInit() {
//           this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
//           this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
//           .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
//         }
      
//         setPrevNext(dishId: string) {
//           const index = this.dishIds.indexOf(dishId);
//           this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
//           this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
//         }
    

  
        
//       goBack(): void {
//         this.location.back();
//       }
    
//     }

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;

  dishIds: string[];
  prev: string;
  next: string;

  commentObject : Comment;
  commentForm : FormGroup;
  @ViewChild('comform') commentFormDirective;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    },
    
  };
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, 
    private fb: FormBuilder,     
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {

    this.dishservice.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe((dish)=> {this.dish = dish;
                         this.setPrevNext(dish.id);
                        });
    this.createCommentForm();
  }

  setPrevNext(currentDishId: string){
    const index = this.dishIds.indexOf(currentDishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5],
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.commentForm) {return;}
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' '; 
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.commentObject = this.commentForm.value;
    this.commentObject.date = new Date().toISOString();
    this.dish.comments.push(this.commentObject);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }
}
