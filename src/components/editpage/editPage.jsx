const EditPage = () =>{

    return (
        <div className="new">
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>{title}</h1>
            </div>
            <div>
           <button style={{ marginLeft:"76%", backgroundColor:"rgb(0, 119, 255)",height:"35px" }} onClick={sayHello}>Publish</button>        
            <button style={{ backgroundColor:"rgb(0, 119, 255)",height:"35px"}} onClick={sayHelloo}>Save</button>
           </div>
            <div className="bottom">
              <RichEditor
                data={location.state}
                handleUpdate={OnTextChange}
              ></RichEditor>
            </div>
            <button onClick={(event) => onSubmit(event)}>Submit</button>
            <div></div>
          </div>
        </div>
      );
}