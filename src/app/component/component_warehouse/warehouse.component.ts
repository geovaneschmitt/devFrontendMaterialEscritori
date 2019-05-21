import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Request } from './../component_request/request';
import { RequestService } from '../../service/service_request/request.service';
import { Component, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.sass']
})
export class WarehouseComponent implements OnInit{

  public requests: Request[];
  public function: string;
  filtroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private route: ActivatedRoute) {

    this.function = this.route.snapshot.paramMap.get('function');

    if (this.function == 'admin') {
      this.requestService.getRequests()
        .subscribe((data: Request[]) => {
          this.requests = data;
          console.log(this.requests);
        });
    } else {
      this.requestService.getRequests()
        .subscribe((data: Request[]) => {
          this.requests = data;
          console.log(this.requests);
        });
    }
  }

  ngOnInit() {
    this.filtroForm = this.fb.group({userRequester: '', description: '', status: ''});
  }

  get userRequester() { return this.filtroForm.get('userRequester'); }
  get description() { return this.filtroForm.get('description'); }
  get priority() { return this.filtroForm.get('priority'); }
  get status() { return this.filtroForm.get('status'); }


  onSubmit() {
    const request: Request = {
      id: 0,
      priority: this.priority.value,
      userRequester: this.userRequester.value,
      description: this.description.value,
      productCost: 0,
      status: this.status.value,
      obs: ''
    }

    this.requestService.getRequestByFilter(request)
      .subscribe((res: Request[]) => {
        this.requests = res;
      });
  }
}
