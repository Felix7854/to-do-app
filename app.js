$(document).ready(function(){
    let  todoList = [
      { id:1,
        description:'Cook Well',
        selected:false,
        completed:false,
      },
      { id:2,
        description:'Cook Well',
        selected:false,
        completed:false,
      }
    ];
    // let selectedItem;
    setHtml();
    $('body').on('keypress','#new-input',function(event){
        if(event.which == 13){
            const enteredValue = this.value;
            const newObject = {
              id:Math.floor(Math.random() * (50000 - 200) + 200),
              description:enteredValue,
              selected:false,
              completed:false,
            };
            todoList.push(newObject);
            setHtml();
            clearInput();
            event.preventDefault();
        }
    })

    $('body').on('mouseenter','.todo-item',function(event) {
      let itemIndex = $(this).attr('id');
      let currentIndex = itemIndex.split("-")[2];
      $(`.todo-item > #${currentIndex}`).css('display','block');
      event.preventDefault();
    })
   
    $('body').on('click','.check-mark',function(event) {
     let checkMarkId = $(this).attr('id');
     let getId = parseInt(checkMarkId.split('-')[2]);
     const getItemIndex = todoList.findIndex(val => val.id === getId);
     todoList[getItemIndex].selected = !todoList[getItemIndex].selected;
     setHtml();
    })
   
    $('body').on('mouseleave','.todo-item',function(event) {
      $('.remove-item').css('display','none');
      event.preventDefault();
    })

    $('').on('click','.remove-item', function(event) {
      let id = $(this).attr('id');
      todoList.splice(id, 1);
      setHtml();
    })

    function setHtml(){
        let text = '';
        todoList.forEach((val,index)=>{
          let determiner = '';
          let strike = '';
          if(val.selected === true) {
            determiner = 'completed';
            strike = 'strike-through';
          };
            text += `
            <div class="todo-item" id="todo-item-${val.id}">
              <div class="check">
                <div class="check-mark ${determiner}" id="check-mark-${val.id}">
                  <img src="./images/icon-check.svg" alt="check-icon">
                </div>
              </div>
              <div class="todo-texts ${strike}">
               ${val.description}
              </div>
              <div class="remove-item" id="${val.id}"><img src="./images/removeButton.png"></div>
            </div>` 
        });
        // debugger;

        console.log(todoList);

        $('#itemLeft').html(todoList.length);
    
        $('#todo-items').html(text);
    
    }

    function clearInput(){
      $('#new-input').val('');
    }
})

