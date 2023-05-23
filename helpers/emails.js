
import nodemailer from 'nodemailer'


 const emailRegistro = async (datos) =>{
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const {email, nombre, token} = datos

        //enviar el email confirmar cuenta registro
       await transport.sendMail({
            from: 'consultorioMedico.com',
            to: email,
            subject: 'Confirma tu cuenta en consultorioMedico.com',
            text:'Confirma tu cuenta en consultorioMedico.com',
            html: `
            
                <p>Hola ${nombre}, comprueba tu cuenta en consultorioMedico.com </p>

                <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 5000}/auth/confirmar/${token}">Confirmar Cuenta</a> </p>
                <p>IMPORTANTE UNA VEZ CONFIRME SU CUENTA RESTABLECE SU PASSWORD INGRESANDO AL ENLACE OLVIDE MI PASSWORD

                <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            
            `
        })        

}


const emailRegistroMedico = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    
    const {email, nombre, token} = datos

    //enviar el email confirmar cuenta registro
   await transport.sendMail({
        from: 'consultorioMedico.com',
        to: email,
        subject: 'Confirma tu cuenta en consultorioMedico.com',
        text:'Confirma tu cuenta en consultorioMedico.com',
        html: `        
            <p>Hola ${nombre}, Bienvenido comprueba tu cuenta en consultorioMedico.com </p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 5000}/auth/confirmar-cuenta-medico/${token}">Confirmar Cuenta</a> </p>
            <p>IMPORTANTE UNA VEZ CONFIRME SU CUENTA RESTABLECE SU PASSWORD INGRESANDO AL ENLACE OLVIDE MI PASSWORD

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        
        `
    })     

}

//
const emailRegistroAdmin = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    
    const {email, nombre, token} = datos

    //enviar el email confirmar cuenta registro
   await transport.sendMail({
        from: 'consultorioMedico.com',
        to: email,
        subject: 'Confirma tu cuenta en consultorioMedico.com',
        text:'Confirma tu cuenta en consultorioMedico.com',
        html: `        
            <p>Hola ${nombre}, Bienvenido comprueba tu cuenta en consultorioMedico.com </p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 5000}/auth/confirmar-cuenta-admin/${token}">Confirmar Cuenta</a> </p>
            <p>IMPORTANTE UNA VEZ CONFIRME SU CUENTA RESTABLECE SU PASSWORD INGRESANDO AL ENLACE OLVIDE MI PASSWORD

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        
        `
    })     

}


const olvidePasswordUsuario = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    
    const {email, nombre, token} = datos

    //enviar el email confirmar cuenta registro
   await transport.sendMail({
        from: 'consultorioMedico.com',
        to: email,
        subject: 'Restablece tu password en consultorioMedico.com',
        text:'Restablece tu password en consultorioMedico.com',
        html: `
        
            <p>Hola ${nombre}, Has solicitado restablecer su password en consultorioMedico.com </p>

            <p>Sigue el siguiente enlace para generar un password nuevo: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 5000}/auth/olvide-password-usuario/${token}">Restablecer Password</a> </p>

            <p>Si tu no solicitaste el cambio del password, puedes ignorar el mensaje</p>
        
        `
    }) 
    
}


const olvidePasswordMedico = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    
    const {email, nombre, token} = datos

    //enviar el email confirmar cuenta registro
   await transport.sendMail({
        from: 'consultorioMedico.com',
        to: email,
        subject: 'Restablece tu password en consultorioMedico.com',
        text:'Restablece tu password en consultorioMedico.com',
        html: `
        
            <p>Hola ${nombre}, Has solicitado restablecer su password en consultorioMedico.com </p>

            <p>Sigue el siguiente enlace para generar un password nuevo: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 5000}/auth/olvide-password-medico/${token}">Restablecer Password</a> </p>

            <p>Si tu no solicitaste el cambio del password, puedes ignorar el mensaje</p>
        
        `
    })     

}


const olvidePasswordAdmin = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    
    const {email, nombre, token} = datos

    //enviar el email confirmar cuenta registro
   await transport.sendMail({
        from: 'consultorioMedico.com',
        to: email,
        subject: 'Restablece tu password en consultorioMedico.com',
        text:'Restablece tu password en consultorioMedico.com',
        html: `
        
            <p>Hola ${nombre}, Has solicitado restablecer su password en consultorioMedico.com </p>

            <p>Sigue el siguiente enlace para generar un password nuevo: <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 5000}/auth/olvide-password-admin/${token}">Restablecer Password</a> </p>

            <p>Si tu no solicitaste el cambio del password, puedes ignorar el mensaje</p>
        
        `
    })     

}



export{
    emailRegistro,
    emailRegistroMedico,
    emailRegistroAdmin,
    olvidePasswordUsuario,
    olvidePasswordMedico,
    olvidePasswordAdmin
}
