var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var cors = require('cors');
const creds = require('./config');

var transport = {
    host: 'mail.smtp2go.com', // Don’t forget to replace with the SMTP host of your provider
    port: 2525,
    auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var phone = req.body.phone
  var content = `name: ${name} \n email: ${email} \n message: ${message} \n téléphone: ${phone}`

  var mail = {
    from: email,
    to: 'dumortier.g@sip.be',  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content,
    attachments: [
      {
        filename: data.title+".jpg",
        contentType:'image/jpg',
        content: new Buffer.from(req.body.image.split('base64,')[1], "base64"),
      }
    ]
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})

const app = express()
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)