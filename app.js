$(document).ready(function(){
    let  todoList = ['cook with me'];
    let selectedItem;
    setHtml();
    $('#new-input').on('keypress',function(event){
        
        if(event.which == 13){
            const enteredValue = this.value;
            todoList.push(enteredValue);
            setHtml();
            clearInput();
            event.preventDefault();
        }
    })

    $('.todo-item').hover(function(event) {
      $('.remove-item').css('display','block');
      event.preventDefault();
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
              <div class="remove-item" id="${index}"><img src="./images/removeButton.png"></div>
            </div>` 
        });
        // debugger;

        $('#itemLeft').html(todoList.length);
    
        $('#todo-items').html(text);
    
    }

    function clearInput(){
      $('#new-input').val('');
    }
})

