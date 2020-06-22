import { Component } from '@angular/core';

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
  public debugMode = false;
  public bgColorCombination = BG_COLOR.WHITE;
  public backgroundOfTopLine = '#00a1ff';
  public backgroundOfCentralLine = '#00a1ff';
  public backgroundOfBotLine = '#00a1ff';
  public debitedMoney: number | string = 0;
  public showDebitMoney = false;

  private knobPullSound = '../../../assets/audio/knob-pull.mp3';
  private spinningSound = '../../../assets/audio/spinning.mp3';
  private payOutSound = '../../../assets/audio/pay-out.mp3';

  public knobPulled() {
    if (this.playerScore > 0) {
      this.knobClicked = true;
      this.showDebitMoney = false;
      this.isSpinning = true;
      this.reset();
      this.knobPullPlay(this.knobPullSound);
      setTimeout(() => (this.knobClicked = false), 500);
      setTimeout(() => {
        this.startSpinning();
      }, 1000);
      this.playerScore--;
      this.debitedMoney = -1;

      this.showDebitMoney = true;
    }
  }

  private startSpinning() {
   // this.spinningPlay(this.spinningSound);
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

  private reset() {}
}
