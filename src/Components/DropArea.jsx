import { useState } from "react"
import "./dropArea.css"

const DropArea = ({onDrop}) => {
    const [showArea, setShowArea] = useState(false)
  return (
        <section 
        onDragEnter={()=>setShowArea(true)} 
        onDragLeave={()=>setShowArea(false)}
        onDrop={()=>{
            onDrop();
            setShowArea(false);
        }}
        onDragOver={e=>e.preventDefault()}
        className={showArea ? "drop_area" : "hide_drop"}>
        <h1 className="font-semibold italic">Drop Here . . .</h1>
    </section> 
  )
}

export default DropArea