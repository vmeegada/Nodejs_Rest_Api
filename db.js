const sql=require('mysql2')

const con = sql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Vasavi#1998",
        database:"mobileinfo"
    }
)



function getMobiles(){

    return new Promise(function(success,reject){
        con.query(` select * from mobiles`,function(err,rows,columns){
                    if(err){
                        reject("error")}
                    else{
                       success(rows);
                       // console.log(columns)
                    } 
                })

    })

//  it is a async operation  function so we write promosis
//   con.query(` select * from mobiles`,function(err,rows,columns){
//         if(err){console.log("error")}
//         else{
//             console.log(rows);
//            // console.log(columns)
//         }
//     })
//    con.end()
}




function getMobiles1(id){
    return new Promise(function(success,reject){
        con.query(`select * from mobiles where id= ?`,[id],function(err,rows,columns){
                    if(err){
                        reject(500)}
                    else{
                       success(rows);
                       // console.log(columns)
                    } 
                })
            })

}
function  addMobiles( n,p,r,s){

    return new Promise(function(success,reject){
        con.query(' INSERT INTO mobiles (name,price,ram,storage) VALUES (?,?,?,?)',[n,p,r,s],function(err,res){
                    if(err){
                        reject("error")}
                    else{
                       success(res);
                    
                    } 
                })
            })
//     console.log(`${n},${p},${r},${s}`)
//     con.query(
//        ' INSERT INTO mobiles (name,price,ram,storage) VALUES (?,?,?,?)',[n,p,r,s],

//     function(err,res){
//         if(err){
//             console.log("error");
// }
//         else{
//             console.log(res)
//         }
//     })
}
//addMobile("samsug",10000,"9 gb"," 6gb");

function updateMobiles(id, n, p, r, s) {

    return new Promise(function(success,reject){
        con.query('UPDATE mobiles SET name=?, price=?, ram=?, storage=? WHERE id=?',
        [n, p, r, s, id],function(err,res){
                    if(err){
                        reject("error")}
                    else{
                       success(res);
                    
                    } 
                })
           })
    // con.query(
    //     'UPDATE mobiles SET name=?, price=?, ram=?, storage=? WHERE id=?',
    //     [n, p, r, s, id],
    //     function (err, res) {
    //         if (err) {
    //             console.log("Error:", err);
    //         } else {
    //             console.log(res);
    //         }
    //     }
    // );
}

function deleteMobiles(id){
    return new Promise(function(success,reject){

        getMobiles1(id) .then((rows)=>{
            if(rows.length > 0){
                con.query( 'DELETE FROM mobiles WHERE id=?',
                [id],function(err,res){
                            if(err){
                                reject("error")}
                            else{
                               success(res);
                            
                            } 
                        })
            }
            else {
                reject(404)
            }
        }).catch(()=>{})
        
            })

    // con.query(
    //     'DELETE FROM mobiles WHERE id=?',
    //     [id],
    //     function(err,res){
    //         if(err){
    //             console.log("error");
    // }
    //         else{
    //             console.log(res)
    //         }
    //     }
    // )
}

module.exports={getMobiles,addMobiles,updateMobiles,deleteMobiles}