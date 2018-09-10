import 'velocity-animate';
import 'angular';
import './app.less';

const defaultRotationAngle = 90;
const defaultSpeedKf = 1000;

class App {
  constructor($scope) {
    this.$scope = $scope;
    
    this.dominoEl = document.getElementById('domino');
    this.selectedPart = null;
    this.dominoSize = 1;
    this.rotationSpeed = 1;
    this.rotationAngle = 0;
    this.types = {
      one: 'one',
      two: 'two',
      three: 'three',
      four: 'four',
      five: 'five',
      six: 'six'
    }
    this.initFaces();
    this.initDomino();
  }
  
  get dominoStyle() {
    return {
      'height': `${this.dominoSize * 200}px`,
      'width': `${this.dominoSize * 100}px`
    }
  }
  
  dominoPartTypeClass(part) {
    const type = this.domino[part].type;
    const types = this.types;

    return {
      'domino-wrapper__part--one': type === types.one,
      'domino-wrapper__part--two': type === types.two,
      'domino-wrapper__part--three': type === types.three,
      'domino-wrapper__part--four': type === types.four,
      'domino-wrapper__part--five': type === types.five,
      'domino-wrapper__part--six': type === types.six,
      'domino-wrapper__part--selected': this.selectedPart === part
    }
  }
  
  resetDomino() {
    this.rotationAngle = 0;
    this.rotateDomino('left', true);
    this.initDomino();
  }
  
  rotateDomino(direction, reset) {
    const angle = direction === 'right'
      ? this.rotationAngle + defaultRotationAngle
      : this.rotationAngle - defaultRotationAngle;
  
    this.isInterfaceDisabled = true;
    Velocity.animate(this.dominoEl, {
      rotateZ: reset ? 0 : `${angle}deg`,
      duration: this.rotationSpeed / defaultSpeedKf
    })
      .then(() => {
        this.$scope.$apply(() => {
          this.rotationAngle = angle;
          this.isInterfaceDisabled = false;  
        });
      });
  }
  
  initFaces() {
    this.availableFaces = Object.keys(this.types);
  }
  
  initDomino() {
    this.selectedPart = null;
    this.dominoSize = 1;
    this.rotationSpeed = 1;

    this.domino = {
      top: {
        type: this.types.six
      },
      bottom: {
        type: this.types.five
      }
    }
  }
  
  choosePartForTypeSelection(part) {
    this.selectedPart = this.selectedPart === part
      ? null
      : part;
  }
  
  static get $inject() {
    return ['$scope'];
  }
}


angular.module('app', [])
  .controller('App', App);