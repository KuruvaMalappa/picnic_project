import { Component, OnInit } from '@angular/core';
import { PicnicDayService } from './picnic-day.service';

@Component({
  selector: 'app-picnic-day-template',
  templateUrl: './picnic-day-template.component.html',
  styleUrls: ['./picnic-day-template.component.css']
})
export class PicnicDayTemplateComponent implements OnInit {

  public weatherReportList = [];
  minDate: Date;
  public weekDays = [
  {
    key: 'm', value: 'Monday',
  },
  {
    key: 't', value: 'Tuesday',
  },
  {
    key: 'w', value: 'Wednusday',
  },
  {
    key: 'th', value: 'Thursday',
  },
  {
    key: 'f', value: 'Friday',
  },
  {
    key: 's', value: 'Saturday',
  },
  {
    key: 'su', value: 'Sunday',
  }
];
  constructor(private _picnicService: PicnicDayService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit() {
  }

  submitDateRange(dateRangeForm) {
    if (dateRangeForm && dateRangeForm.value && dateRangeForm.value.days >= 0 ) {
      if (dateRangeForm.value.days > 0 && dateRangeForm.value.days <= 30) {
        this.getWeatherReport(dateRangeForm.value.days);
      } else {
        alert('please enter days greater than zero or less than are equals 30');
        return false;
      }
    }
  }


  getWeatherReport(days) {
    this._picnicService.getWeatherReport().subscribe((weatherReport: any) => {
      console.log('weatherReport', weatherReport);
      /* °C to °F Conversion for  (°C × 9/5) + 32
      */
      const filterData: Array<any> = weatherReport.filter((weatherObj) => {
        const low =  ((weatherObj.Low * 9 / 5) + 32);
        const high =  ((weatherObj.High * 9 / 5) + 32);
        if (weatherObj.DayOfMonth <= days && low >= 70 && high <= 85) {
          const customWeatherObj = weatherObj;
          const dayObj =  this.weekDays.find((weekDayObj: any) => {
              if (weatherObj.DayOfWeek && weatherObj.DayOfWeek.trim() === weekDayObj.key) {
                return weekDayObj;
              }
          });
          if (dayObj) {
            customWeatherObj.lowest = low;
            customWeatherObj.highest = high;
            customWeatherObj.weekDay = dayObj.value;
            customWeatherObj.ordinalDay = this.ordinal_suffix_of(weatherObj.DayOfMonth);
          }
          return customWeatherObj;
        }
      });
      const sortByWeatherData = filterData.sort((a, b) => {
        // Compare the 2 dates
        if (parseInt(a.ChanceOfPrecipitation, 10) < parseInt(b.ChanceOfPrecipitation, 10)) { return -1; }
        if (parseInt(a.ChanceOfPrecipitation, 10) > parseInt(b.ChanceOfPrecipitation, 10)) { return 1; }
          return 0;
      });
      this.weatherReportList = sortByWeatherData;
    });
  }

  ordinal_suffix_of(i) {
    const j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + 'st';
    }
    if (j === 2 && k !== 12) {
        return i + 'nd';
    }
    if (j === 3 && k !== 13) {
        return i + 'rd';
    }
    return i + 'th';
}
}

