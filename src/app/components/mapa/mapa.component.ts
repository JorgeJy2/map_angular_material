import { Component, OnInit } from '@angular/core';
import {Marcador} from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MatDialog} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { WeatherComponent } from './weather/weather.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public marcadores: Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private _bottomSheet: MatBottomSheet) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse( localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador( evento) {
    const coords: { lat: number, lng: number} = evento.coords;
    console.log(coords);

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorange();
    this.openBottomSheet(nuevoMarcador);
    console.log(`Lat ${coords.lat}`);
    console.log(`Lng ${coords.lng}`);
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 2000});
  }

  guardarStorange() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador( posicion: number) {
    console.log(posicion);
    this.marcadores.splice(posicion, 1);
    this.guardarStorange();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 2000});
  }

  editarMarcador(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, descripcion: marcador.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if( !result ) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion  = result.descripcion;

      this.guardarStorange();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 2000});
    });
  }

  openBottomSheet(marcador: Marcador): void {
    this._bottomSheet.open(WeatherComponent, {
      data: { marcador},
    });
  }

  mostrarWeather(position: number): void {
    this.openBottomSheet(this.marcadores[position]);
  }
}
