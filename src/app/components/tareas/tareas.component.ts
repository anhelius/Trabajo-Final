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

    add(tarea_cd: string,tarea_de: string, cant_horas: string): void {
      tarea_cd = tarea_cd.trim();
      tarea_de = tarea_de.trim();
      cant_horas = cant_horas.trim();
      if (!tarea_cd) { return; }
      this.tareaService.addTarea({ tarea_cd,tarea_de,cant_horas } as Tarea)
        .subscribe(tarea => {
          this.tareas.push(tarea);
        });
        
    }

    delete(tarea: Tarea): void {
      this.tareas = this.tareas.filter(h => h !== tarea);
      this.tareaService.deleteTarea(tarea.tarea_id).subscribe();
    }

}
