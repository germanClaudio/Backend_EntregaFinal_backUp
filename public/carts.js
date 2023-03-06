// const socket = io.connect()

// // -------------------- Items ----------------
// socket.on('ItemsAll', (arrItems) => {
//     renderItems(arrItems)
// })

// const renderItems = (arrItems) => {
//     const arrayItems = arrItems 
//     console.log('Array de Items Carts__________ ', arrItems)
//     const html = arrItems.map((element) => {
//         return (`
//                     <p class="text-center"><strong>${element.items.productId}</strong></p>
//                     <p class="text-center">${element.name}</p>
//                     <p class="text-center">${element.items.price}</p>
//                     <p class="text-center"><span class="badge rounded-pill bg-success"> ${element.items.quantity} </span></p>
//                     <p class="text-center">${element.items.subTotal}</p>
//                     <p class="text-center">${element.total}</p>
//                     <div class="text-center">
//                         <div class="d-block align-items-center text-center">
//                             <a href="/api/carts/add/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa fa-plus-circle"></i></a>
//                             <a href="/api/carts/remove/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa fa-minus-circle"></i></a>
//                             <a href="/api/carts/deleteItem/${element._id}" class="btn btn-primary btn-sm me-1"><i class="fa fa-times"></i></a>
//                         </div>
//                     </div>
//                   `)
//     }).join(" ");

//     document.getElementById('mostrarItemsCarts').innerHTML = html
 
// }

// const maxStock = parseInt(document.getElementById('stock').value)
// //-------------------------- Add quatity --------------------------------------------
// function incrementValue() {
//     let value = parseInt(document.getElementById('number').value)
//     value = isNaN(value) ? 0 : value
//     if(value < maxStock){
//         value++
//             document.getElementById('number').value = value
//     }
// }

// //-------------------------- Remove quatity --------------------------------------------
// function decrementValue() {
//     let value = parseInt(document.getElementById('number').value)
//     value = isNaN(value) ? 0 : value
//     if(value > 1){
//         value--
//             document.getElementById('number').value = value
//     }
// }