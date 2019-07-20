import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RingtoneService} from '../../services/ringtone.service';
import {Observable, Subject} from 'rxjs';
import {Ringtone} from '../../ringtone.model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit, OnDestroy {

  ringtones$: Observable<Ringtone[]>;
  workRingtone: string;
  breakRingtone: string;
  playingRingtone: Ringtone;
  destroy$ = new Subject<void>();
  @ViewChild('ringtone', {static: false}) ringtoneRef: ElementRef;

  get ringtoneElem(): HTMLAudioElement {
    return this.ringtoneRef.nativeElement as HTMLAudioElement;
  }

  constructor(private ringtoneService: RingtoneService) {
  }

  ngOnInit(): void {
    this.ringtones$ = this.ringtoneService.ringtones$;
    this.ringtoneService.workRingtone$.pipe(takeUntil(this.destroy$))
      .subscribe(s => this.workRingtone = s);
    this.ringtoneService.breakRingtone$.pipe(takeUntil(this.destroy$))
      .subscribe(s => this.breakRingtone = s);
  }

  play(ringtone: Ringtone) {
    this.playingRingtone = ringtone;
    this.ringtoneElem.load();
    this.ringtoneElem.play();
  }

  stop() {
    this.ringtoneElem.pause();
    this.ringtoneElem.currentTime = 0;
    this.playingRingtone = null;
  }

  onPlayEnd() {
    this.playingRingtone = null;
    console.log('end');
  }

  setRingtone(type: 'work' | 'break', filename: string) {
    this.ringtoneService.setRingtone(type, filename);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
