// Project Details Dynamic Loader
// This script swaps images, video, and text based on the ?project=N query param

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project') || '1';

  // Project data (images, video, text)
  const projects = {
    '1': {
      banner: 'assets/img/construction/project-1.jpeg',
      bannerAlt: 'Greenfield Estate Site Preparation',
      status: 'Completed',
      tags: ['Private', 'Port Harcourt'],
      title: 'Greenfield Estate Site Preparation',
      summary: 'Excavation, grading, and land clearing to prepare a 5-hectare residential estate for safe construction.',
      metrics: [
        {title: 'Timeline', data: '6 Weeks'},
        {title: 'Total Area', data: '5 Hectares'},
        {title: 'Budget', data: '₦120M'},
        {title: 'Units', data: 'N/A'}
      ],
      gallery: [
        {src: 'assets/img/construction/project-1.jpeg', alt: 'Site Preparation', label: 'Site Prep'},
        {src: 'assets/img/construction/project-2.jpeg', alt: 'Earthworks', label: 'Earthworks'},
        {src: 'assets/img/construction/project-3.jpeg', alt: 'Machinery', label: 'Machinery'},
        {src: 'assets/img/construction/project-4.jpeg', alt: 'Completed', label: 'Completed'}
      ],
      video: 'assets/img/construction/projects-video.mp4',
      videoLabel: 'Project Video',
      breakdown: 'Our team delivered full site clearance, earthworks, and grading for a new residential estate, ensuring a safe and stable foundation for all future construction.',
      achievements: [
        {icon: 'bi-award', title: 'Efficient Delivery', desc: 'Completed ahead of schedule with zero incidents.'},
        {icon: 'bi-shield-check', title: 'Safety Record', desc: 'No lost-time injuries throughout the project.'},
        {icon: 'bi-clock', title: 'On-Time Handover', desc: 'Delivered to client on the agreed date.'}
      ]
    },
    '2': {
      banner: 'assets/img/construction/project-2.jpeg',
      bannerAlt: 'Eastline Residential Estate Development',
      status: 'In Progress',
      tags: ['Residential', 'Enugu'],
      title: 'Eastline Residential Estate Development',
      summary: 'Ongoing earthworks, foundation preparation, equipment deployment, and crane operations for a modern housing community.',
      metrics: [
        {title: 'Timeline', data: '9 Months'},
        {title: 'Total Area', data: '68 Units'},
        {title: 'Budget', data: '₦350M'},
        {title: 'Units', data: '68'}
      ],
      gallery: [
        {src: 'assets/img/construction/project-2.jpeg', alt: 'Foundation', label: 'Foundation'},
        {src: 'assets/img/construction/project-3.jpeg', alt: 'Equipment', label: 'Equipment'},
        {src: 'assets/img/construction/project-4.jpeg', alt: 'Cranes', label: 'Cranes'},
        {src: 'assets/img/construction/project-5.jpeg', alt: 'Progress', label: 'Progress'}
      ],
      video: 'assets/img/construction/projects-video-2.mp4',
      videoLabel: 'Project Video',
      breakdown: 'We are providing all heavy equipment, technical support, and project management for this large-scale residential development.',
      achievements: [
        {icon: 'bi-award', title: 'Modern Methods', desc: 'Utilized advanced equipment for rapid progress.'},
        {icon: 'bi-shield-check', title: 'Quality Control', desc: 'Strict adherence to building standards.'},
        {icon: 'bi-clock', title: 'On Track', desc: 'Project milestones met on schedule.'}
      ]
    },
    '3': {
      banner: 'assets/img/construction/project-3.jpeg',
      bannerAlt: 'Heavy Machinery Supply for Road Expansion',
      status: 'Completed',
      tags: ['Infrastructure', 'Owerri'],
      title: 'Heavy Machinery Supply for Road Expansion',
      summary: 'Provided excavators, bulldozers, and compactors for a major road rehabilitation project on short- and long-term rental.',
      metrics: [
        {title: 'Timeline', data: '4 Months'},
        {title: 'Total Area', data: '12 Machines'},
        {title: 'Budget', data: '₦200M'},
        {title: 'Units', data: 'N/A'}
      ],
      gallery: [
        {src: 'assets/img/construction/project-3.jpeg', alt: 'Machinery', label: 'Machinery'},
        {src: 'assets/img/construction/project-4.jpeg', alt: 'Roadwork', label: 'Roadwork'},
        {src: 'assets/img/construction/project-5.jpeg', alt: 'Compactors', label: 'Compactors'},
        {src: 'assets/img/construction/project-6.jpeg', alt: 'Completed', label: 'Completed'}
      ],
      video: 'assets/img/construction/projects-video-3.mp4',
      videoLabel: 'Project Video',
      breakdown: 'Our fleet enabled rapid road expansion, minimizing downtime and maximizing efficiency for the client.',
      achievements: [
        {icon: 'bi-award', title: 'Fleet Reliability', desc: 'Zero breakdowns during the project.'},
        {icon: 'bi-shield-check', title: 'Safety', desc: 'All operations met strict safety protocols.'},
        {icon: 'bi-clock', title: 'Fast Turnaround', desc: 'Project completed in record time.'}
      ]
    },
    '4': {
      banner: 'assets/img/construction/project-4.jpeg',
      bannerAlt: 'City General Hospital Expansion',
      status: 'Completed',
      tags: ['Healthcare', 'Lagos'],
      title: 'City General Hospital Expansion',
      summary: 'Construction of additional wards, operating theaters, and laboratory facilities to improve patient care and hospital capacity.',
      metrics: [
        {title: 'Timeline', data: '12 Months'},
        {title: 'Total Area', data: '8 Wards'},
        {title: 'Budget', data: '₦500M'},
        {title: 'Units', data: 'N/A'}
      ],
      gallery: [
        {src: 'assets/img/construction/project-4.jpeg', alt: 'Hospital', label: 'Hospital'},
        {src: 'assets/img/construction/project-5.jpeg', alt: 'Wards', label: 'Wards'},
        {src: 'assets/img/construction/project-6.jpeg', alt: 'Theater', label: 'Theater'},
        {src: 'assets/img/construction/project-1.jpeg', alt: 'Completed', label: 'Completed'}
      ],
      video: 'assets/img/construction/projects-video-4.mp4',
      videoLabel: 'Project Video',
      breakdown: 'We delivered new medical facilities, expanded patient capacity, and ensured all work met healthcare standards.',
      achievements: [
        {icon: 'bi-award', title: 'Healthcare Impact', desc: 'Improved care for thousands of patients.'},
        {icon: 'bi-shield-check', title: 'Compliance', desc: 'Met all regulatory requirements.'},
        {icon: 'bi-clock', title: 'On Budget', desc: 'Delivered within the allocated budget.'}
      ]
    },
    '5': {
      banner: 'assets/img/construction/project-5.jpeg',
      bannerAlt: 'Modern Secondary School Campus Development',
      status: 'Planning',
      tags: ['Educational', 'Abuja'],
      title: 'Modern Secondary School Campus Development',
      summary: 'Design and planning of classrooms, laboratories, administrative blocks, and sports facilities for a new educational campus.',
      metrics: [
        {title: 'Timeline', data: '4 Months'},
        {title: 'Total Area', data: '24 Classrooms'},
        {title: 'Budget', data: '₦180M'},
        {title: 'Units', data: 'N/A'}
      ],
      gallery: [
        {src: 'assets/img/construction/project-5.jpeg', alt: 'Campus', label: 'Campus'},
        {src: 'assets/img/construction/project-6.jpeg', alt: 'Labs', label: 'Labs'},
        {src: 'assets/img/construction/project-1.jpeg', alt: 'Sports', label: 'Sports'},
        {src: 'assets/img/construction/project-2.jpeg', alt: 'Admin', label: 'Admin'}
      ],
      video: 'assets/img/construction/projects-video-5.mp4',
      videoLabel: 'Project Video',
      breakdown: 'Our team is developing a modern, student-focused campus with state-of-the-art facilities and learning environments.',
      achievements: [
        {icon: 'bi-award', title: 'Innovative Design', desc: 'Modern, flexible learning spaces.'},
        {icon: 'bi-shield-check', title: 'Sustainability', desc: 'Eco-friendly construction methods.'},
        {icon: 'bi-clock', title: 'Future Ready', desc: 'Designed for long-term growth.'}
      ]
    },
    '6': {
      banner: 'assets/img/construction/project-6.jpeg',
      bannerAlt: 'Industrial Manufacturing Plant Construction',
      status: 'Completed',
      tags: ['Industrial', 'Port Harcourt'],
      title: 'Industrial Manufacturing Plant Construction',
      summary: 'Construction of a steel fabrication and assembly plant including factory halls, loading docks, and storage facilities.',
      metrics: [
        {title: 'Timeline', data: '14 Months'},
        {title: 'Total Area', data: '15,000 m²'},
        {title: 'Budget', data: '₦900M'},
        {title: 'Units', data: 'N/A'}
      ],
      gallery: [
        {src: 'assets/img/construction/project-6.jpeg', alt: 'Plant', label: 'Plant'},
        {src: 'assets/img/construction/project-1.jpeg', alt: 'Assembly', label: 'Assembly'},
        {src: 'assets/img/construction/project-2.jpeg', alt: 'Loading', label: 'Loading'},
        {src: 'assets/img/construction/project-3.jpeg', alt: 'Storage', label: 'Storage'}
      ],
      video: 'assets/img/construction/projects-video.mp4',
      videoLabel: 'Project Video',
      breakdown: 'We constructed a large-scale manufacturing facility, supporting local industry and job creation.',
      achievements: [
        {icon: 'bi-award', title: 'Industrial Scale', desc: 'One of the largest plants in the region.'},
        {icon: 'bi-shield-check', title: 'Quality', desc: 'Built to international standards.'},
        {icon: 'bi-clock', title: 'On Schedule', desc: 'Delivered on time.'}
      ]
    }
  };

  const project = projects[projectId] || projects['1'];

  // Banner
  const bannerImg = document.querySelector('.project-banner img');
  if (bannerImg) {
    bannerImg.src = project.banner;
    bannerImg.alt = project.bannerAlt;
  }
  const statusEl = document.querySelector('.banner-badge .status-indicator');
  if (statusEl) statusEl.textContent = project.status;

  // Tags
  const tagsEl = document.querySelector('.project-tags');
  if (tagsEl) {
    tagsEl.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
  }

  // Title & Summary
  const titleEl = document.querySelector('.main-title');
  if (titleEl) titleEl.textContent = project.title;
  const summaryEl = document.querySelector('.summary-text');
  if (summaryEl) summaryEl.textContent = project.summary;

  // Metrics
  const metricEls = document.querySelectorAll('.key-metrics .metric');
  if (metricEls.length && project.metrics) {
    metricEls.forEach((el, i) => {
      if (project.metrics[i]) {
        el.querySelector('.metric-title').textContent = project.metrics[i].title;
        el.querySelector('.metric-data').textContent = project.metrics[i].data;
      }
    });
  }

  // Gallery
  const galleryEls = document.querySelectorAll('.showcase-item img');
  if (galleryEls.length && project.gallery) {
    galleryEls.forEach((el, i) => {
      if (project.gallery[i]) {
        el.src = project.gallery[i].src;
        el.alt = project.gallery[i].alt;
        const label = el.parentElement.querySelector('.overlay-label');
        if (label) label.textContent = project.gallery[i].label;
      }
    });
  }

  // Breakdown
  const breakdownEl = document.querySelector('.breakdown-content p');
  if (breakdownEl) breakdownEl.textContent = project.breakdown;

  // Achievements
  const achievementEls = document.querySelectorAll('.achievement-point');
  if (achievementEls.length && project.achievements) {
    achievementEls.forEach((el, i) => {
      if (project.achievements[i]) {
        el.querySelector('i').className = `bi ${project.achievements[i].icon}`;
        el.querySelector('h5').textContent = project.achievements[i].title;
        el.querySelector('p').textContent = project.achievements[i].desc;
      }
    });
  }

  // Technical Gallery
  const techImgs = document.querySelectorAll('.tech-item img');
  if (techImgs.length && project.gallery) {
    techImgs.forEach((el, i) => {
      if (project.gallery[i]) {
        el.src = project.gallery[i].src;
        el.alt = project.gallery[i].alt;
      }
    });
  }

  // Video (add to gallery or as a button)
  let videoBtn = document.getElementById('project-video-btn');
  if (!videoBtn && project.video) {
    const gallery = document.querySelector('.showcase-grid');
    if (gallery) {
      const videoDiv = document.createElement('div');
      videoDiv.className = 'showcase-item';
      videoDiv.innerHTML = `<a href="${project.video}" class="glightbox" data-glightbox="type: video; title: ${project.title};"><i class="bi bi-play-circle" style="font-size:2.5rem;display:block;margin:0 auto 10px;"></i><span style="display:block;text-align:center;">${project.videoLabel}</span></a>`;
      gallery.appendChild(videoDiv);
    }
  }
});
