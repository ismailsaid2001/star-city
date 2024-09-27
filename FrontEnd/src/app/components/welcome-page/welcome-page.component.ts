import { Component } from '@angular/core';
import { WelcomePageService } from './welcome-page.service';

@Component({
  selector: 'app-welcome-page',
  styleUrls: ['./welcome-page.component.css'],
  template: `
    <div nz-row>
      <div class="left-divider" nz-col nzSpan="6">
        <div class="weather-card">
          <div class="weather-info">
            <img class="weather-logo" [src]="image_url" alt="Logo Météo">
            <div class="weather-details" *ngIf="meteoTunisDatas">
              <h3>Météo {{ meteoTunisDatas.name }}</h3>
              <h4>{{ meteoTunisDatas.weather[0].description | titlecase }} - {{ meteoTunisDatas.main.temp }} °C</h4>
              <h5>Min : {{ meteoTunisDatas.main.temp_min }} - Max : {{ meteoTunisDatas.main.temp_max }}</h5>
            </div>
          </div>
        </div>
        <iframe class="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254055.8960362938!2d10.154910136372879!3d36.818945144258704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d4cbe6a299b0bf%3A0xecd5e18bde45de1f!2sTunis!5e0!3m2!1sen!2s!4v1706623027050!5m2!1sen!2s"
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div nz-col nzSpan="17" nzOffset="1">
        <h1>Bienvenue à l'Agence de Publicité de Star City. </h1>
        <img class="welcome-img" src="https://www.starmediasolution.in/wp-content/uploads/2014/05/1.jpg" alt="">
        <p style="color: cornflowerblue">Postez vos annonces (services, covoiturages, dons ou ventes...) directement via la rubrique <b>"ANNONCES"</b>.
        </p>
      </div>
    </div>
  `,
})
export class WelcomePageComponent {

  meteoTunisDatas!: any
  image_url!: any

  constructor(
    private welcomePageService: WelcomePageService,
  ) {}

  ngOnInit() {
    this.getMeteoTunis()
  }

  getMeteoTunis() {
    this.welcomePageService.getMeteoTunis()
    .subscribe((response: any) => {
      this.meteoTunisDatas = response,
      this.image_url = `https://openweathermap.org/img/wn/${this.meteoTunisDatas.weather[0].icon}@2x.png`
    })
  }


}
