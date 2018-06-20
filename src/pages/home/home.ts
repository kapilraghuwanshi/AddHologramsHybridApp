import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Hologram } from '../../components/holograms/holograms';
import { HologramServiceProvider } from '../../providers/hologram-service/hologram-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private selectedColor: string;
  // Array of colors for dropdown
  private HoloColors = [{ no: "Red" }, { no: "Blue" }, { no: "Green" }, { no: "Black" }];
  private checkActive: boolean = true;
  // Hologram Model
  holoModel: Hologram = { HologramName: "", PackingType: "", HologramColor: "", Description: "", IsActive: false };

  constructor(public navCtrl: NavController, public holoService: HologramServiceProvider,
    public alertCtrl: AlertController) {

  }

  //Select color dropdown
  selectColor() {
    this.holoModel.HologramColor = this.selectedColor;
  }

  // Is active checkbox
  onCheckboxActive() {
    if (this.checkActive = !this.checkActive)
      this.holoModel.IsActive = false;
    else
      this.holoModel.IsActive = true;
  }

  // submit forms to API and check the post payload in console
  submitHolograms() {
    this.holoService.addNewHologram(this.holoModel)
        .subscribe(locResp => console.log("Response of http.post "+locResp));
    this.PopUpMessage();
  }

  //to show sent successfully pop up
  PopUpMessage() {
    let alert = this.alertCtrl.create({
      title: 'Data sent successfully!',
      message: 'You can check console logs!'
    });
    alert.present();
  }

}
