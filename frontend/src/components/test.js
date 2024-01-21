const a=[3,4,2,1,44,56,67]

const run =()=>{
    if(a.some(i=>(i===59))){
        console.log("found")
    }
    else{
        console.log("not found");
    }
}
run()