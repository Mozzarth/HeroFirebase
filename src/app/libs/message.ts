import Swal from 'sweetalert2'



function info(title = "", text = "") {
    return Swal.fire({ title, text, allowOutsideClick: false, icon: "info" })
}
function crud(title = "", text = "") {
    return Swal.fire({
        title, text,
        allowOutsideClick: false,
        icon: "question",
        showConfirmButton: true,
        confirmButtonText: "Ok",
        showCancelButton: true,
        focusConfirm: true,
    })
}


function success(title: string = "", text: string = "") {
    return Swal.fire({
        title,
        text,
        timer: 15000,
        icon: "success",
        width: "15rem",
        grow: "row",
        timerProgressBar: true,
        // showLoaderOnConfirm: true,
        // preConfirm: (a => console.log(a))
    })
}


export { info, success, crud }