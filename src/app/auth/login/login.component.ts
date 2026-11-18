import { Component,OnInit}
  from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  public formLogin!: FormGroup;
  
  email: string = "sabi@gmail.com";
  pass: string = "nada"

  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router

  ){}

  ngOnInit(): void {
    this.formInit();

    }

    //Metosdo para iniciar un form
    formInit(){
      this.formLogin = this.fb.group({
        email: [""],
        pass: [""]

        })
    }
   iniciarSesion(){
      const data = this.formLogin.value;

      // Buscamos si hay un usuario guardado por el registro
      const guardado = localStorage.getItem('usuarioRegistrado');
      const usuarioRegistrado = guardado ? JSON.parse(guardado) : null;

      // Usuario fijo que ya tenías
      const esUsuarioFijo = data.email === this.email && data.pass === this.pass;

      // Usuario que se registró en el formulario
      const esUsuarioRegistrado =
        usuarioRegistrado !== null &&
        data.email === usuarioRegistrado.correo &&
        data.pass === usuarioRegistrado.password;

      if (!esUsuarioFijo && !esUsuarioRegistrado) {
        this.isLogin = false;

        setTimeout(() => {
          this.isLogin = true;
        }, 2000);
      }
      else {
        sessionStorage.setItem('login', 'true');
        setTimeout(() => {
          this.router.navigate(['/pages/dashboard']);
        }, 2000);
      }
    
    }
}