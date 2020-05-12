//list_items is the studend array from main.js

let searchBar = document.getElementById('searchForm');
searchBar.addEventListener('keyup',filterStudents);

function filterStudents(){
    
    let filtered_list = [];
    let filterValue = document.getElementById('searchForm').value.toUpperCase();
    
    if(filterValue != ""){
        isSearch = true;
        current_page = 1
        description_element.innerHTML = `<h5>Search for ${searchBar.value}</h5>`;
        prevNext_element.innerHTML = "";
        for(let m = 0;m<list_items.length;m++){
            let student_name = list_items[m].getElementsByTagName('h3')[0];
            if(student_name.innerHTML.toUpperCase().indexOf(filterValue) > -1){    
                filtered_list.push(list_items[m])
            }
        }
        if (filtered_list.length > rows){
            createNext(filtered_list);
        }
        DisplayList(filtered_list,list_element,rows,current_page);
        setupPagination(filtered_list,pagination_element,rows,current_page);
    }else{
        isSearch = false;
        current_page = 1;
        prevNext_element.innerHTML = "";
        description_element.innerHTML = `<h5>All Students List, Page ${current_page}</h5>`;
        createNext(list_items);
        //display initial list
        DisplayList(list_items,list_element,rows,1);
        //display initial pagination button list
        setupPagination(list_items,pagination_element,rows,1);
    }
}

