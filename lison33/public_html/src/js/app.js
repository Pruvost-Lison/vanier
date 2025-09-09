//commande menu
document.addEventListener('DOMContentLoaded', function () {
    const panel = document.getElementById('panel');
    const openMenuButton = document.getElementById('btnmenu');
    const closeMenuButton = document.getElementById('hide-menu');

    // Ouvrir le menu
    openMenuButton.addEventListener('click', function () {
        panel.classList.add('go-right');
        panel.setAttribute('aria-hidden', 'false'); // Accessibilité
    });

    // Fermer le menu
    closeMenuButton.addEventListener('click', function () {
        panel.classList.remove('go-right');
        panel.setAttribute('aria-hidden', 'true'); // Accessibilité
    });
});