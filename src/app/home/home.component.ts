// import { Component, OnInit } from '@angular/core';
// import { Dish } from '../shared/dish';
// import { DishService } from '../services/dish.service';
// import { Promotion } from '../shared/promotion';
// import { PromotionService } from '../services/promotion.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {

//   dish: Dish;
//   promotion: Promotion;

//   constructor(private dishservice: DishService,
//     private promotionservice: PromotionService) { }

//   ngOnInit() {
//     this.dish = this.dishservice.getFeaturedDish();
//     this.promotion = this.promotionservice.getFeaturedPromotion();
//   }

// }
import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  dish: Dish|undefined;
  promotion: Promotion|undefined;
  leader: Leader|undefined;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedLeader();
  }

}  
    