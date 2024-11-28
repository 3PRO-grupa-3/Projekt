// "use client"
// import { pocketbase } from "@/lib/pocketbase";
// import { useEffect, useState } from "react";

// export async function getZbiorkiData(){

//     const [data,setData] = useState(null)

//     useEffect(()=>{
//         const getData = async () => {
//             try {
//                 const record = await pocketbase.collection('Zbiorki').getFullList({
//                     sort: '-someField',
//                 });
//                 setData(record)
//                 console.log(data)
//                 return(<h1>test dataacces</h1>)
//               } catch (error) {
//                 throw new Error(error)
//               }
//         }
//     },[])
// }