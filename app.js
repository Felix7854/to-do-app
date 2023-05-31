$(document).ready(function(){
  let oldData = [];
  let showOldData = false;
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
      // debugger;
      event.preventDefault();
     setHtml();
    });
   
    $('body').on('mouseleave','.todo-item',function(event) {
      $('.remove-item').css('display','none');
      event.preventDefault();
    });

      $('body').on('click', '.remove-item', function() {
        let checkMarkId = $(this).attr('id');
        let getId = parseInt(checkMarkId);
        const getItemIndex = todoList.findIndex(val => val.id === getId);

        if (getItemIndex !== -1) {
          todoList.splice(getItemIndex, 1);
          setHtml();
        }
      });

      $('body').on('click', '.switch', function() {
        $('body').toggleClass('light-mode');
          let logoSrc = $('#switch').attr('src');
          if(logoSrc === './images/icon-sun.svg') {
            $('#switch').attr('src', './images/icon-moon.svg'); 
          }else {
            $('#switch').attr('src', './images/icon-sun.svg'); 
          }
          
          setHtml();
      });

      $('.btnCompleted').on('click',function(){
         showOldData = true;
          oldData = todoList.filter(obj => {
            return obj.selected === true;
          });
          setHtml();
      });

      $('.btnActive').on('click',function(){
        showOldData = true;
          oldData = todoList.filter(obj => {
            return obj.selected === false;
          });
          setHtml();
     });

      $('.btnAll').on('click',function(){
        showOldData = false;
         setHtml();
     })

      $('.btnClearCompleted').on('click',function(){
        showOldData = false;
        todoList = todoList.filter(obj => {
          return obj.selected === false;
        });
        setHtml();
     })

    function setHtml(){
      let results = [];
      if(showOldData) {results = oldData}else{results = todoList};
        let text = '';
        results.forEach((val,index)=>{
          let determiner = '';
          let strike = '';
          let checkMark = '';
          if(val.selected === true) {
            determiner = 'completed';
            strike = 'strike-through';
            checkMark = 'showCheck';
          };
            text += `
            <div class="todo-item" id="todo-item-${val.id}">
              <div class="check">
                <div class="check-mark ${determiner}" id="check-mark-${val.id}">
                  <img src="./images/icon-check.svg" alt="check-icon" class="${checkMark}">
                </div>
              </div>
              <div class="todo-texts ${strike}">
               ${val.description}
              </div>
              <div class="remove-item" id="${val.id}"><img src="./images/removeButton.png"></div>
            </div>` 
        });
        // debugger;

        const itemsCompleted = todoList.filter(item => item.selected === false);

        $('#itemLeft').html(itemsCompleted.length);
    
        $('#todo-items').html(text);
    
    }

    function clearInput(){
      $('#new-input').val('');
    }
})

