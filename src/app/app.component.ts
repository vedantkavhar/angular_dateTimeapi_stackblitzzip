import { Component, OnInit } from '@angular/core';
import { TimeService } from './time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  timeZones = ['Asia/Kolkata', 'America/New_York'];
  times: { [zone: string]: string } = {};
  isLoading = true;

  constructor(private readonly timeService: TimeService) {}

  ngOnInit(): void {
    this.fetchAllTimes();
    setInterval(() =>{ 
      this.fetchAllTimes();
    }, 10000);
  }

  fetchAllTimes(): void {
    this.isLoading = true;
    this.timeZones.forEach((zone) => {
      //subscribe api serviec
      this.timeService.getTimeByZone(zone).subscribe(
        (data) =>{
        const timeStr = this.formatTime(data);
        this.times[zone] = timeStr;
        this.isLoading = false;
      },(error) => {
        console.error(error);
      });
    });
  }

  formatTime(data: any): string {
    const day = this.pad(data.day);
    const month = this.pad(data.month);
    const year = data.year;
    const hour = this.pad(data.hour > 12 ? data.hour - 12 : data.hour);
    const minute = this.pad(data.minute);
    const second = this.pad(data.seconds);
    const ampm = data.hour >= 12 ? 'PM' : 'AM';

    return `${day}-${month}-${year} ${hour}:${minute}:${second} ${ampm}`;
  }
//padding the data numbers
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  
}
