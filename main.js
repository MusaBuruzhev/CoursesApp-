
class CourseCatalog {
    constructor() {
        this.activeCategory = "All";
        this.searchTerm = "";
        this.visibleCount = 9;
        
  
        this.filtersList = document.getElementById('filtersList');
        this.searchInput = document.getElementById('searchInput');
        this.cardsContainer = document.getElementById('cardsContainer');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.loadMoreContainer = document.getElementById('loadMoreContainer');
        
        this.init();
    }
    
    init() {
        this.renderFilters();
        this.renderCourses();
        this.setupEventListeners();
    }
    

    renderFilters() {
        this.filtersList.innerHTML = '';
        
        categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'filters__item';
            
            const button = document.createElement('button');
            button.className = 'filters__button';
            if (this.activeCategory === category.name) {
                button.classList.add('filters__button--active');
            }
            
            button.innerHTML = `
                ${category.name}
                <span class="filters__count">${category.count}</span>
            `;
            
            button.addEventListener('click', () => {
                this.activeCategory = category.name;
                this.visibleCount = 9;
                this.renderFilters();
                this.renderCourses();
            });
            
            li.appendChild(button);
            this.filtersList.appendChild(li);
        });
    }
    

    getFilteredCourses() {
        return courses.filter(course => {
            const matchesCategory = this.activeCategory === "All" || course.category === this.activeCategory;
            const matchesSearch = course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                 course.author.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }
    

    renderCourses() {
        const filteredCourses = this.getFilteredCourses();
        const visibleCourses = filteredCourses.slice(0, this.visibleCount);
        
        this.cardsContainer.innerHTML = '';
        
        if (visibleCourses.length === 0) {
            this.cardsContainer.innerHTML = `
                <div class="no-results">
                    <p>No courses found. Try different search or filter.</p>
                </div>
            `;
            this.loadMoreContainer.style.display = 'none';
            return;
        }
        
        visibleCourses.forEach(course => {
            const card = document.createElement('article');
            card.className = 'card';
            
            card.innerHTML = `
                <img src="${course.img}" alt="${course.title}" class="card__image">
                <div class="card__category" style="background-color: ${course.color}">
                    ${course.category}
                </div>
                
                <div class="card__content">
                    <h3 class="card__title">${course.title}</h3>
                    
                    <div class="card__footer">
                        <span class="card__price">$${course.price}</span>
                        <p class="card__author">by ${course.author}</p>
                    </div>
                </div>
            `;
            
            this.cardsContainer.appendChild(card);
        });
        

        if (this.visibleCount < filteredCourses.length) {
            this.loadMoreContainer.style.display = 'flex';
            this.loadMoreBtn.innerHTML = `
                <img class="load-more-btn__icon" src="./Convert.svg" alt="">
                <span class="load-more-btn__text">Load more</span>`;
        } else {
            this.loadMoreContainer.style.display = 'none';
        }
    }
    
    loadMore() {
        this.visibleCount += 3; 
        this.renderCourses();
    }
    

    setupEventListeners() {

        this.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.visibleCount = 9;
            this.renderCourses();
        });
        

        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMore();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CourseCatalog();
});