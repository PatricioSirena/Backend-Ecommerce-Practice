const transporter = require('./nodemailer')

const userRegistrerMessage = async (nombre, correo) => {
    const info = await transporter.sendMail({
        from: `Bienvenido a nuestra pagina!!, <${process.env.USER_NODEMAILER}>`, // sender address
        to: correo, // list of receivers
        subject: "Hello",
        html: `
        <div style="margin: 0 auto;">
            <img width="100%" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Fvectores-gratis%2Fbienvenida&psig=AOvVaw2N5_wRe81gesCUcNnxbqGL&ust=1721962105286000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjzh--WwYcDFQAAAAAdAAAAABAK" alt="">
        </div>
        <div style="display: flex; justify-content: center; margin-top: 2em;">
            <p style="width: 70%;"">Bienvenido ${nombre}, estamos muy contentos de que te hayas registrado, espero que tenas una excelente experiencia con nosotros, cuaqlueir consulta no dudes en escribirnos, saludos!!</p>
        </div>`
    });
}

module.exports = userRegistrerMessage
