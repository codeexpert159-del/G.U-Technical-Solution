/**
 * Admin Content Loader - OPTIMIZED FOR SPEED
 * Features: Lazy loading, caching, intersection observer, async rendering
 */

class ContentLoader {
  constructor() {
    this.projects = [];
    this.services = [];
    this.cache = new Map();
    this.observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };
  }

  // Cached fetch with localStorage support
  async cachedFetch(url, cacheKey) {
    // Check memory cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Check localStorage (persists across page loads)
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      this.cache.set(cacheKey, data);
      return data;
    }

    // Fetch fresh data
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Cache for next time
      this.cache.set(cacheKey, data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return [];
    }
  }

  async loadProjects() {
    this.projects = await this.cachedFetch('admin/api/get-projects.php', 'projects_cache');
    return this.projects;
  }

  async loadServices() {
    this.services = await this.cachedFetch('admin/api/get-services.php', 'services_cache');
    return this.services;
  }

  async loadAll() {
    // Load in parallel for speed
    await Promise.all([
      this.loadProjects(),
      this.loadServices()
    ]);
  }

  getProjectById(id) {
    return this.projects.find(p => p.id == id);
  }

  getServiceById(id) {
    return this.services.find(s => s.id == id);
  }

  renderProjectCard(project) {
    const imagePath = project.image ? `admin/uploads/projects/${project.image}` : 'assets/img/placeholder.jpg';
    return `
      <div class="project-item lazy-item" data-src="${imagePath}">
        <img 
          class="project-image lazy-img" 
          data-src="${imagePath}" 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E" 
          alt="${project.title}"
          loading="lazy"
        >
        <h3>${project.title}</h3>
        <p class="category">${project.category}</p>
        <p>${project.description}</p>
        ${project.video ? `<video 
          width="100%" 
          height="200" 
          controls 
          style="margin-top: 10px; border-radius: 5px;"
          preload="metadata"
        >
          <source src="admin/uploads/projects/${project.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>` : ''}
        <a href="project-details.html?id=${project.id}" class="btn-more">View Details →</a>
      </div>
    `;
  }

  renderServiceCard(service) {
    const imagePath = service.image ? `admin/uploads/services/${service.image}` : 'assets/img/placeholder.jpg';
    return `
      <div class="service-item lazy-item" data-src="${imagePath}">
        ${service.image ? `<img 
          class="service-image lazy-img" 
          data-src="${imagePath}" 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E" 
          alt="${service.title}"
          loading="lazy"
        >` : ''}
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        ${service.video ? `<video 
          width="100%" 
          height="200" 
          controls 
          style="margin-top: 10px; border-radius: 5px;"
          preload="metadata"
        >
          <source src="admin/uploads/services/${service.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>` : ''}
        <a href="service-details.html?id=${service.id}" class="btn-more">Learn More →</a>
      </div>
    `;
  }

  // Setup lazy loading for images
  setupLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, this.observerOptions);

    // Observe all lazy images
    document.querySelectorAll('.lazy-img').forEach(img => {
      observer.observe(img);
    });
  }
}

// Initialize global content loader
const contentLoader = new ContentLoader();

// Auto-load content on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Show loading indicator (optional)
  console.log('⏳ Loading projects and services...');
  
  // Load data
  await contentLoader.loadAll();
  
  // Setup lazy loading
  contentLoader.setupLazyLoading();
  
  console.log('✅ Content loaded and optimized for speed!');
  
  // Dispatch custom event so pages can load their content
  window.dispatchEvent(new Event('contentLoaderReady'));
});
