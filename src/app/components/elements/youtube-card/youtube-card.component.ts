//src/components/elements/youtube-card/youtube-card.component
import { Component, Input, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { SafeUrlPipe } from "../../../pipes/safe-url.pipe";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-youtube-card',
    standalone: true,
    templateUrl: './youtube-card.component.html',
    styleUrl: './youtube-card.component.css',
    imports: [
      SafeUrlPipe,
      CommonModule
    ]
})
export class YoutubeCardComponent implements OnInit {

  @Input() videoId: string = '';
  @Input() videoUrl: string = '';
  @Input() title: string = '';
  @Input() topics: string[] = [];
  @Input() icons: string[] = [];

  @Input() items: any[] = [];
  list: any[] = [];


  constructor(private videoSvc: VideoService) { }

  ngOnInit(): void {
    this.list = this.videoSvc.getVideos();
  }

}
