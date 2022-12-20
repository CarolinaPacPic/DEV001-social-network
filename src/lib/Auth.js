import {
  createUserWithEmailAndPassword,
  getAuth, GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from './Imports.js';
import { app } from './Firebase.js';

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Inicia el autentificador con google
export const provider = new GoogleAuthProvider();

// CREAR USUARIO CON EMAIL
export const createUser = (userMail, userPass, onNavigate) => {
  createUserWithEmailAndPassword(auth, userMail, userPass)
    .then((userCredential) => {
      console.log('bieen');
      // Signed in
      const user = userCredential.user;
      onNavigate('/wall');
      console.log('welcome ', user);
      // ...
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        document.getElementById('errorSpace').innerHTML = 'Éste correo ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        document.getElementById('errorSpace').innerHTML = 'El correo que ingresaste es inválido';
      } else if (error.code === 'auth/weak-password') {
        document.getElementById('errorSpace').innerHTML = 'Tu clave tiene que tener un mínimo de seis dígitos';
      } else if (error.code) {
        document.getElementById('errorSpace').innerHTML = 'Revisa los datos ingresados, algo no está bien';
      }
    });
};

// INGRESAR CON USUARIO EXISTENTE
export const signUp = (userMail, userPass, onNavigate) => {
  signInWithEmailAndPassword(auth, userMail, userPass)
    .then((userCredential) => {
      onNavigate('/wall');
      // Signed in
      // const user = userCredential.user;
      console.log(userCredential);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        document.getElementById('errorLogin').innerHTML = 'Este correo ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        document.getElementById('errorLogin').innerHTML = 'El correo que ingresaste es inválido';
      } else if (error.code === 'auth/weak-password') {
        document.getElementById('errorLogin').innerHTML = 'Tu clave tiene que tener un mínimo de seis dígitos';
      } else if (error.code) {
        document.getElementById('errorLogin').innerHTML = 'Revisa los datos ingresados, algo no está bien';
      }
    });
};

// INGRESAR CON GOOGLE - check
export const signInGoogle = async (onNavigate) => {
  try {
    const credentials = await signInWithPopup(auth, provider);
    console.log('el tipo de dato es', typeof signInGoogle);
    onNavigate('/wall');
  } catch (error) {
    console.log(error);
  }
};

// FUNCIÓN DE SIGNOUT - check
export const logOut = async () => {
  await signOut(auth);
};
