import {Injectable} from '@angular/core';
import {Ringtone} from '../ringtone.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {share} from 'rxjs/operators';

const defaultRingtone: Ringtone[] = [
  {filename: 'Alarm_Clock.mp3', title: 'Alarm Clock'},
  {filename: 'Bugle_Tune.mp3', title: 'Bugle Tune'},
  {filename: 'Digital_Watch_Alarm_Long.mp3', title: 'Digital Watch Alarm Long'},
  {filename: 'Dinner_Bell_Triangle.mp3', title: 'Dinner Bell Triangle'},
  {filename: 'Radiation_Meter.mp3', title: 'Radiation Meter'},
  {filename: 'Short_Guitar_Clip.mp3', title: 'Short Guitar Clip'},
];

@Injectable({
  providedIn: 'root'
})
export class RingtoneService {

  ringtones$: Observable<Ringtone[]>;
  private _workRingtone$ = new BehaviorSubject(defaultRingtone[0].filename);
  private _breakRingtone$ = new BehaviorSubject(defaultRingtone[1].filename);
  workRingtone$: Observable<string>;
  breakRingtone$: Observable<string>;

  constructor() {
    this.ringtones$ = of(defaultRingtone);
    this.workRingtone$ = this._workRingtone$.asObservable();
    this.breakRingtone$ = this._breakRingtone$.asObservable();
  }

  setRingtone(type: 'work' | 'break', filename: string) {
    if (type === 'work') {
      this._workRingtone$.next(filename);
    } else if (type === 'break') {
      this._breakRingtone$.next(filename);
    }
  }
}
