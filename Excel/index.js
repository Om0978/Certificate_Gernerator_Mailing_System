const reader = require("xlsx")
const express = require("express")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const excelData = require("./Model/userModel")
const getData = require("./Controller/getData")
const app = express()
const ejs = require('ejs')
const puppeteer = require('puppeteer')
const fs = require('fs')
const {sendEmail} = require('./Controller/sendEmail')

app.use(express.json());

app.set('view engine','ejs');



// database ko connect kiya hai ---------
const db = require("./middlewares/db");
db.connecttoDB();
// --------------------------------------





// ----- Data ko email pr send krne ke liye ye code hai
app.post('/home',async(req,res)=>{
  const users = await excelData.find({}, 'name email');
  console.log(users);
  // const name="content";

for(const user of users){
  const { name, email } = user;
  // console.log(name+" "+email);
  const ejsFilePath = "views/certificate.ejs";

  const fileRead=fs.readFileSync(ejsFilePath,"utf-8");

  const html=ejs.render(fileRead,{name:name});

  const browser=await puppeteer.launch({headless:"new"});

  const page=await browser.newPage();

  await page.setContent(html);

  const pdfBuffer=await page.pdf({format:"A4"});

  await browser.close();

  await sendEmail(name,email,`${name}.pdf`,pdfBuffer);
 }

  res.send({success: true, message: 'Email sent successfully!'});

})

//  ------------------------------------------------------------





// -- 
app.post('/upload', upload.single("file"), (req, res) => {
  const file = reader.readFile("./uploads/" + req.file.filename);

  getData.getExcelData(file)
    .then(() => {
      res.json({ message: "File uploaded successfully!" });
    })
    .catch((err) => {
      res.json({ err: "Failed!" });
    })
});


app.listen(4000,
  console.log("server start on port 4000")
);
