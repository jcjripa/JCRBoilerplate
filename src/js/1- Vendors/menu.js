// /* ---------- Dar funcionalidad al Boton en Mobile ---------*/
// const openMenu = (navId, toggleId) => {
//   const nav = document.getElementById(navId)
//   const toggle = document.getElementById(toggleId)

//   if (!nav || !toggle) return

//   toggle.addEventListener('click', () => {
//     nav.classList.toggle('show')
//     toggle.classList.toggle('active')
//   })
// }

// /* ---------- Agregar Clase para aplicar Stilos ---------*/
// const activeMenu = menuId => {
//   const menu = document.getElementById(menuId)
//   if(!menu) return
//   const links = Array.from(menu.querySelectorAll('a'))
//   if (!links) return
//   links.map( link => {
//     const url = document.location.href
//     if(link.href === url || link.href === url.slice(0,-1)) link.classList.add('active')
//   })
// }