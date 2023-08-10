import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: Tarea[] = [];  

    constructor(private tareaService: TareaService, private messageService: MessageService) { }
  
    ngOnInit(): void {
      this.getTareas();
    }

    getTareas(): void {
      this.tareaService.getTareas()
          .subscribe(tareas => this.tareas = tareas);
    }

    add(titulo: string,descripcion: string, horas: string): void {
      titulo = titulo.trim();
      descripcion = descripcion.trim();
      horas = horas.trim();
      if (!titulo) { return; }
      this.tareaService.addTarea({ titulo,descripcion,horas } as Tarea)
        .subscribe(tarea => {
          this.tareas.push(tarea);
        });
        
    }

    delete(tarea: Tarea): void {
      this.tareas = this.tareas.filter(h => h !== tarea);
      this.tareaService.deleteTarea(tarea.id_tarea).subscribe();
    }

}
