import { Component, OnInit } from '@angular/core'
import * as Tone from 'tone'
import { Frequency } from 'tone/build/esm/core/type/Units'
import * as octaves from './octaves.js'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  // ATTRIBUTES
  keys: HTMLElement
  white_notes: Object[]
  synth = new Tone.PolySynth().toDestination()
  note: Frequency
  interval: Number
  keyOctaves: Array<Array<String>>

  constructor() {
    this.keyOctaves = octaves.default
    console.log(this.keyOctaves)
  }

  ngOnInit(): void {
    this.interval = this.setInterval()
  }

  onMouseDown(event): void {
    const target = event.target
    target.classList.add('active')
    this.playNote(target)
    event.stopPropagation()
  }

  onMouseUp(event): void {
    const target = event.target
    target.classList.remove('active')
  }

  addClassHover(event) {
    const target = event.target
    target.classList.hasClass('white')
      ? target.classList.addClass('hover')
      : target.classList.removeClass('hover')
  }

  playNote(key): void {
    this.note = key.id
    this.synth.triggerAttackRelease(this.note, '16n')
  }

  setInterval() {
    const first_key = Math.floor(Math.random() * 12)
    const second_key = Math.floor(Math.random() * 12)

    return second_key - first_key
  }
}
