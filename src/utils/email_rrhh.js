import { transporter } from "./email_sender.js";
import dotenv from "dotenv";
dotenv.config();

async function sendEmailToRRHH(company = "Varios",project="Varios",date="Varioa",full_name){
    const email = "martinferrarids@gmail.com"
    // Enviar correo a RRHH
    // Email details
    const mailOptions = {
        from: process.env.EMAIL, // Sender address
        to: email, // Receiver email
        subject: "Tarea Finalizada ",
        html: `
    <div style="max-width:600px; font-family:Arial, sans-serif; padding:20px; background:#fff; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      <div style="background:#007bff; color:white; text-align:center; padding:15px; font-size:20px; font-weight:bold; border-radius:10px 10px 0 0;">
        Nueva Exportación de Tarea
      </div>
      <div style="padding:20px; color:#333; font-size:16px; line-height:1.6;">
        <p><strong>Estimados,</strong></p>
        <p><span style="color:#007bff; font-weight:bold;">${full_name}</span> ha exportado la siguiente tarea:</p>
        <p>📌 <strong>Empresa:</strong> <span style="color:#007bff;">${company}</span></p>
        <p>📌 <strong>Proyecto:</strong> <span style="color:#007bff;">${project}</span></p>
        <p>📅 <strong>Fecha:</strong> <span style="color:#007bff;">${date}</span></p>
        <p>Por favor, revisarla a la brevedad.</p>
        
      </div>
      <div style="text-align:center; padding:15px; font-size:14px; color:#555;">
        <p>Este es un mensaje automático, por favor no responder.</p>
      </div>
    </div>
  `,
      };
      await transporter.sendMail(mailOptions);
}

export {sendEmailToRRHH}