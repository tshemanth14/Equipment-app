const express=require('express');
const cors=require('cors');
const app=express();
const mysql=require('mysql2')

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'Hemanth@03',
    database:'equipment_db'
})

db.connect((err)=>{
    if(err){
        console.log("error with db");
        return
    }
    console.log("connected")
});
app.post('/api/addequipment',(req,res)=>{

    const {name,type,status,lastcleandate}=req.body;

    const sql="insert into equipmentTable(name,type,status,lastcleandate) values(?,?,?,?)";

    db.query(sql,[name,type,status,lastcleandate],(err)=>{
        if(err){
            console.log(err);
            return
        }
        console.log("data success");
        res.send("Inserted Successfully");
    })
    // db.query(`insert into equipmentTable values('${req.body.name}','${req.body.type}','${req.body.status}','${req.body.lastcleandate}')`,(err,result)=>{
    //     if(err){
    //         console.log(err);
    //         return
    //     }
    });

app.get('/api/equipment',(req,res)=>{
    const sql="select * from equipmentTable";
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err);
            return
        }
        res.send(result);
        console.log("Data fetched Successfully");
    })
})

app.get('/api/equipment/:id',(req,res)=>{
    const id=req.params.id;
    const sql="select * from equipmentTable where id=?";
    db.query(sql,[id],(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(data);
        res.send(data);
    })
})

app.put('/api/equipment/:id',(req,res)=>{

    const id=req.params.id;
 
    const {name,type,status,lastcleandate}=req.body;

    const sql="update equipmentTable set name=?,type=?,status=?,lastcleandate=? where id=?";
    db.query(sql,[name,type,status,lastcleandate,id],(err)=>{
        if(err)
        {
            console.log(err);
            return
        }
        console.log("updated Successfully");
        res.send("Updated Successfully");
    })
})

app.delete('/api/deleteequipment/:id',(req,res)=>{
    const sql="delete from equipmentTable where id=?"
    db.query(sql,[req.params.id],(err)=>{
        if(err)
        {
            console.log(err);
            return
        }
        console.log("Deleted successfully");
        res.send("Deleted");
    })
})

app.listen(3001,()=>{
    console.log("Server started");
})