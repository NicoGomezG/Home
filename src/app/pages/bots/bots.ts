import { Component } from '@angular/core';
import { PLACEHOLDER_BOTS } from '../../core/data/bots.data';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.html',
})
export class Bots {
  protected readonly bots = PLACEHOLDER_BOTS;
}
