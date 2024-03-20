import React, { useState } from "react"

function App() {
    const [image, SetImage] = useState("")
    const submitImage = () =>
    {
        const data = new FormData()
        data.append("file", pics);
        data.append("upload_preset", "chat-connect");
        data.append("cloud_name", "dbpapoto6");
        fetch("https://api.cloudinary.com/v1_1/dbpapoto6/image/upload", {
            method: "post",
            body: data,
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div>
                <div>
                    <input type="file" onChange={(e)=>SetImage(e.target.files[0])}></input>
                    <button onClick={submitImage}>Upload</button>
                </div>
            </div>
        </>
    )
}