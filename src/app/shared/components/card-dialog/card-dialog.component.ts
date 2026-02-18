import { Component, Input, Output } from '@angular/core';
import { CharRespResult } from '../../../core/services/characters/characters.interface';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-dialog',
  imports: [DialogModule],
  templateUrl: './card-dialog.component.html',
  styleUrl: './card-dialog.component.css',
})
export class CardDialogComponent {
  @Input({ required: true }) character!: CharRespResult;
  @Input() visible = false;
  @Output() closed = new Subject<boolean>();

  onClose() {
    this.closed.next(false);
  }
}
