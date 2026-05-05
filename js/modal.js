
class OrderModal {
    constructor() {
        this.modal = document.getElementById('orderModal');
        this.orderBtn = document.getElementById('orderBtn');
        this.promoOrderBtn = document.getElementById('promoOrderBtn');
        this.modalClose = document.getElementById('modalClose');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.orderForm = document.getElementById('orderForm');
        this.orderProductInput = document.getElementById('orderProduct');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupProductButtons();
    }
    
    setupEventListeners() {

        this.orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });
        
        this.promoOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
            this.orderProductInput.value = 'Акция 20%';
        });
        

        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.modalOverlay.addEventListener('click', () => {
            this.closeModal();
        });
        

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
        

        this.orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }
    
    setupProductButtons() {

        const orderButtons = document.querySelectorAll('.menu__card-order');
        
        orderButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = button.getAttribute('data-product');
                this.orderProductInput.value = productName;
                this.openModal();
            });
        });
    }
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        

        setTimeout(() => {
            const firstInput = this.orderForm.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; 
        

        setTimeout(() => {
            this.orderForm.reset();
        }, 300);
    }
    
    handleFormSubmit() {

        const name = document.getElementById('orderName').value;
        const phone = document.getElementById('orderPhone').value;
        const product = this.orderProductInput.value;
        

        if (!name.trim() || !phone.trim()) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        

        console.log('Заказ отправлен:', { name, phone, product });
        
 
        alert(`Спасибо за заказ, ${name}! Мы перезвоним вам по номеру ${phone} в ближайшее время для подтверждения заказа "${product}".`);
        

        this.closeModal();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const orderModal = new OrderModal();
    

    window.orderModal = orderModal;
});