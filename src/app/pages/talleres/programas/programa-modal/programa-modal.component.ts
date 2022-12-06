import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProgramaService} from "../../../../providers/services/programa.service";

@Component({
  selector: 'app-programa-modal',
  templateUrl: './programa-modal.component.html',
  styleUrls: ['./programa-modal.component.css']
})
export class ProgramaModalComponent implements OnInit {

  formPrograma: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private programaService: ProgramaService) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    const controls = {
      progNombre: [''],
      progDescripcion: [''],
    };
    this.formPrograma = this.formBuilder.group(controls);
  }

  save(): void {
    this.programaService.add$(this.formPrograma.value).subscribe(response => {
      if(response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }
}
