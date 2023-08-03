import { Http } from "./http.class.js";


const custom = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const http = new Http(custom);
    let hReq = http.request();
    let checker = true;

    
    
   function crt(){
        if(checker){
            checker = false;
            hReq.then((value) => {
                for(let i=0; i<value.length; i++){
                    const btnLoad = document.getElementById("btnLoad");
                    const container = document.getElementById('container');
                    const newBtn = document.createElement("button");
                    const newUl = document.createElement('ul');
                    const div = document.createElement('div');
                    let jasData = value[i].text;
                    newBtn.className = "mainBtn" + " " + value[i].id;
                    newUl.className = "mainList" + " " + value[i].id;
                    div.className = "mainDiv" + " " + value[i].id;
                    div.appendChild(newBtn);
                    div.appendChild(newUl);
                    container.append(div);
                    newUl.innerHTML = value[i].id + "  " + jasData;
                    btnLoad.innerHTML = "-";
                    
                    
                   
                    if(value[i].children){
                        
                        newBtn.innerHTML = "+";
                        newBtn.addEventListener('click',() =>{
                            
                            if(newBtn.innerHTML != "-"){
                                
                                for(let j=0; j<value[i].children.length; j++){
                                    const newBtn2 = document.createElement("button");
                                    const newUl2 = document.createElement('ul');
                                    const div2 = document.createElement('div');
                                    
                                    newUl2.innerHTML = value[i].children[j].text
                                    newBtn2.className = "childBtn" +" "+ value[i].id;
                                    newUl2.className = "childList" +" "+ value[i].id;                                  
                                    div2.className = "childDiv" +" "+ "childDiv2";
                                    
                                    
                                    div2.appendChild(newBtn2);
                                    div2.appendChild(newUl2);
                                    div.append(div2);
                                    newBtn.innerHTML = "-";
                                
    
                                if(value[i].children[j].children){
                                    newBtn2.innerHTML = "+";
                                    div2.className = "childrenDiv";
                                    newBtn2.addEventListener('click',() =>{
                                    if(newBtn2.innerHTML != "-"){
                                        for(let l=0; l<value[i].children[j].children.length; l++){
                                            const newBtn3 = document.createElement("button");
                                            const newUl3 = document.createElement('ul');
                                            const div3 = document.createElement('div');
                                            newUl3.innerHTML = value[i].children[j].children[l].text
                                            newBtn3.className = "childBtn2" +" "+ value[i].id;
                                            newUl3.className = "childList2" +" "+ value[i].id;
                                            div3.className = "children" +" "+ value[i].id;
                                            div3.appendChild(newBtn3);
                                            div3.appendChild(newUl3);
                                            div2.append(div3)
                                            newBtn2.innerHTML = "-";
                                            newBtn3.innerHTML = "-";
                                        }
                                    }else{
                                        newBtn2.innerHTML = "+";
                                        
                                        const childrenDiv = document.getElementsByClassName("children")
                                        const childrenLen = childrenDiv.length;
                                        for(let i = 0; i<childrenDiv.length + 1; i++){
                                        
                                        childrenDiv[0].remove(childrenLen)

                                     }

                                        
                                    }
                                    });
                                    
    
                                }else{
                                    newBtn2.innerHTML = "-";
                                    
                                }
                                
    
                            }                                                        
                                

                            
                        } else{

                                newBtn.innerHTML = "+";
                                const childDv= document.getElementsByClassName("childDiv");
                                const childLeng = childDv.length;
                                for(let i = 0; i<childDv.length + 1; i++){
                                    childDv[0].remove(childLeng)
                                }

                      }
                        })
                    }else{
                        newBtn.innerHTML = "-";
                        
                    }
                    
                }    
            });

        }else{
            checker = true;
            const btnLoad = document.getElementById("btnLoad");
            const lis = document.getElementsByClassName('mainDiv');
            btnLoad.innerHTML = "+";
            let liLength = lis.length
            for (let i = 0; i < liLength; i++) {
                lis[0].remove(lis);
            }

        }

    }
    
    
  

    const btn = document.getElementById("btnLoad");
    btn.addEventListener('click',crt);









    
    


