//get list of students and convert to an array so that it can be sliced
const student_list = document.querySelectorAll('li');
const list_items = []
for(var l = 0;l<student_list.length;l++) list_items.push(student_list[l]);

//set constants and variables
const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');
const prevNext_element = document.getElementById('prevNext');
const rows = 6;
const description_element = document.getElementById('pageDescription');

let current_page = 1;
let numButtons = 5;
numButtons--;

let isSearch = false;

//create initial next button
createNext(list_items);

description_element.innerHTML = `<h5>All Students List, Page ${current_page}</h5>`
//*************************************************************************************************************************

//Display paginated items
function DisplayList(items, wrapper, rows_per_page,page) {
    //clear list element
    wrapper.innerHTML = "";
    page--;
    //set the items to be included on the current page
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    //loop through sliced items and add them to the DOM
    for(let i = 0;i < paginatedItems.length; i++){
        let item = paginatedItems[i];
        wrapper.appendChild(item);
    }
}

//*************************************************************************************************************************

//create all of the pagination buttons
function setupPagination(items, wrapper, rows_per_page,page) {
    //clear the pagination element
    wrapper.innerHTML = "";
    //determine the number of pages needed
    let page_count = Math.ceil(items.length / rows_per_page);

    //loop to create buttons with paginationButton function
    if (isSearch){
        for(let i=1; i < page_count +1; i++){
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }else if(page_count - page < numButtons && !isSearch){
        //let diff = page_count - page;
        for(let i=page_count - numButtons; i < page_count+1; i++){
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }else if (page_count - page > numButtons && page != 1 && !isSearch){
        for(let i=page - 1; i < page + numButtons; i++){
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }else if (page == 1 && !isSearch){
        for(let i=1; i < numButtons + 2; i++){
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }else{
        for(let i=page-1; i < page + numButtons; i++){
            let btn = paginationButton(i, items);
            wrapper.appendChild(btn);
        }
    }
    

    //page break / create first/last page buttons
    let pageBreak = document.createElement('br');
    wrapper.appendChild(pageBreak);

    let first_btn = paginationButton(1,items);
    first_btn.innerText = "<";
    first_btn.classList.remove('active');
    let first_txt = document.createElement('span');
    first_txt.innerText = " First ";
    first_txt.style.color = "lightskyblue";
    first_txt.style.fontWeight = "bold";
    first_txt.style.marginRight = "10px";
    wrapper.appendChild(first_btn);
    wrapper.appendChild(first_txt);

    let last_btn = paginationButton(page_count,items);
    last_btn.innerText = ">";
    let last_txt = document.createElement('span');
    last_txt.innerText = " Last ";
    last_txt.style.color = "lightskyblue";
    last_txt.style.fontWeight = "bold";
    last_txt.style.marginLeft = "10px";
    wrapper.appendChild(last_txt);
    wrapper.appendChild(last_btn);   
}

//*************************************************************************************************************************

//create individual page button
function paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    //set the button to active if current page
    if(current_page == page) {
        button.classList.add('active');       
    }

    //button click event
    button.addEventListener('click',function() {
        current_page = page;
        //display new list
        DisplayList(items, list_element, rows, current_page);
    
        if (!isSearch){
            setupPagination(list_items,pagination_element,rows,current_page);
            description_element.innerHTML = `<h5>All Students List, Page ${current_page}</h5>`;
        }else{
            setupPagination(items,pagination_element,rows,current_page);
            description_element.innerHTML = `<h5>Search for ${searchBar.value}</h5>`
        }
        //clear the previous/next button container
        prevNext_element.innerHTML = "";
        //create previous button
        if (current_page > 1){
            let prev_btn = paginationButton(current_page -1,items);
            prev_btn.innerText = "<"
            let prev_txt = document.createElement('span');
            prev_txt.innerText = " Prev ";
            prev_txt.style.color = "lightskyblue";
            prev_txt.style.fontWeight = "bold";
            prev_txt.style.marginRight = "10px";
            prevNext_element.appendChild(prev_btn);
            prevNext_element.appendChild(prev_txt);
        }
        //create next button
        let pages = Math.ceil(items.length / rows)
        if (current_page < pages && pages > 1){
            next_btn = paginationButton(current_page +1,items);
            next_btn.innerText = ">"
            next_txt = document.createElement('span');
            next_txt.innerText = " Next ";
            next_txt.style.color = "lightskyblue";
            next_txt.style.fontWeight = "bold";
            next_txt.style.marginLeft = "10px";
            prevNext_element.appendChild(next_txt);
            prevNext_element.appendChild(next_btn);
        }
        //remove active status from all active buttons
        current_btns = document.querySelectorAll('button.active');
        for (j = 0;j<current_btns.length;j++){
            current_btns[j].classList.remove('active');
        }
        //add active status to all buttons that match the current page
        let allBtns = document.querySelectorAll('button');
        console.log(`Current Page: ${current_page}`);
        console.log(`All btns length: ${allBtns.length}`);
        for(k=0;k<allBtns.length;k++){
            if(allBtns[k].innerText == current_page){
                console.log(allBtns[k].innerText);
                allBtns[k].classList.add('active');
            }
        }
    });
    button.classList.add('btn');
    return button;
}

//*************************************************************************************************************************
function createNext(items){
    let next_btn = paginationButton(current_page +1,items);
    next_btn.innerText = ">";
    let next_txt = document.createElement('span');
    next_txt.innerText = " Next ";
    next_txt.style.color = "lightskyblue";
    next_txt.style.fontWeight = "bold";
    prevNext_element.appendChild(next_txt);
    prevNext_element.appendChild(next_btn);
}
//*************************************************************************************************************************



//display initial list
DisplayList(list_items,list_element,rows,current_page);
//display initial pagination button list
setupPagination(list_items,pagination_element,rows,current_page);
