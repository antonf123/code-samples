//our root app component
import {
  Component,
  View,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/angular2'
@Component({
  selector: 'my-app'
})
@View({
  template: `
    <div>
      <ul>
        <li *ng-for="#chair of chairs" style="background-color: {{ chair.bg }}; transform: rotate({{ chair.rotate }}deg) translate({{ chair.radius }}) rotate({{ chair.rotateBack }}deg)">
          {{ chair.idx + 1 }}
        </li>
      </ul>
      <button (click)="removeChairs()">Start</button>
    </div>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class App {
  chairs: Object[] = [];
  chairList: Object[] = [];
  removedIndex: 0;
  skippedIndex: 0;
  survivorBgcolor: '#3f3';
  survivorPosition: '0';
  removedBgcolor: '#666';
  removedPosition: '25em';

  constructor() {
    var maxChairs = 100,
        slice = 360 * 1 / maxChairs,
        startPoint = -90,
        innerCircle = '22em';
        
    for (var i = 0; i < maxChairs; i++) {
      var turn = slice * i + startPoint;
      var turnBack = turn * -1;
      this.chairs[i] = { 
        'idx': i,
        'bg': '#efefef',
        'rotate': turn,
        'rotateBack': turnBack,
        'radius': innerCircle,
        'removed': false
      };
      this.chairList[i] = i;
    }
  }
  
  removeChairs() {
    this.processChairs(this.chairList,1);
  }
  
  processChairs(list, x) {
    if(list.length === 1) {
      setTimeout(() => {
        this.chairs[list[this.removedIndex]].radius = this.survirorPosition;
        this.chairs[list[this.removedIndex]].bg = this.survivorBgcolor;
      }, 10 * x);
      return list[0];
    }
    else {
      setTimeout(() => {
        this.chairs[list[this.removedIndex]].radius = this.removedPosition;
        this.chairs[list[this.removedIndex]].bg = this.removedBgcolor;
        list.splice(this.removedIndex,1);
        this.skippedIndex += 1;
        this.removedIndex += this.skippedIndex;
        if(this.removedIndex > list.length) {
          this.removedIndex %= list.length;
        }
        x += 1;
        this.processChairs(list,x);
      }, 10 * x);
    }
  }
  
}