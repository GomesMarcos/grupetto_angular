import { Component, OnInit } from '@angular/core'
import * as Tone from 'tone'
import { Frequency } from 'tone/build/esm/core/type/Units'
import * as octaves from './octaves.js'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
  // ATTRIBUTES
  keys: HTMLElement
  duration: number
  white_notes: Object[]
  synth = new Tone.PolySynth().toDestination()
  note: Frequency
  notes: HTMLCollection
  interval: any
  keyOctaves: Array<Array<String>>

  constructor() {
    this.keyOctaves = octaves.default
    this.duration = 500
  }

  ngAfterViewInit(): void {
    this.notes = document.getElementsByClassName('keyboard')
    this.interval = this.setInterval(this.notes)
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
    this.synth.triggerAttackRelease(this.note, (this.duration / 1000).toString())
  }

  setInterval(notes) {
    const first_key = Math.floor(Math.random() * notes.length) - 1
    const second_key = Math.floor(Math.random() * notes.length) - 1

    if (this.validateInterval(first_key, second_key)) {
      this.activePlayedNote(notes[first_key], this.duration)
      this.activePlayedNote(notes[second_key], this.duration)

      this.interval = [first_key, second_key]

      return [first_key, second_key]
    }
    this.setInterval(notes)
  }

  replayInterval(interval) {
    this.activePlayedNote(this.notes[interval[0]], this.duration)
    this.activePlayedNote(this.notes[interval[1]], this.duration)
  }

  activePlayedNote(note, noteDuration) {
    note.classList.add('active')
    this.playNote(note)
    setTimeout(() => {
      note.classList.remove('active')
    }, noteDuration)
  }

  validateInterval(first_key, second_key): boolean {
    if (second_key - first_key < 0) {
      return false
    }
    return true
  }
}
