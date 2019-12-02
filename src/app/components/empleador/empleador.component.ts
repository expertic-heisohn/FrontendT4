import { Component, OnInit } from '@angular/core';
import { EmpleadorService } from 'src/app/services/empleador.services';
@Component({
    selector: 'empleador-event',
    templateUrl: './empleador.component.html',
})
export class EmpleadorComponent implements OnInit {
    public empleadores = [];
    public headElements = ["Id","Documento", "Nombre", "Actividad", "Direccion", "Teléfono", "Opciones"];
    public empleadorIndice = null;
    public documentoInput  = "";
    public nombreInput = "";
    public actividadInput = "";
    public direccionInput = "";
    public telefonoInput = "";

    constructor(private empleadorService: EmpleadorService) {}
  
    ngOnInit(): void {
      this.empleadorService.getEmpleador().subscribe(data => {
        console.log({ data });
        this.empleadores = data;
      });
    }

    getEmpleador(): void {
        this.empleadorService.getEmpleador().subscribe(data => {
          console.log({ data });
          this.empleadores = data;
        });
      }
    
      deleteEmpleador(indice: number): void {
        this.empleadorService.deleteEmpleador(indice).subscribe(data => {
          console.log({ data });
          this.getEmpleador();
        });
      }
    
      createEmpleador(): void {
        this.empleadorIndice = null;
        const nuevoUsuario: any = {
          documento: this.documentoInput,
          nombre: this.nombreInput,
          activdad: this.actividadInput,
          direccion: this.direccionInput,
          telefono: this.telefonoInput
        };
        console.log("click createUsuario === ", { nuevoUsuario });
        this.empleadorService.createEmpleador(nuevoUsuario).subscribe(data => {
          console.log({ data });
          this.getEmpleador();
        });
      }
    
      editEmpleadorPopularForm(indice: number): void {
        this.empleadorIndice = indice;
        this.nombreInput = this.empleadores[indice].nombre;
      }
    
      guardarEdicionEmpleador(): void {
        const empleadorEditado: any = {
          documento: this.documentoInput,
          nombre: this.nombreInput,
          activdad: this.actividadInput,
          direccion: this.direccionInput,
          telefono: this.telefonoInput
        };
        this.empleadorService
          .editEmpleador(this.empleadorIndice, empleadorEditado)
          .subscribe(data => {
            console.log({ data });
            this.getEmpleador();
          });
      }

      /*guardarEdicionEmpleador(): void {
        const empleadorEditado: any = {
          nombre: this.nombreInput || ""
        };
        this.empleadorService
          .editEmpleador(this.empleadorIndice, empleadorEditado)
          .subscribe(data => {
            console.log({ data });
            this.getEmpleador();
          });
      }*/
}
