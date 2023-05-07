$(document).ready(function(){
    let  todoList = ['Cook some rice','Prepare stew'];

    $('#new-input').on('keypress',function(e){
        e.preventDefault();
        if(e.which == 13){
            const enteredValue = this.value;
            todoList.push(enteredValue);
            setHtml();
        }
    })

    function setHtml(){
        let text = '';
        todoList.forEach((val,index)=>{
            text += `
            <div class="todo-item" id="todo-item-${index}">
              <div class="check">
                <div class="check-mark">
                  <img src="./images/icon-check.svg" alt="check-icon">
                </div>
              </div>
              <div class="todo-texts">
               ${val}
              </div>
            </div>` 
        });
        debugger;
    
        $('#todo-items').html(text);
    
    }
   
})

