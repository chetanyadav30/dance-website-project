const express=require('express');
const path=require('path');
const app=express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true,  useUnifiedTopology: true });
const port=80;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
  });

  const Contact = mongoose.model('Contact', ContactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('this is saved')
    }).catch(()=>{
        res.status(400).send('could not save to db')
    });
    // res.status(200).render('contact.pug');
});

app.listen(port,()=>{
    console.log(`the app starts at port ${port}`);
});