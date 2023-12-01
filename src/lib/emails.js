import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config({ path: "src/.env"})

const emailRegister = async (userData) => {
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const {name, email, token} = userData;

    await transport.sendMail({
        from: "no-replay@RealState220875",
        to: email,
        subject: "Welcome to RealState - 220875 - Confirm your account",
        text: `Thanks you for chosing us, in our plataform, you could sell and buy properties, to continue please follow confirmato link below:`,
        html: `<title style="text-color: #048a81;">Real Estate</title>
        <img src="https://th.bing.com/th/id/R.1dba9de11d6276edce7645b49ad48e07?rik=We6iqIJqeAvRCw&pid=ImgRaw&r=0" style="max-width: 20%; display: block;
        margin: 0 auto;">
        <div style="background: #048a81">
        <p style="font-size: 16px; font-family: Arial, sans-serif; text-align: center; text-color: #048a81">Hola, ${name}</p>
    <p style="font-size: 16px; font-family: Arial, sans-serif">Tu cuenta está casi activa. Por favor, sigue el enlace de activación a continuación:</p>
    <p style="font-size: 16px; font-family: Arial, sans-serif;"><a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}" style="text-decoration: none;">Haz clic aquí para activar tu cuenta.</a></p>
    <p style="font-size: 16px; font-family: Arial, sans-serif;">Si no creaste esta cuenta, simplemente ignora este correo electrónico.</p>
    <br>
    <p style="font-size: 16px; font-family: Arial, sans-serif; text-align: center;">Yulissa Ortega Cuevas <br> 220875</p>
    <img src="https://th.bing.com/th/id/R.d4a2f0bf12b2311fffae87985998286f?rik=vbmJyB%2bHZxjXiA&pid=ImgRaw&r=0" style="display: block;margin: 0 auto;max-width: 20%;" 
    
    <footer style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="display: flex;">
    <img src="https://i.pinimg.com/474x/c7/6b/3f/c76b3f38a6b60c338d6534b4eacc9af2.jpg" style="max-width: 4%;">
    <span>Yulissa Ortega Cuevas</span>
</div>
        <div style="display: flex; align-items: center;">
            <img src="https://th.bing.com/th/id/OIP.Mmg3KjhevkKKzjUDsIr8xAHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" style="max-width: 6%;">
            <span>+52 7461107872</span>
        </div>
        <div style="display: flex; align-items: center;">
            <img src="https://th.bing.com/th/id/OIP.xSWdOXnT-Fw10DZLWBnfmAHaHa?pid=ImgDet&w=474&h=474&rs=1" style="max-width: 5%;">
            <span>ortegayulissa423@gmail.com</span>
        </div>
        <div style="display: flex; align-items: center;">
            <img src="https://th.bing.com/th/id/R.5306cc63b0cf31fe9599bf9b88c2cb03?rik=bJ4uJOnt7jp15A&pid=ImgRaw&r=0" style="max-width: 4%;">
            <span>Universidad Tecnológica de Xicotepec de Juárez Avenida Universidad Tecnológica No. 1000, Colonia Tierra Negra, Xicotepec, Puebla, C.P. 73080</span>
        </div>
    </div>
</footer>
</div>`
    });
    console.log(`########## Mailtrap ##########\n Se esta intentando enviar un correo electrónico al usuario: ${email}, con el token de validación: ${token} \n ##################`);
};

const emailResetPassword = async (userData) => {
    const {name, email, tokenPassword} = userData;

    await transport.sendMail({
        from: "220875@utxicotepec.edu.mx",
        to: email,
        subject: "Welcome to RealState - 220875 - Reset your Password",
        text: `We have recieved your password change request, please follow the link below.`,
        html: `<div class="background-color: red;">
                <p>Hello, ${name}, you are changing your password account on RealState.com</p>
                <p>Please follow the reset password link below: <a target="_blank" href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/password-change/${tokenPassword}" >Click Here to Change your Password.</a></p>
                <p>If you didnt request a password recovery just ignore this email.</p>
            </div>`
    });
    console.log(`########## Mailtrap ##########\n Se esta intentando enviar un correo de cambio de contraseña al usuario: ${email}, con el token de validación: ${tokenPassword} \n ##################`);
};


export {
    emailResetPassword, emailRegister
};