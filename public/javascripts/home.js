let form=document.querySelector("#changePhoto");
/*let formFile=document.querySelector("#file");*/
let formFile=form.elements['file'];
let img=document.querySelector("#homeImg");

     formFile.addEventListener("change",()=>{

         let url =URL.createObjectURL(formFile.files[0]);
    img.src=url
 });


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let formData =new FormData();

    let imgFile=formFile.files[0];

    formData.append("fileField",imgFile);

    if(!!formData.get("fileField")){
    fetch("/changePhoto",{
        method:"POST",
        body:formData,
    }).then(res=> res.json())
        .then(result=>{

           // console.log('image path',result);
            form.reset();
            img.src='/images/'+result;
            // alert(result);

        }).catch(error=>{
        console.log('Error:',error);
    });
    }

});

//aupload end