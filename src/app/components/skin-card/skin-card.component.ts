import { Component, Input } from '@angular/core';
import { Skin } from '../../models/skin.model';
import { JsonPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-skin-card',
  standalone: true,
  imports: [JsonPipe, NgOptimizedImage],
  templateUrl: './skin-card.component.html',
  styleUrl: './skin-card.component.scss'
})
export class SkinCardComponent {
  @Input({ required: true }) skin!: Skin;
}
