var mail
var password
var rol



function Btn(){

  
    mail = document.querySelector('#singup-email1').value;
    password = document.querySelector('#singup-contrasena1').value;

    db.collection("usuariosp").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          
          if(doc.id=== mail && doc.data().contraseña===password){
            
            localStorage.setItem("email", mail);
            rol=doc.data().Rol;
         if (rol==="administrador")
            location.href="../html/menu-u.html"; 

        else if (rol==="cliente"){
            location.href="../html/menu-cl.html";
        }
         }

         
        });


    
    });
 
        }

  
        