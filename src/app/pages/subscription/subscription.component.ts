import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  plan: string;
  plans = ['None', 'Basic', 'Premium'];
  background = [
    'https://image.freepik.com/foto-gratis/rmb-monedas-apiladas-frente-vivienda-modelo-precios-vivienda-compra-viviendas-bienes-raices-concepto-hipoteca_1387-30.jpg',
    'https://image.freepik.com/foto-gratis/agente-corredores-bienes-raices-que-presenta-consulta-cliente-toma-decisiones-firmar-acuerdo-seguro_1150-15023.jpg',
  'https://image.freepik.com/foto-gratis/manos-agente-cliente-estrechandose-mano-despues-firmar-contrato-comprar-apartamento-nuevo_1150-14835.jpg'];
  backgroundStyle: string;
  premiumStyle: string;
  basicStyle: string;
  selectedStyle = 'background-color: whitesmoke; margin-bottom:20px';
  notSelectedStyle = 'background-color: white; margin-bottom:15px';

  constructor() { }

  ngOnInit(): void {
    this.plan = this.plans[0];
    this.backgroundStyle = this.style(0);
  }
  changePlan(value): void{
    this.plan = this.plans[value];
    console.log(this.plan);
    switch (value){
      case 1:
        this.basicStyle = this.selectedStyle;
        this.premiumStyle = this.notSelectedStyle; break;
      case 2:
        this.basicStyle = this.notSelectedStyle;
        this.premiumStyle = this.selectedStyle; break;
      default:
        this.basicStyle = this.notSelectedStyle;
        this.premiumStyle = this.selectedStyle; break;
    }
    this.backgroundStyle = this.style(value);
  }
  style(value: number): string{
    return 'background-image: url("' + this.background[value] + '"); ' +
      'margin: -16px -16px 0px;' +
      'color: white;' +
      'background-attachment: fixed; ' +
      'background-position: center -120px; ' +
      'background-repeat: no-repeat; ' +
      'background-size: cover;';
  }
}