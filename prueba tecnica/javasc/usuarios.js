
var mail 
var password 


var rol

document.getElementById('rol').addEventListener('change', function() {
     rol=this.value
  });



// guardar usuarios 
function Btn(){

  
    mail = document.querySelector('#singup-email1').value;
    password = document.querySelector('#singup-contrasena1').value;
    db.collection("usuariosp").doc(mail).set({
        
        contraseña:password,
        Rol: rol
        
        
    })
    .then((docRef) => {
    alert("cracion exitosa")
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    }); 
          }


        