import { modelLoader } from './model-loader';
export default class Menu {
    constructor() {
        this.currentModel = '';
        this.modelViewer = document.querySelector('.model-viewer');
        this.menuElement = document.querySelector('.main-menu');

        this.eventListeners();
    }

    eventListeners() {
        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            this.currentModel = '';
            const VrButton = document.querySelector('#VRButton');
            if (VrButton) {
                VrButton.remove();
            }
            this.showMenu();
        });

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', () => {
                this.currentModel = menuItem.dataset.name;
                console.log('this.currentModel ', this.currentModel );
                this.renameTitle();
                this.showModel();
            });
        });
    }

    renameTitle() {
        const modelTitle = document.querySelector('.model-title');
        console.log('renameTitle', modelTitle, this.currentModel);
        modelTitle.textContent = this.currentModel;
    }

    showMenu() {
        this.toggleMenu(false);
        this.toggleModelViewer(true);
    }

    showModel() {
        if (!this.currentModel.length) {
            this.showMenu();
        } else {
            this.toggleMenu(true);
            this.toggleModelViewer(false);
            modelLoader(this.currentModel);
        }
    }

    toggleItems() {
        this.toggleMenu();
    }

    toggleMenu(force) {
        this.menuElement.classList.toggle('hide', force);
    }

    toggleModelViewer(force) {
        this.modelViewer.classList.toggle('hide', force);
    }
}
