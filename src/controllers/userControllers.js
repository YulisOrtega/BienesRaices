import { request, response } from "express";
import User from "../models/User.js";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import { generateID, jwtToken } from "../lib/tokens.js";
import { emailRegister} from "../lib/emails.js";
import { emailResetPassword } from "../lib/emails.js";
import { json } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({ path: "src/.env" })

//const userControllers = {};
const formlogin  = (request, response)=>{
    response.render("auth/login.pug",{
        showHeader:false,
        page : "Login",
        isLogged: false
    });
    }

const formRegister  = (request, response)=>{
    response.render("auth/register.pug", {
        page : "Creating New Account",
        isLogged:true
    });
    }

    const formPasswordRecovery  = (request,response)=>{
        response.render("auth/recovery.pug", {
            page : "Password Recovery",
            isLogged:true
        })
    }

    const message  = (request,response)=>{
        response.render("auth/message.pug", 
        {
            page : "User created"
        })
    }
    
    const insertUser= async(request,response)=>{
       console.log("El usuario esta intentando registrar sus datos en la base de datos");
       console.log(`Nombre: ${request.body.name}`);
      
       //validaciones
       await check("name").notEmpty().withMessage("Name field requiere").run(request)//verifica los datos

       await check("email").notEmpty().withMessage('Email field is required').isEmail().withMessage('This field should be an Email (user@domain.ext) and not empty').run(request);//verifica los datos

        //validate min and max password
       await check("password").notEmpty().withMessage("Password field is requiere").isLength({min:8}).withMessage("Password must contain at least of 8 characteres").isLength({max:20}).withMessage("Password must contain at least than 20 characteres").equals(request.body.repeatpassword).withMessage("Bot password must be the same").run(request);

       let resultadoValidacion = validationResult(request);

       //validacion de emails duplicados
       if (resultadoValidacion.isEmpty()){
        //desestructuración de un objeto: Body
       const {name, email, password} = request.body;
       const token = generateID();
       console.log(`Intentando insertar al usuario: ${name}, con correo electrónico: ${email}, password: ${password} y token: ${token}`);

        const userExists = await User.findOne({where: {email: email}})
        console.log(userExists);
        
        if (userExists){
            return response.render("auth/register.pug", {
                page : "Creating new account",
                errors: [{'msg': `The user with: ${email} already exists.`}],
                user: {
                    name: request.body.name,
                    email: request.body.email
                }
            });
           } else{
            const newUser = await User.create({
                name,
                email,
                password,
                token
            });
            //Sending confirmation email
            emailRegister({
                name,
                email,
                token
            })
            
            //response.render("auth/message.pug");
            response.render('templates/messages.pug', {page: "User Created Succeseful", message: `We have send you an email to: ${email}, please verify your account`, type:"Information"})  
           }
        } else {
        return response.render("auth/register.pug", {
            page : "Creating new account",
            errors: resultadoValidacion.array(),
            user: {
                name: request.body.name,
                email: request.body.email
            }
        });
       }
    }

    const confirmAccount = async (request, response, next) =>{
        //Get token of URL (request)
        const {token} = request.params;
        //verify if token already exists
        let userToken = await User.findOne({ where: {token}});
        if (!userToken){
            console.log(`This token is invalid`);
            response.render("templates/messages", { 
                page: "Error in validation process",
                message: "The token is invalid",
                notificationTitle: "The token is invalid ",
                notificationMessage: "The token is invalid ",
                type:"Error"
            })
        } else {
            console.log(`This token is valid`);
             //Actualizar el status de verificacion den la BD.
             userToken.verified=true;
             // Eliminar el token
             userToken.token=null;
             userToken.save();
             // Pintar la página de respuesta
             response.render("templates/messages.pug", { 
                page: "Validation Complete",
                message: "Your account has beein confirmed",
                type:"Information"
            })
        }
    }

    const resetPassword= async (request, response)=>{
        await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(request);

        let resultadoValidacion = validationResult(request);
      
        // Validar la existencia del usuario a tráves del Email
        const { email } = request.body;
        const userExists = await User.findOne({ where: { email } });
      
        // Validar que result no tenga errores
        if (resultadoValidacion.isEmpty()) {
          // Validar que el correo exista
          if (!userExists) {
            // Página de error
            console.log(`El usuario con correo ${email}`);
            response.render('templates/messages.pug', {
              page: "Recovery Password",
              notificationTitle: `Error Email not Found`,
              notificationMessage: "The token is invalid ",
              type: "Error"
            })
          } else {
            const tokenPassword = generateID();
            userExists.token = tokenPassword;
            userExists.save();
      
            emailResetPassword({
              email,
              tokenPassword
            })
            console.log(`El usuario con correo ${email}`);
            response.render('templates/messages.pug', {
              page: "Recovery Password",
              notificationTitle: ` Email Found`,
              notificationMessage: "The  is invalid ",
              type: "Information"
            })
      
          }
        } else {
          return response.render("auth/recovery.pug", {
            page: `Recovery Password`,
            errors: result.array(),
            //! Sending params to pug 
            user: {
              email: request.body.email
            }
          });
        }
      }
      
      const changePassword = async (request, response) => {
        const { tokenPassword } = request.params;
      
        // Verify if token already exists
        let userToken = await User.findOne({ where: { token: tokenPassword } });
        // TODO: Paginas de respuesta
        if (!userToken) {
          console.log(`This token is invalid `);
          response.render('templates/messages.pug', {
            page: "Error in Validation Process",
            notificationTitle: "The token is invalid ",
            notificationMessage: "The token is invalid ",
            type: "warning"
          })
        } else {
          response.render("auth/password-change.pug", {
            page: `Change Password`,
            tokenPassword: tokenPassword
          });
        }
      }
      
      const updatePassword = async (request, response) => {
        const { tokenPassword } = request.params;
        const {newPassword} = request.body;
      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
      
        // Verify if token already exists
        let userToken = await User.findOne({ where: { token: tokenPassword } });
        if (!userToken) {
          console.log(`This token is invalid `);
          response.render('templates/messages.pug', {
            page: "Error in Validation Process",
            notificationTitle: "The token is invalid ",
            notificationMessage: "The token is invalid ",
            type: "Warning"
          })
        } else {
          console.log(`Intentando actualizar la contraseña en la bd`);
          userToken.token = null;
          userToken.password = hashedPassword;
          userToken.save();
          response.render('templates/message.pug', {
            page: "Error in Validation Process",
            notificationTitle: "Change Password Success ",
            notificationMessage: "The token is invalid ",
            type: "Information"
          })
        }
      
      }

      const authenticateUser = async (request, response)=>{
        //validar todos los datos del formulario
      await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(request);
      await check("password").notEmpty().withMessage("Password field is requiere").isLength({
          min:8, 
          max:20}).withMessage("The password is formed 8 and 20 characteres").run(request);

      //desestructuración de los datos de body(formulario)
      const {email, password} = request.body;

      let resultadoValidacion = validationResult(request);

      console.log(`El usuario ${email} esta intentando autenticarse`)

        if (resultadoValidacion.isEmpty()) {
        //TODO: Validar el correo electronico
        const userExists = await User.findOne({where: {email}})

        // Validar que el correo exista
        if (!userExists) {
          // Página de error
          response.render('templates/messages.pug', {
            page: "Error in login",
            notificationTitle: `Error Email not Found`,
            notificationMessage: `The user with email: ${email} do not exist`,
            type: "Error"
          })
        }else{
          //validar que el usuario este validado
          if (!userExists.verified) {
            // Página de error
            console.log(`El usuario con correo ${email}`);
            response.render('templates/messages.pug', {
              page: "Error in login",
              notificationTitle: `Account is not validate`,
              notificationMessage: `The user associated to the email: ${email} is not verified, please check your email.`,
              type: "warning"
            })
        }else{
           //TODO: Validar la contraseña asignada al correo electronico
           if (userExists.verifyPassword(password)){
            // Generar el token de acceso(JWT)
            const token=jwtToken(userExists.id);//enviar userId
            console.log(`JWT generado es ${token}`)
                //TODO: Almacenar el JWT en una cookie
                //TODO: Redireccionar al home

                response.cookie('_token', token,{
                  httpOnly:true,
                  //secure: true, //option to configure https proticol certify
                }).redirect('/home');
                
          }else{
          response.render("auth/login.pug", {
          page: `Login`,
          errors: [{
            msg:`The email or password doesnt match`
          }],
          user: {
            email:request.body.email
          }
        });
      }
    }
  }
       
        
    }else{
      response.render("auth/login.pug", {
        page: `Login`,
        errors: resultadoValidacion.array(),
        //! Sending params to pug 
        user: {
          email: request.body.email
        }
      });
    }
    }
    const homePage=(request, response)=>{
      response.render('user/home.pug', {
        page: 'My Properties',
        showHeader:true,
        user:{
          name: 'Yuli'
        }
      })
    }
    export {formlogin, formRegister, formPasswordRecovery, insertUser, message, confirmAccount, resetPassword, changePassword, updatePassword, authenticateUser, homePage};//message
