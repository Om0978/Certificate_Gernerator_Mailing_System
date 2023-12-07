const reader = require("xlsx");
const excelData = require("../Model/userModel");
exports.getExcelData = async (file) => {
  try {
    //  ye wala excel to json data convert krta hai
    const file = reader.readFile("./Project1.xlsx");
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);

      temp.forEach((res) => {
        data.push(res);
      });
    }


    //  baaki ka code check krta hai ki data file me hai ya nhi

    // await excelData.insertMany(data)
    for (let i = 0; i < data.length; i++) {
      const no_of_trees = data[i].amount / 100;
      const alreadyExist = await excelData.findOne({
        email: data[i].email,
      });
      const temp = {
        name: data[i].name,
        email: data[i].email,
        amount: data[i].amount,
        mobile_no: data[i].mobile_no,
        no_of_trees,
      };
      if (!alreadyExist) {
        const tempData = new excelData(temp);
        console.log(tempData);
        await tempData.save();
      }
    }
  } catch (error) {
    console.log("Error inserting data: ", error.message);
  }
};
