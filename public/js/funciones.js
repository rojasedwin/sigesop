//const modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'))


const on =(element, event, selector, handler) =>{
	element.addEventListener(event, e => {
		if(e.target.closest(selector)){
            handler(e)
		}
	})
}

on(document, 'click','.btnEditar', e =>{
    alert();
	const fila =e.target.parentNode.parentNode
    id_editar.value= fila.children[0].innerHTML
    user_name.value= fila.children[1].innerHTML
    user_lastname.value= fila.children[2].innerHTML
    console.log(fila.children[2].innerHTML)
})