var express = require('express')
var EmployeeModel = require('../models/employees')
var employeeRoutes = express.Router();


employeeRoutes.get("/employees", async (req,res)=>{
  try {
    const empList = await EmployeeModel.find()
    res.status(200).send(empList)
  } catch (error) { 
    res.status(404).send(error)
  }
})

employeeRoutes.post("/employees", async (req,res)=>{
  try {
    const newEmp = new EmployeeModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      salary: req.body.salary
    })
    await newEmp.save()
    res.status(201).send(`${newEmp.first_name} was added`)
  } catch (error) {
    res.status(404).send(error)
  }
})
employeeRoutes.get("/employees/:eid", async (req,res)=>{
  try {
    const emp = await EmployeeModel.findById(req.params.eid);
    res.status(200).send(emp.toJSON())
  } catch (error) {
    res.status(404).send("Error Occured")
  }
})
employeeRoutes.put("/employees/:eid", async (req,res)=>{
 try {
  const updatedEmp = await EmployeeModel.findByIdAndUpdate(req.params.eid, 
    {
      ...req.body
    })
    updatedEmp.save()
  res.status(200).send(`Updated Employee`)
  
 } catch (error) {
  res.status(404).send(error)

 }
})
employeeRoutes.delete("/employees", async(req,res)=>{
  try { 
    const emp = await EmployeeModel.findById(req.query.eid);
    if(emp){
      const delEmp = await EmployeeModel.findByIdAndDelete(req.query.eid)
      res.status(204).send("Employee was Deleted")
    }
    else{
      res.status(204).send("Employee Id doesn't exist")
    }
  } catch (error) {
    res.status(404).send("Error Occured")
  }
})

module.exports = employeeRoutes