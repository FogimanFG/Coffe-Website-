
class HeroSlider {
    constructor() {
        this.slides = [
            {
                image: 'img/hero1.avif',
                alt: 'Уютное кафе с кофейным баром'
            },
            {
                image: 'img/hero2.avif',
                alt: 'Ароматный кофе латте арт'
            },
            {
                image: 'img/hero3.avif',
                alt: 'Десерты ручной работы'
            },
            {
                image: 'img/hero4.avif',
                alt: 'Комфортная зона для работы'
            }
        ];
        
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.slideDuration = 4000; 
        
        const savedSlide = localStorage.getItem('kubanCocoaLastSlide');
        if (savedSlide !== null) {
            this.currentSlide = parseInt(savedSlide);
        }
        
        this.init();
    }
    
    init() {
        this.renderSlides();
        this.renderDots();
        this.setupEventListeners();
        this.startAutoSlide();
        this.showSlide(this.currentSlide);
    }
    
    renderSlides() {
        const container = document.getElementById('sliderContainer');
        container.innerHTML = '';
        
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'hero__slide';
            slideElement.dataset.index = index;
            
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.alt}" loading="lazy">
            `;
            
            container.appendChild(slideElement);
        });
    }
    
    renderDots() {
        const dotsContainer = document.getElementById('sliderDots');
        dotsContainer.innerHTML = '';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'hero__slider-dot';
            dot.dataset.index = index;
            dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
            
            if (index === this.currentSlide) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.resetAutoSlide();
            });
            
            dotsContainer.appendChild(dot);
        });
    }
    
    setupEventListeners() {

        document.getElementById('prevBtn').addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoSlide();
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoSlide();
        });
        

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoSlide();
            }
        });
        
        const slider = document.querySelector('.hero__slider');
        slider.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        slider.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
        
  
        const controls = slider.querySelectorAll('button');
        controls.forEach(control => {
            control.addEventListener('focus', () => {
                this.stopAutoSlide();
            });
            
            control.addEventListener('blur', () => {
                this.startAutoSlide();
            });
        });
    }
    
    showSlide(index) {
    
        if (index < 0) {
            index = this.slides.length - 1;
        } else if (index >= this.slides.length) {
            index = 0;
        }
        
        this.currentSlide = index;
        
      
        const container = document.getElementById('sliderContainer');
        const slideWidth = 100; 
        container.style.transform = `translateX(-${index * slideWidth}%)`;
        
      
        this.updateDots();
        
       
        localStorage.setItem('kubanCocoaLastSlide', index.toString());
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.hero__slider-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) {
            this.stopAutoSlide();
        }
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = new HeroSlider();
    
 
    window.heroSlider = heroSlider;
});