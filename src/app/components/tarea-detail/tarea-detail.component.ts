import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-tarea-detail',
  templateUrl: './tarea-detail.component.html',
  styleUrls: ['./tarea-detail.component.css']
})
export class TareaDetailComponent implements OnInit {

  tarea: Tarea | undefined;
  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTarea();
  }
  
  getTarea(): void {
    const id = Number(this.route.snapshot.paramMap.get('tarea_id'));
    this.tareaService.getTarea(id)
      .subscribe(tarea => this.tarea = tarea);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.tarea) {
      this.tareaService.updateTarea(this.tarea)
        .subscribe(() => this.goBack());
    }
  }
}
