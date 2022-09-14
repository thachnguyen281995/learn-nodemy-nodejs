
// var currentPage = 1
// function loadpage(page){
//     currentPage = page
//     $.ajax({
//         url: "/user?page=" +page,
//         type: "GET",
//     })
//         .then((data) => {
//             $("#content").html('')
//             console.log(data);
//             for (let i = 0; i < data.length; i++) {
//                 const element = data[i];
//                 var item = $(`<h1>${element.username}:${element.password}</h1>`);
//                 $("#content").append(item);
//             }
//         })


    
//         .catch((err) => {
//             console.log("API Loi");
//         });
    
// }
// function nextPage() {
//     currentPage++
//     $.ajax({
//         url: "/user?page=" +currentPage,
//         type: "GET",
//     })
//         .then((data) => {
//             $("#content").html('')
//             console.log(data);
//             for (let i = 0; i < data.length; i++) {
//                 const element = data[i];
//                 var item = $(`<h1>${element.username}:${element.password}</h1>`);
//                 $("#content").append(item);
//             }
//         })
    
//         .catch((err) => {
//             console.log("API Loi");
//         });
// }


// ! Pagination JS 
// $('#paging').pagination({
//     dataSource: '/user?page=2',
//     locator:'data',
//     totalNumberLocator: function(response) {
//         return response.total
//     },
//     pageSize: 2,
//     afterPageOnClick: function(event,pageNumber){
//         loadPage(pageNumber);
//     },
//     afterNextOnClick : function(event,pageNumber){
//         loadPage(pageNumber);
//     },
//     afterPreviousOnClick :function(event,pageNumber){
//         loadPage(pageNumber);
//     }
// })

// function loadPage(page){
//     $("#content").html('')
//     $.ajax({
//         url:'/user?page='+page
//     })
//     .then(rs=>{
//         for(let i = 0; i < rs.data.length; i++){
//             const element = rs.data[i];
//             var item = $(`<h3>${element.username}</h3>`)
//             $("#content").append(item)
//         }
        
//     })
//     .catch((err) => {
//         res.status(500).json("loi")
//     })
// }
// ! #13 AJAX VÀ XÁC THỰC PHÂN QUYỀN


