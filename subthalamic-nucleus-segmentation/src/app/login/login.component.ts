import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../app/helpers/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

  failed = false;
  loading = false;
  submitted = false;

  fieldTextType: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/pedidos';
  }

  get f(): any {
    return this.form.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login(): void {
    if (! this.form.valid) return;
    const username = this.f.username.value;
    const password = this.f.password.value;
    this._login(username, password);
  }

  private _login(username: string, password: string): void {
    this.loading = true;
    
    this.authService.login(username, password).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      res => {
        this.router.navigate(['/principal']);
      },
      err => this.failed = true
    );
  }

}
