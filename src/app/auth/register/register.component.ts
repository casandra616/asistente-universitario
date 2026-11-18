import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // 1. Declaramos la propiedad principal para el formulario reactivo
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // Inicializamos el formulario con los campos obligatorios
    this.registerForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // 2. Método que se ejecuta al presionar el botón de registro
  onRegister(): void {
    // Validamos si el formulario cumple con todos los campos obligatorios
    if (this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    

      // Validamos que las contraseñas coincidan
      if (password !== confirmPassword) {
        alert('¡Las contraseñas no coinciden!');
        return;

      }

         // Guardamos el usuario registrado para que el login pueda reconocerlo
      const usuario = {
        nombreCompleto: this.registerForm.get('nombreCompleto')?.value,
        correo: this.registerForm.get('correo')?.value,
        password: password
      };
      localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));

      // Mensaje claro indicando que ya tiene acceso y debe iniciar sesión
      alert('¡Registro exitoso! Ya tienes acceso, inicia sesión.');

      // Redirigimos automáticamente a la pantalla de login
      this.router.navigate(['/auth/login']);

    } else {
      // Si falta llenar información requerida
      alert('Por favor completa toda la información requerida antes de registrarte.');
      
      // Marca visualmente los campos para que el usuario sepa cuáles faltan
      this.registerForm.markAllAsTouched();
    }
  }
}