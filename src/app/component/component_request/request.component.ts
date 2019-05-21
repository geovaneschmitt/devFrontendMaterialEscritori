import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../service/service_request/request.service';
import { Request } from './request';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-Request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit {

  requestForm: FormGroup;
  public function: string;
  public requestID;

  constructor(private fb: FormBuilder, private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.function = this.route.snapshot.paramMap.get('function');
    this.requestID = this.route.snapshot.paramMap.get('request');
    if (this.requestID != 0) {
      this.requestService.getRequestById(this.requestID).subscribe((data: Request) => {
          this.id.setValue(data.id);
          this.priority.setValue(data.priority);
          this.userRequester.setValue(data.userRequester);
          this.description.setValue(data.description);
          this.productCost.setValue(data.productCost);
        });
    }
  }

  ngOnInit() {
    this.requestForm = this.fb.group({
      id: new FormControl(null),
      userRequester: new FormControl({value: '', disabled: this.function == 'warehouse'}, Validators.required),
      priority: new FormControl({value: '', disabled: this.function == 'warehouse'}, Validators.required),
      description: new FormControl({value: '', disabled: this.function == 'warehouse'}, Validators.required),
      productCost: new FormControl({value: 0, disabled: this.function == 'warehouse'}, Validators.required),
      status: new FormControl('Aprovado'),
      obs: new FormControl('')
    });

    this.requestForm.get('status').valueChanges.subscribe(value => {
      value == 'Reprovado' ? this.requestForm.get('obs').setValidators([Validators.required, Validators.minLength(5)]) : this.requestForm.get('obs').clearValidators();
      this.requestForm.get('obs').updateValueAndValidity();
    });
  }

  get id() { return this.requestForm.get('id'); }
  get userRequester() { return this.requestForm.get('userRequester'); }
  get priority() { return this.requestForm.get('priority')}
  get description() { return this.requestForm.get('description'); }
  get productCost() { return this.requestForm.get('productCost'); }
  get status() { return this.requestForm.get('status'); }
  get obs() { return this.requestForm.get('obs'); }

  onSubmit() {

    const request: Request = {
      id: this.id.value,
      priority: this.priority.value,
      userRequester: this.userRequester.value,
      description: this.description.value,
      productCost: this.productCost.value,
      status: this.status.value,
      obs: this.obs.value
    };

    if (this.function != 'warehouse') {
      request.status = '';
      this.requestService.postCreate(request).subscribe(res => { this.requestForm.reset({productCost: 0}); }, err => {});
    } else {
      this.requestService.putUpdate(request).subscribe(res => { this.router.navigate(['/warehouse/warehouse']); },err => {});
    }

  }
}
