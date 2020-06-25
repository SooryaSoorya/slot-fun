import { Component, ViewChild } from '@angular/core';

import { BG_COLOR } from './shared/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slot-fun';
  public playerScore = 10;
  public knobClicked = false;
  public isSpinning = false;

  public bgColorCombination = BG_COLOR.WHITE;
  public backgroundOfTopLine = 'red';
  public backgroundOfCentralLine = 'red';
  public backgroundOfBottomLine = '#00a1ff';
  public debitedMoney: number | string = 0;
  public debugMode: boolean = false;
  public showDebitMoney = false;
  public line1Score: number = 0;
  public line2Score: number = 0;
  public line3Score: number = 0;
  public debugLine: number = 4;

  private knobPullSound = '../../../assets/audio/knob-pull.mp3';
  private spinningSound = '../../../assets/audio/spinning.mp3';
  private payOutSound = '../../../assets/audio/pay-out.wav';

  @ViewChild('wheelCell1', { static: false }) wheel1;
  @ViewChild('wheelCell2', { static: false }) wheel2;
  @ViewChild('wheelCell3', { static: false }) wheel3;
  @ViewChild('debugWheel1', { static: false }) debugWheel1;
  @ViewChild('debugWheel2', { static: false }) debugWheel2;
  @ViewChild('debugWheel3', { static: false }) debugWheel3;

  
  private winningLine = {
    '4,4,4': {
      1: false,
      2: false,
      3: false,
    },
    '2,2,2': {
      1: false,
      2: false,
      3: false,
    },
    '3,3,3': {
      1: false,
      2: false,
      3: false,
    },
    '1,1,1': {
      1: false,
      2: false,
      3: false,
    },
    '5,5,5': {
      1: false,
      2: false,
      3: false,
    },
    cherryAndSevenCombo: false,
    anyBarCombo: false,
    checkComboOfAnyBar(combination: string) {
      this.anyBarCombo = combination.includes('3');
    },
    checkComboOfCherryAndSeven(combination: string) {
      this.cherryAndSevenCombo =
        combination.includes('1') && combination.includes('5');
    },
  };

  public knobPulled() {
    if (this.playerScore > 0) {
      this.knobClicked = true;
      this.showDebitMoney = false;
      this.isSpinning = true;
      this.reset();
      this.resetBgColor();
      this.knobPullPlay(this.knobPullSound);
      setTimeout(() => (this.knobClicked = false), 1500);
      setTimeout(() => {
        this.startSpinning();
      }, 1000);
      this.playerScore--;
      this.debitedMoney = -1;

      this.showDebitMoney = true;
    }
  }

  private startSpinning() {
    const debugReel1Image =
      this.debugMode &&
      this.debugWheel1.nativeElement.childNodes[0] &&
      this.debugWheel1.nativeElement.childNodes[0].dataset.position;
    const debugReel2Image =
      this.debugMode &&
      this.debugWheel2.nativeElement.childNodes[0] &&
      this.debugWheel2.nativeElement.childNodes[0].dataset.position;
    const debugReel3Image =
      this.debugMode &&
      this.debugWheel3.nativeElement.childNodes[0] &&
      this.debugWheel3.nativeElement.childNodes[0].dataset.position;

    const desiredImageForReel1 =
      debugReel1Image || Math.floor(Math.random() * 5) + 1;
    const desiredImageForReel2 =
      debugReel2Image || Math.floor(Math.random() * 5) + 1;
    const desiredImageForReel3 =
      debugReel3Image || Math.floor(Math.random() * 5) + 1;

    const desiredPositionForReel1 =
      (this.debugMode && this.debugLine) || Math.floor(Math.random() * 5) + 1;
    const desiredPositionForReel2 =
      (this.debugMode && this.debugLine) || Math.floor(Math.random() * 5) + 1;
    const desiredPositionForReel3 =
      (this.debugMode && this.debugLine) || Math.floor(Math.random() * 5) + 1;

    this.spinWheel(
      this.wheel1,
      2000,
      desiredImageForReel1,
      desiredPositionForReel1
    );
    this.spinWheel(
      this.wheel2,
      2500,
      desiredImageForReel2,
      desiredPositionForReel2
    );
    this.spinWheel(
      this.wheel3,
      3000,
      desiredImageForReel3,
      desiredPositionForReel3
    );

    this.spinningPlay(this.spinningSound);
    this.isSpinning = false;

    setTimeout(() => {
      this.showDebitMoney = false;
      this.checkCombos();
      this.isSpinning = false;
    }, 3000);
  }

  private async spinWheel(reel, time, desiredImageForReel, desiredPosition) {
    const translationMap = {
      1: 360,
      2: 240,
      3: 120,
      4: 0,
      5: -120,
    };
    const dataPositionMap = {
      '360': 1,
      '240': 2,
      '120': 3,
      '0': 4,
      '-120': 5,
    };

    const visibilityMap = {
      1: 'hidden',
      2: 'visible',
      3: 'visible',
      4: 'visible',
      5: 'hidden',
    };
    const rotatingToDesiredMap = {
      1: {
        1: {
          1: 360,
          2: 240,
          3: 120,
          4: 0,
          5: -120,
        },
        2: {
          1: -120,
          2: 360,
          3: 240,
          4: 120,
          5: 0,
        },
        3: {
          1: 0,
          2: -120,
          3: 360,
          4: 240,
          5: 120,
        },
        4: {
          1: 120,
          2: 0,
          3: -120,
          4: 360,
          5: 240,
        },
        5: {
          1: 240,
          2: 120,
          3: 0,
          4: -120,
          5: 360,
        },
      },
      2: {
        1: {
          1: 240,
          2: 120,
          3: 0,
          4: -120,
          5: 360,
        },
        2: {
          1: 360,
          2: 240,
          3: 120,
          4: 0,
          5: -120,
        },
        3: {
          1: -120,
          2: 360,
          3: 240,
          4: 120,
          5: 0,
        },
        4: {
          1: 0,
          2: -120,
          3: 360,
          4: 240,
          5: 120,
        },
        5: {
          1: 120,
          2: 0,
          3: -120,
          4: 360,
          5: 240,
        },
      },
      3: {
        1: {
          1: 120,
          2: 0,
          3: -120,
          4: 360,
          5: 240,
        },
        2: {
          1: 240,
          2: 120,
          3: 0,
          4: -120,
          5: 360,
        },
        3: {
          1: 360,
          2: 240,
          3: 120,
          4: 0,
          5: -120,
        },
        4: {
          1: -120,
          2: 360,
          3: 240,
          4: 120,
          5: 0,
        },
        5: {
          1: 0,
          2: -120,
          3: 360,
          4: 240,
          5: 120,
        },
      },
      4: {
        1: {
          1: 0,
          2: -120,
          3: 360,
          4: 240,
          5: 120,
        },
        2: {
          1: 120,
          2: 0,
          3: -120,
          4: 360,
          5: 240,
        },
        3: {
          1: 240,
          2: 120,
          3: 0,
          4: -120,
          5: 360,
        },
        4: {
          1: 360,
          2: 240,
          3: 120,
          4: 0,
          5: -120,
        },
        5: {
          1: -120,
          2: 360,
          3: 240,
          4: 120,
          5: 0,
        },
      },
      5: {
        1: {
          1: -120,
          2: 360,
          3: 240,
          4: 120,
          5: 0,
        },
        2: {
          1: 0,
          2: -120,
          3: 360,
          4: 240,
          5: 120,
        },
        3: {
          1: 120,
          2: 0,
          3: -120,
          4: 360,
          5: 240,
        },
        4: {
          1: 240,
          2: 120,
          3: 0,
          4: -120,
          5: 360,
        },
        5: {
          1: 360,
          2: 240,
          3: 120,
          4: 0,
          5: -120,
        },
      },
    };
    Array.from(reel.nativeElement.childNodes).map((child: HTMLElement) => {
      const calculatedPosition =
        rotatingToDesiredMap[child.dataset.position][desiredImageForReel][
          desiredPosition
        ];
      child.style.transform = `translateY(${calculatedPosition}px)`;
      child.dataset.position = dataPositionMap[calculatedPosition];
    });

    const interval = setInterval(() => {
      Array.from(reel.nativeElement.childNodes).map((child: HTMLElement) => {
        if (child.dataset.position === '5') child.dataset.position = '1';
        else
          child.dataset.position = (
            parseInt(child.dataset.position) + 1
          ).toString();
        child.style.transform = `translateY(${
          translationMap[child.dataset.position]
        }px)`;
        child.style.visibility = visibilityMap[child.dataset.position];
        return child;
      });
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
    }, time);
  }

  private checkCombos() {
    const winningCombo = {
      '4,4,4': {
        1: 2000,
        2: 1000,
        3: 4000,
      },
      '2,2,2': {
        1: 150,
        2: 150,
        3: 150,
      },
      '3,3,3': {
        1: 50,
        2: 50,
        3: 50,
      },
      '1,1,1': {
        1: 20,
        2: 20,
        3: 20,
      },
      '5,5,5': {
        1: 10,
        2: 10,
        3: 10,
      },
      checkComboOfAnyBar(combination: string) {
        return combination.includes('5') && 5;
      },
      checkComboOfCherryAndSeven(combination: string) {
        return combination.includes('2') && combination.includes('4') && 75;
      },
    };

    const originalPositionMap = {
      0: 4,
      1: 3,
      2: 2,
      3: 1,
      4: 5,
    };

    let line1: any = [];
    let line2: any = [];
    let line3: any = [];

    Array.from(this.wheel1.nativeElement.childNodes).map(
      (child: HTMLElement, index) => {
        if (child.dataset.position === '4')
          line1.push(originalPositionMap[index]);
        if (child.dataset.position === '3')
          line2.push(originalPositionMap[index]);
        if (child.dataset.position === '2')
          line3.push(originalPositionMap[index]);
        child.dataset.position = originalPositionMap[index];

        return child;
      }
    );
    Array.from(this.wheel2.nativeElement.childNodes).map(
      (child: HTMLElement, index) => {
        if (child.dataset.position === '4')
          line1.push(originalPositionMap[index]);
        if (child.dataset.position === '3')
          line2.push(originalPositionMap[index]);
        if (child.dataset.position === '2')
          line3.push(originalPositionMap[index]);
        child.dataset.position = originalPositionMap[index];

        return child;
      }
    );
    Array.from(this.wheel3.nativeElement.childNodes).map(
      (child: HTMLElement, index) => {
        if (child.dataset.position === '4')
          line1.push(originalPositionMap[index]);
        if (child.dataset.position === '3')
          line2.push(originalPositionMap[index]);
        if (child.dataset.position === '2')
          line3.push(originalPositionMap[index]);
        child.dataset.position = originalPositionMap[index];

        return child;
      }
    );
    line1 = line1.join(',');
    line2 = line2.join(',');
    line3 = line3.join(',');

    this.line1Score = winningCombo[line1]
      ? winningCombo[line1][1]
      : winningCombo.checkComboOfCherryAndSeven(line1) ||
        winningCombo.checkComboOfAnyBar(line1);
    this.line2Score = winningCombo[line2]
      ? winningCombo[line2][2]
      : winningCombo.checkComboOfCherryAndSeven(line2) ||
        winningCombo.checkComboOfAnyBar(line2);
    this.line3Score = winningCombo[line3]
      ? winningCombo[line3][3]
      : winningCombo.checkComboOfCherryAndSeven(line3) ||
        winningCombo.checkComboOfAnyBar(line3);

    const map = {
      [this.line1Score]: {
        i: 1,
        value: line1,
      },
      [this.line2Score]: {
        i: 2,
        value: line2,
      },
      [this.line3Score]: {
        i: 3,
        value: line3,
      },
    };

    const bestWinningLine = map[this.getMaxScore()];

    setTimeout(() => {
      this.playerScore += this.getMaxScore();
      this.debitedMoney = `+ ${this.getMaxScore()}`;
      this.showDebitMoney = true;
      this.payoutPlay(this.payOutSound);
    }, 500);

    if (this.winningLine[bestWinningLine.value])
      this.winningLine[bestWinningLine.value][bestWinningLine.i] = true;
    this.winningLine.checkComboOfCherryAndSeven(bestWinningLine.value);
    !!!this.winningLine.cherryAndSevenCombo &&
      this.winningLine.checkComboOfAnyBar(bestWinningLine.value);
  }

  private knobPullPlay(src) {
    this.playAudio(src);
  }
  private spinningPlay(src) {
    this.playAudio(src);
  }
  private payoutPlay(src) {
    this.playAudio(src);
  }

  public playAudio(src) {
    let audio = new Audio();
    audio.src = src; // "../../../assets/audio/spinning.mp3";
    audio.load();
    audio.play();
  }

  private reset() {
    this.line1Score = 0;
    this.line2Score = 0;
    this.line3Score = 0;
    this.winningLine.cherryAndSevenCombo = false;
    this.winningLine.anyBarCombo = false;
    Object.values(this.winningLine).map((obj) => {
      if (typeof obj === 'object') {
        Object.keys(obj).map((key) => {
          return (obj[key] = false);
        });
      }
      return obj;
    });
  }

  private resetBgColor() {
    this.bgColorCombination = 'white';
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer.setData('text', (event.target as HTMLElement).id);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    const { target } = event;
    const { childNodes } = target as HTMLElement;
    if (childNodes.length > 0) {
      (target as HTMLElement).removeChild(childNodes[0]);
    }
    (target as HTMLElement).appendChild(
      document
        .getElementById(event.dataTransfer.getData('text'))
        .cloneNode(true)
    );
  }

  public getMaxScore() {
    return Math.max(this.line1Score, this.line2Score, this.line3Score);
  }
}
