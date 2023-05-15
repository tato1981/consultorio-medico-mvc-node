
const admin = (req,res) => {
    res.render('menu-admin/admin', {
        pagina: 'Menu Principal Administradores',
        barra: 'true',
        
    })
}




//las funciones
export {
    admin,
   
}

