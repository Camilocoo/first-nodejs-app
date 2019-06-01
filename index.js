const express = require("express");
const Joi = require('@hapi/joi');

const app = express();

app.use(express.json());

const courses=[
    {id:1, name:"course 2"},
    {id:2, name:"course 2"},
    {id:3, name:"course 2"}
]

app.get("/",(req,res)=>{

    res.send("hello world");

});

app.get("/api/courses",(req,res)=>{
    res.send(courses);
})


//POST
app.post('/api/courses',(req,res)=>{

    const { error } = validateCourse(req.body);


    if(error)return res.status(400).send(result.error.details[0].message);
        
    
    
   
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find((c)=>c.id===parseInt(req.params.id));
    if(!course)res.status(404).send("the course id was not found");
    res.send(course);
})

//PUT 

app.put("/api/courses/:id",(req,res)=>{
    // lookk up the course 
    const course = courses.find((c)=>c.id===parseInt(req.params.id));
    if(!course)return res.status(404).send("the course id was not found");

    //if not existing 

    //validate
    
    
    const { error } = validateCourse(req.body);


    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

   //update coourse 

   course.name = req.body.name; 
   res.send(course);
});

function validateCourse(course){
    const schema ={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema)
}

// Delete request 

app.delete("/api/courses/:id",(req,res)=>{
    //look up the course
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if (!course)res.status(400).send("the course with the given id was not found ")
    //delete
    let index = courses.indexOf(course);
    courses.splice(index,1);


    //return the same course 

    res.send(course);


});

//PORT

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}....`));


