/**
* Template Name: Constructo
* Template URL: https://bootstrapmade.com/constructo-bootstrap-construction-template/
* Updated: Aug 30 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);
  function initMobileDropdowns() {
    function isMobile() {
      return window.innerWidth < 992 || document.body.classList.contains('mobile-nav-active');
    }
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(function(toggler) {
      toggler.addEventListener('click', function(e) {
        if (!isMobile()) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        const anchor = this.parentNode;
        const menu = anchor.nextElementSibling;
        anchor.classList.toggle('active');
        if (menu) menu.classList.toggle('dropdown-active');
      });
    });
  }
  window.addEventListener('load', initMobileDropdowns);
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * GLightbox Muted Video Initialization
   */
  const lightbox = GLightbox({
    selector: '.glightbox',
    autoplayVideos: true,
    plyr: {
      config: {
        muted: true,
        volume: 0,
        hideControls: false
      }
    }
  });

  // Remove previous fallback and theme toggle code
  // --- Video Modal Fallback (no theme toggle) ---
  // Replace GLightbox video links with direct modal video display
  function openModalVideo(src, title = '') {
    let modal = document.getElementById('video-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'video-modal';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.85)';
      modal.style.zIndex = '9999';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.innerHTML = `
        <div style="position:relative;max-width:900px;width:90vw;">
          <button id="close-video-modal" style="position:absolute;top:-40px;right:0;font-size:2rem;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>
          <video src="${src}" controls autoplay muted style="width:100%;height:auto;background:#000;border-radius:8px;box-shadow:0 2px 24px #000;" playsinline></video>
          ${title ? `<div style='color:#fff;text-align:center;margin-top:8px;'>${title}</div>` : ''}
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('close-video-modal').onclick = function() {
        modal.remove();
      };
      modal.onclick = function(e) {
        if (e.target === modal) modal.remove();
      };
    }
  }

  // Attach modal video handler to all .view-btn[data-glightbox*='type: video'] links
  window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.view-btn[data-glightbox*="type: video"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const src = link.getAttribute('href');
        const titleMatch = link.getAttribute('data-glightbox')?.match(/title:([^;]*)/);
        const title = titleMatch ? titleMatch[1].trim() : '';
        openModalVideo(src, title);
      });
    });
  });

  function initHeroMaterialCycle() {
    const container = document.querySelector('.hero .hero-image');
    if (!container) return;
    const img = container.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.className = 'material-overlay';
    container.appendChild(overlay);
    const materials = [
      'material-brick edge-jagged',
      'material-concrete edge-jagged',
      'material-steel',
      'material-wood edge-soft',
      'material-tile edge-grid',
      'material-gravel edge-soft',
      'material-asphalt edge-soft'
    ];
    const gallery = container.querySelector('.hero-gallery');
    let urls = [];
    if (gallery) {
      urls = Array.from(gallery.querySelectorAll('img')).map(function(im){ return im.getAttribute('src'); }).filter(Boolean);
    }
    if (!urls.length) urls = [img.getAttribute('src')];
    urls.forEach(function(u){ const pre = new Image(); pre.src = u; });
    let imgIdx = 0;
    let idx = 0;
    let running = false;
    let cycleTimeout = null;
    function showCracks(material) {
      const lines = document.createElement('div');
      lines.className = 'crack-lines';
      container.appendChild(lines);
      const base = material.split(' ')[0].replace('material-','');
      const count = 12 + Math.floor(Math.random()*6);
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      for (let i=0;i<count;i++){
        const c = document.createElement('div');
        c.className = 'crack crack-' + base;
        const len = (cw * (0.25 + Math.random()*0.55));
        c.style.width = len + 'px';
        const x = Math.random() * (cw*0.8);
        const y = Math.random() * (ch*0.8);
        c.style.left = x + 'px';
        c.style.top = y + 'px';
        let ang = (Math.random()*2 - 1) * 65;
        if (material.indexOf('material-steel')===0) ang = (Math.random()*2 - 1) * 22;
        if (material.indexOf('material-wood')===0) ang = (Math.random()*2 - 1) * 40;
        if (material.indexOf('material-tile')===0) { ang = Math.random() < 0.5 ? 0 : 90; }
        c.style.transform = 'rotateZ(' + ang + 'deg) scaleX(0)';
        lines.appendChild(c);
      }
      requestAnimationFrame(function(){ lines.style.opacity = '1'; });
      setTimeout(function(){ lines.style.opacity = '0'; }, 900);
      setTimeout(function(){ if (lines.parentNode) lines.parentNode.removeChild(lines); }, 1200);
    }
    function createShatter(prevSrc, prevMat, nextMat, newSrc) {
      const layer = document.createElement('div');
      layer.className = 'shatter-layer';
      container.appendChild(layer);
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      
      function cfg(name){
        if (name.indexOf('material-brick')===0) return {rows:5, cols:7, scale:1.0, rot:35};
        if (name.indexOf('material-concrete')===0) return {rows:6, cols:8, scale:1.1, rot:30};
        if (name.indexOf('material-steel')===0) return {rows:4, cols:6, scale:0.9, rot:12};
        if (name.indexOf('material-wood')===0) return {rows:3, cols:10, scale:1.2, rot:40};
        if (name.indexOf('material-tile')===0) return {rows:6, cols:6, scale:1.0, rot:20};
        if (name.indexOf('material-gravel')===0) return {rows:8, cols:12, scale:1.25, rot:45};
        if (name.indexOf('material-asphalt')===0) return {rows:6, cols:10, scale:1.1, rot:28};
        return {rows:6, cols:8, scale:1.0, rot:25};
      }
      const c = cfg(prevMat);
      for (let r=0; r<c.rows; r++){
        for (let col=0; col<c.cols; col++){
          const p = document.createElement('div');
          const base = prevMat.split(' ')[0].replace('material-','');
          p.className = 'piece piece-' + base;
          p.style.width = (100/c.cols) + '%';
          p.style.height = (100/c.rows) + '%';
          p.style.left = (col*100/c.cols) + '%';
          p.style.top = (r*100/c.rows) + '%';
          p.style.backgroundImage = 'url(' + prevSrc + ')';
          p.style.setProperty('--bgX', (c.cols*100) + '%');
          p.style.setProperty('--bgY', (c.rows*100) + '%');
          const bx = c.cols>1 ? (col*100/(c.cols-1)) : 0;
          const by = c.rows>1 ? (r*100/(c.rows-1)) : 0;
          p.style.setProperty('--bgPosX', bx + '%');
          p.style.setProperty('--bgPosY', by + '%');
          const cx = (col + 0.5)/c.cols - 0.5;
          const cy = (r + 0.5)/c.rows - 0.5;
          let tx = cx * cw * 0.6 * c.scale;
          let ty = cy * ch * 0.6 * c.scale;
          if (prevMat.indexOf('material-steel')===0){ if (Math.abs(cx)>Math.abs(cy)) { ty *= 0.3; } else { tx *= 0.3; } }
          if (prevMat.indexOf('material-wood')===0){ tx *= 1.3; }
          if (prevMat.indexOf('material-tile')===0){ tx *= 0.9; ty *= 0.9; }
          const rz = (Math.random()*2-1) * c.rot + 'deg';
          const rx = ((Math.random()*2-1) * (c.rot*0.3)) + 'deg';
          const ry = ((Math.random()*2-1) * (c.rot*0.3)) + 'deg';
          const jitterX = (Math.random()*2-1) * 12;
          const jitterY = (Math.random()*2-1) * 12;
          p.style.setProperty('--tx', (tx + jitterX) + 'px');
          p.style.setProperty('--ty', (ty + jitterY) + 'px');
          p.style.setProperty('--rz', rz);
          p.style.setProperty('--rx', rx);
          p.style.setProperty('--ry', ry);
          p.style.animationDelay = Math.round(Math.random()*700) + 'ms';
          p.style.animationDuration = (4200 + Math.round(Math.random()*1200)) + 'ms';
          if (prevMat.indexOf('edge-jagged')>=0){
            const t = 2 + Math.random()*3;
            const b = 2 + Math.random()*3;
            p.style.clipPath = 'polygon(0% ' + t + '%, 100% ' + (t*0.8) + '%, 98% 100%, 0% ' + (100-b) + '%)';
          } else if (prevMat.indexOf('edge-soft')>=0){
            p.style.borderRadius = '6px';
          }
          layer.appendChild(p);
        }
      }
      // Add frame ring pieces around the container edges to simulate outer layer shatter
      (function addFramePieces(){
        const base = prevMat.split(' ')[0].replace('material-','');
        const segs = 8;
        const thick = 0.08; // 8% of container dimension
        // Top edge
        for (let i=0;i<segs;i++){
          const fp = document.createElement('div');
          fp.className = 'piece piece-' + base;
          fp.style.width = (100/segs) + '%';
          fp.style.height = (thick*100) + '%';
          fp.style.left = (i*100/segs) + '%';
          fp.style.top = '0%';
          const tx = (i - segs/2) * (cw/segs) * 0.4;
          const ty = -ch * 0.15 * c.scale;
          fp.style.setProperty('--tx', (tx + (Math.random()*2-1)*20) + 'px');
          fp.style.setProperty('--ty', (ty + (Math.random()*2-1)*16) + 'px');
          fp.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
          fp.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
          fp.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
          fp.style.animationDelay = Math.round(Math.random()*600) + 'ms';
          fp.style.animationDuration = (3800 + Math.round(Math.random()*1200)) + 'ms';
          if (prevMat.indexOf('edge-jagged')>=0){ fp.style.clipPath = 'polygon(0% 0%, 100% 0%, 98% 100%, 0% 95%)'; }
          else if (prevMat.indexOf('edge-soft')>=0){ fp.style.borderRadius = '10px'; }
          layer.appendChild(fp);
        }
        // Bottom edge
        for (let i=0;i<segs;i++){
          const fp = document.createElement('div');
          fp.className = 'piece piece-' + base;
          fp.style.width = (100/segs) + '%';
          fp.style.height = (thick*100) + '%';
          fp.style.left = (i*100/segs) + '%';
          fp.style.top = (100 - thick*100) + '%';
          const tx = (i - segs/2) * (cw/segs) * 0.4;
          const ty = ch * 0.15 * c.scale;
          fp.style.setProperty('--tx', (tx + (Math.random()*2-1)*20) + 'px');
          fp.style.setProperty('--ty', (ty + (Math.random()*2-1)*16) + 'px');
          fp.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
          fp.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
          fp.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
          fp.style.animationDelay = Math.round(Math.random()*600) + 'ms';
          fp.style.animationDuration = (3800 + Math.round(Math.random()*1200)) + 'ms';
          if (prevMat.indexOf('edge-jagged')>=0){ fp.style.clipPath = 'polygon(0% 5%, 100% 0%, 100% 100%, 0% 100%)'; }
          else if (prevMat.indexOf('edge-soft')>=0){ fp.style.borderRadius = '10px'; }
          layer.appendChild(fp);
        }
        // Left and right edges
        for (let i=0;i<segs;i++){
          const fpL = document.createElement('div');
          fpL.className = 'piece piece-' + base;
          fpL.style.width = (thick*100) + '%';
          fpL.style.height = (100/segs) + '%';
          fpL.style.left = '0%';
          fpL.style.top = (i*100/segs) + '%';
          const txL = -cw * 0.12 * c.scale;
          const tyL = (i - segs/2) * (ch/segs) * 0.4;
          fpL.style.setProperty('--tx', (txL + (Math.random()*2-1)*16) + 'px');
          fpL.style.setProperty('--ty', (tyL + (Math.random()*2-1)*20) + 'px');
          fpL.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
          fpL.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
          fpL.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
          fpL.style.animationDelay = Math.round(Math.random()*600) + 'ms';
          fpL.style.animationDuration = (3800 + Math.round(Math.random()*1200)) + 'ms';
          if (prevMat.indexOf('edge-jagged')>=0){ fpL.style.clipPath = 'polygon(0% 0%, 95% 0%, 100% 100%, 0% 100%)'; }
          else if (prevMat.indexOf('edge-soft')>=0){ fpL.style.borderRadius = '10px'; }
          layer.appendChild(fpL);

          const fpR = document.createElement('div');
          fpR.className = 'piece piece-' + base;
          fpR.style.width = (thick*100) + '%';
          fpR.style.height = (100/segs) + '%';
          fpR.style.left = (100 - thick*100) + '%';
          fpR.style.top = (i*100/segs) + '%';
          const txR = cw * 0.12 * c.scale;
          const tyR = (i - segs/2) * (ch/segs) * 0.4;
          fpR.style.setProperty('--tx', (txR + (Math.random()*2-1)*16) + 'px');
          fpR.style.setProperty('--ty', (tyR + (Math.random()*2-1)*20) + 'px');
          fpR.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
          fpR.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
          fpR.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
          fpR.style.animationDelay = Math.round(Math.random()*600) + 'ms';
          fpR.style.animationDuration = (3800 + Math.round(Math.random()*1200)) + 'ms';
          if (prevMat.indexOf('edge-jagged')>=0){ fpR.style.clipPath = 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)'; }
          else if (prevMat.indexOf('edge-soft')>=0){ fpR.style.borderRadius = '10px'; }
          layer.appendChild(fpR);
        }
      })();
      overlay.className = 'material-overlay ' + nextMat;
      overlay.style.opacity = (0.72 + Math.random() * 0.2).toFixed(2);
      overlay.classList.add('active');
      // Build assembly pieces for next image/material
      const nextSrc = newSrc;
      setTimeout(function(){
        const assemble = document.createElement('div');
        assemble.className = 'assemble-layer';
        container.appendChild(assemble);
        const cN = cfg(nextMat);
        for (let r=0; r<cN.rows; r++){
          for (let col=0; col<cN.cols; col++){
            const pa = document.createElement('div');
            const baseN = nextMat.split(' ')[0].replace('material-','');
            pa.className = 'piece piece-' + baseN + ' assemble';
            pa.style.width = (100/cN.cols) + '%';
            pa.style.height = (100/cN.rows) + '%';
            pa.style.left = (col*100/cN.cols) + '%';
            pa.style.top = (r*100/cN.rows) + '%';
            pa.style.backgroundImage = 'url(' + nextSrc + ')';
            pa.style.setProperty('--bgX', (cN.cols*100) + '%');
            pa.style.setProperty('--bgY', (cN.rows*100) + '%');
            const bxN = cN.cols>1 ? (col*100/(cN.cols-1)) : 0;
            const byN = cN.rows>1 ? (r*100/(cN.rows-1)) : 0;
            pa.style.setProperty('--bgPosX', bxN + '%');
            pa.style.setProperty('--bgPosY', byN + '%');
            const cxN = (col + 0.5)/cN.cols - 0.5;
            const cyN = (r + 0.5)/cN.rows - 0.5;
            let txN = cxN * cw * 0.6 * cN.scale;
            let tyN = cyN * ch * 0.6 * cN.scale;
            if (nextMat.indexOf('material-steel')===0){ if (Math.abs(cxN)>Math.abs(cyN)) { tyN *= 0.3; } else { txN *= 0.3; } }
            if (nextMat.indexOf('material-wood')===0){ txN *= 1.3; }
            if (nextMat.indexOf('material-tile')===0){ txN *= 0.9; tyN *= 0.9; }
            const rzN = (Math.random()*2-1) * cN.rot + 'deg';
            const rxN = ((Math.random()*2-1) * (cN.rot*0.3)) + 'deg';
            const ryN = ((Math.random()*2-1) * (cN.rot*0.3)) + 'deg';
            const jitterXN = (Math.random()*2-1) * 10;
            const jitterYN = (Math.random()*2-1) * 10;
            pa.style.setProperty('--tx', (txN + jitterXN) + 'px');
            pa.style.setProperty('--ty', (tyN + jitterYN) + 'px');
            pa.style.setProperty('--rz', rzN);
            pa.style.setProperty('--rx', rxN);
            pa.style.setProperty('--ry', ryN);
            pa.style.transform = 'translate(var(--tx), var(--ty)) rotateZ(var(--rz)) rotateX(var(--rx)) rotateY(var(--ry))';
            pa.style.animationDelay = Math.round(Math.random()*700) + 'ms';
            pa.style.animationDuration = (3600 + Math.round(Math.random()*1400)) + 'ms';
            if (nextMat.indexOf('edge-jagged')>=0){
              const tN = 2 + Math.random()*3;
              const bN = 2 + Math.random()*3;
              pa.style.clipPath = 'polygon(0% ' + tN + '%, 100% ' + (tN*0.8) + '%, 98% 100%, 0% ' + (100-bN) + '%)';
            } else if (nextMat.indexOf('edge-soft')>=0){
              pa.style.borderRadius = '6px';
            }
            assemble.appendChild(pa);
          }
        }
        // Frame ring assembly
        (function addFrameAssembly(){
          const baseN = nextMat.split(' ')[0].replace('material-','');
          const segs = 8;
          const thick = 0.08;
          // Top
          for (let i=0;i<segs;i++){
            const fp = document.createElement('div');
            fp.className = 'piece piece-' + baseN + ' assemble';
            fp.style.width = (100/segs) + '%';
            fp.style.height = (thick*100) + '%';
            fp.style.left = (i*100/segs) + '%';
            fp.style.top = '0%';
            const tx = (i - segs/2) * (cw/segs) * 0.4;
            const ty = -ch * 0.15 * cN.scale;
            fp.style.setProperty('--tx', (tx + (Math.random()*2-1)*20) + 'px');
            fp.style.setProperty('--ty', (ty + (Math.random()*2-1)*16) + 'px');
            fp.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
            fp.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
            fp.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
            fp.style.transform = 'translate(var(--tx), var(--ty)) rotateZ(var(--rz)) rotateX(var(--rx)) rotateY(var(--ry))';
            fp.style.animationDelay = Math.round(Math.random()*600) + 'ms';
            fp.style.animationDuration = (3400 + Math.round(Math.random()*1200)) + 'ms';
            if (nextMat.indexOf('edge-jagged')>=0){ fp.style.clipPath = 'polygon(0% 0%, 100% 0%, 98% 100%, 0% 95%)'; }
            else if (nextMat.indexOf('edge-soft')>=0){ fp.style.borderRadius = '10px'; }
            assemble.appendChild(fp);
          }
          // Bottom
          for (let i=0;i<segs;i++){
            const fp = document.createElement('div');
            fp.className = 'piece piece-' + baseN + ' assemble';
            fp.style.width = (100/segs) + '%';
            fp.style.height = (thick*100) + '%';
            fp.style.left = (i*100/segs) + '%';
            fp.style.top = (100 - thick*100) + '%';
            const tx = (i - segs/2) * (cw/segs) * 0.4;
            const ty = ch * 0.15 * cN.scale;
            fp.style.setProperty('--tx', (tx + (Math.random()*2-1)*20) + 'px');
            fp.style.setProperty('--ty', (ty + (Math.random()*2-1)*16) + 'px');
            fp.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
            fp.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
            fp.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
            fp.style.transform = 'translate(var(--tx), var(--ty)) rotateZ(var(--rz)) rotateX(var(--rx)) rotateY(var(--ry))';
            fp.style.animationDelay = Math.round(Math.random()*600) + 'ms';
            fp.style.animationDuration = (3400 + Math.round(Math.random()*1200)) + 'ms';
            if (nextMat.indexOf('edge-jagged')>=0){ fp.style.clipPath = 'polygon(0% 5%, 100% 0%, 100% 100%, 0% 100%)'; }
            else if (nextMat.indexOf('edge-soft')>=0){ fp.style.borderRadius = '10px'; }
            assemble.appendChild(fp);
          }
          // Left / Right
          for (let i=0;i<segs;i++){
            const fpL = document.createElement('div');
            fpL.className = 'piece piece-' + baseN + ' assemble';
            fpL.style.width = (thick*100) + '%';
            fpL.style.height = (100/segs) + '%';
            fpL.style.left = '0%';
            fpL.style.top = (i*100/segs) + '%';
            const txL = -cw * 0.12 * cN.scale;
            const tyL = (i - segs/2) * (ch/segs) * 0.4;
            fpL.style.setProperty('--tx', (txL + (Math.random()*2-1)*16) + 'px');
            fpL.style.setProperty('--ty', (tyL + (Math.random()*2-1)*20) + 'px');
            fpL.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
            fpL.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
            fpL.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
            fpL.style.transform = 'translate(var(--tx), var(--ty)) rotateZ(var(--rz)) rotateX(var(--rx)) rotateY(var(--ry))';
            fpL.style.animationDelay = Math.round(Math.random()*600) + 'ms';
            fpL.style.animationDuration = (3400 + Math.round(Math.random()*1200)) + 'ms';
            if (nextMat.indexOf('edge-jagged')>=0){ fpL.style.clipPath = 'polygon(0% 0%, 95% 0%, 100% 100%, 0% 100%)'; }
            else if (nextMat.indexOf('edge-soft')>=0){ fpL.style.borderRadius = '10px'; }
            assemble.appendChild(fpL);

            const fpR = document.createElement('div');
            fpR.className = 'piece piece-' + baseN + ' assemble';
            fpR.style.width = (thick*100) + '%';
            fpR.style.height = (100/segs) + '%';
            fpR.style.left = (100 - thick*100) + '%';
            fpR.style.top = (i*100/segs) + '%';
            const txR = cw * 0.12 * cN.scale;
            const tyR = (i - segs/2) * (ch/segs) * 0.4;
            fpR.style.setProperty('--tx', (txR + (Math.random()*2-1)*16) + 'px');
            fpR.style.setProperty('--ty', (tyR + (Math.random()*2-1)*20) + 'px');
            fpR.style.setProperty('--rz', ((Math.random()*2-1)*20) + 'deg');
            fpR.style.setProperty('--rx', ((Math.random()*2-1)*10) + 'deg');
            fpR.style.setProperty('--ry', ((Math.random()*2-1)*10) + 'deg');
            fpR.style.transform = 'translate(var(--tx), var(--ty)) rotateZ(var(--rz)) rotateX(var(--rx)) rotateY(var(--ry))';
            fpR.style.animationDelay = Math.round(Math.random()*600) + 'ms';
            fpR.style.animationDuration = (3400 + Math.round(Math.random()*1200)) + 'ms';
            if (nextMat.indexOf('edge-jagged')>=0){ fpR.style.clipPath = 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)'; }
            else if (nextMat.indexOf('edge-soft')>=0){ fpR.style.borderRadius = '10px'; }
            assemble.appendChild(fpR);
          }
        })();
      }, 1200);
      const cleanupDelay = 6500;
      setTimeout(function(){
        overlay.classList.remove('active');
        container.removeChild(layer);
        const as = container.querySelector('.assemble-layer'); if (as) container.removeChild(as);
        img.setAttribute('src', newSrc);
      }, cleanupDelay);
    }
    function cycle() {
      const prevSrc = img.getAttribute('src');
      const prevMat = materials[idx];
      const nextMat = materials[(idx + 1) % materials.length];
      const newSrc = urls[imgIdx];
      imgIdx = (imgIdx + 1) % urls.length;
      showCracks(prevMat);
      setTimeout(function(){
        createShatter(prevSrc, prevMat, nextMat, newSrc);
        idx = (idx + 1) % materials.length;
        cycleTimeout = setTimeout(cycle, 9400);
      }, 1400);
    }
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting && !running) { running = true; cycle(); }
        if (!e.isIntersecting && running) {
          running = false;
          clearTimeout(cycleTimeout);
          overlay.classList.remove('active');
        }
      });
    }, { threshold: 0.1 });
    io.observe(container);
  }
  window.addEventListener('load', initHeroMaterialCycle);

  function initHeroTypewriter(){
    const h1 = document.querySelector('.hero .hero-content h1');
    if (!h1) return;
    let wrapper = h1.querySelector('.typewriter-text');
    if (!wrapper) {
      wrapper = document.createElement('span');
      wrapper.className = 'typewriter-text';
      h1.textContent = '';
      h1.appendChild(wrapper);
    }
    wrapper.innerHTML = '';
    let content = wrapper.querySelector('.typewriter-content');
    if (!content) {
      content = document.createElement('span');
      content.className = 'typewriter-content';
      wrapper.appendChild(content);
    }
    let caret = wrapper.querySelector('.typewriter-caret');
    if (!caret) {
      caret = document.createElement('span');
      caret.className = 'typewriter-caret';
      wrapper.appendChild(caret);
    }

    const phrases = [
      [ {v: 'Building ', c: 'tw-accent'}, {v: "Tomorrow's ", c: 'tw-heading'}, {v: 'Landmarks Today', c: 'tw-brown'} ],
      [ {v: 'Engineering ', c: 'tw-accent'}, {v: 'Quality. ', c: 'tw-heading'}, {v: 'Delivering Confidence.', c: 'tw-brown'} ],
      [ {v: 'Equipment ', c: 'tw-accent'}, {v: 'Expertise ', c: 'tw-heading'}, {v: 'Excellence.', c: 'tw-brown'} ],
      [ {v: 'Strong Foundations. ', c: 'tw-heading'}, {v: 'Smart Solutions.', c: 'tw-accent'} ]
    ];

    function fullHTML(segs){
      let out = '';
      for (let i=0;i<segs.length;i++){
        const s = segs[i];
        out += '<span class="' + s.c + '">' + s.v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</span>';
      }
      return out;
    }
    function partialHTML(segs, n){
      let out = '';
      let rem = n;
      for (let i=0;i<segs.length;i++){
        const s = segs[i];
        if (rem <= 0) break;
        const take = Math.min(rem, s.v.length);
        const chunk = s.v.slice(0, take).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        out += '<span class="' + s.c + '">' + chunk + '</span>';
        rem -= take;
      }
      return out;
    }
    function totalLen(segs){
      let n = 0; for (let i=0;i<segs.length;i++) n += segs[i].v.length; return n;
    }

    let phraseIdx = 0;
    let idx = 0;
    let erasing = false;
    const typeDelay = 360;
    const eraseDelay = 240;
    const holdTyped = 2400;
    const holdErased = 1200;

    function reserveHeight(){
      const prevHTML = content.innerHTML;
      const prevVis = content.style.visibility;
      const prevCaretVis = caret.style.visibility;
      content.style.visibility = 'hidden';
      caret.style.visibility = 'hidden';
      let maxH = 0;
      for (let p=0;p<phrases.length;p++){
        content.innerHTML = fullHTML(phrases[p]);
        const h = h1.scrollHeight; if (h > maxH) maxH = h;
      }
      content.innerHTML = prevHTML;
      content.style.visibility = prevVis || '';
      caret.style.visibility = prevCaretVis || '';
      h1.style.height = maxH + 'px';
    }
    reserveHeight();
    let rTimer = null;
    window.addEventListener('resize', function(){
      clearTimeout(rTimer);
      rTimer = setTimeout(reserveHeight, 200);
    });

    function render(n){
      const segs = phrases[phraseIdx];
      content.innerHTML = partialHTML(segs, n);
    }

    function step(){
      const segs = phrases[phraseIdx];
      const len = totalLen(segs);
      if (!erasing) {
        if (idx < len) {
          idx++;
          render(idx);
          setTimeout(step, typeDelay);
        } else {
          setTimeout(function(){ erasing = true; step(); }, holdTyped);
        }
      } else {
        if (idx > 0) {
          idx--;
          render(idx);
          setTimeout(step, eraseDelay);
        } else {
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(function(){ erasing = false; step(); }, holdErased);
        }
      }
    }
    step();
  }
  window.addEventListener('load', initHeroTypewriter);

  function initChatbot() {
    const container = document.querySelector('.chatbot');
    if (!container) return;
    const panel = container.querySelector('.chatbot-panel');
    const toggle = container.querySelector('.chatbot-toggle');
    const closeBtn = container.querySelector('.chatbot-close');
    const badge = container.querySelector('.chatbot-badge');
    let greetedOnce = false;
    function greetFirstOpen(){
      if (!greetedOnce) {
        const tEl = showTyping();
        setTimeout(function(){
          if (tEl && tEl.parentNode) tEl.parentNode.removeChild(tEl);
          addMessage('chatbot', 'Hello! Welcome to G.U Solutions. May I know your name?');
        }, 500);
        greetedOnce = true;
      }
    }
    function toggleChat(){
      const isOpen = panel.classList.contains('open');
      panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      if (!isOpen) { if (badge) badge.style.display = 'none'; greetFirstOpen(); }
    }
    if (toggle) toggle.addEventListener('click', toggleChat);
    function clearChat(){ messages.innerHTML=''; history=[]; userName=''; greetedOnce=false; if (badge) badge.style.display='block'; }
    if (closeBtn) closeBtn.addEventListener('click', function(){ panel.classList.remove('open'); clearChat(); });
    let history = [];
    const messages = panel.querySelector('.chatbot-messages');
    const faqsContainer = panel.querySelector('.chatbot-faqs');
    const scrollUpBtn = panel.querySelector('.faq-scroll-up');
    const scrollDownBtn = panel.querySelector('.faq-scroll-down');
    let faqEventsBound = false;
    function ts(){ const d=new Date(); const p=n=>('0'+n).slice(-2); return d.getFullYear()+ '-' + p(d.getMonth()+1)+ '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()); }
    function persist(sender, message) { const entry={timestamp: ts(), sender, message}; history.push(entry); }
    function addMessage(sender, text, doPersist=true) { const item=document.createElement('div'); item.className='chatbot-msg ' + (sender==='user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'); item.textContent=text; messages.appendChild(item); messages.scrollTop=messages.scrollHeight; if (doPersist) persist(sender, text); }
    function timeGreeting(){ const h=new Date().getHours(); if(h<12) return 'Good morning'; if(h<18) return 'Good afternoon'; return 'Good evening'; }
    let userName = '';
    function greet(){ addMessage('chatbot', timeGreeting() + (userName? ', ' + userName:'') + '.'); addMessage('chatbot', 'Hello! How can I assist you today?'); }
    const faqs=[
      {patterns:['services','offer','our services'], answer:'We offer Earth Moving, Crane lifting, and Equipment leasing.'},
      {patterns:['contact','phone','email','reach'], answer:'Phone: 08039208659, 08028036656. Email: ezechigozie@gmail.com.'},
      {patterns:['head office','office address','port harcourt'], answer:'Head Office: Plot 279 Trans Amadi Port Harcourt.'},
      {patterns:['branch','branch office','awka','enugu','onitsha'], answer:'Branch Office: Km 10 Enugu-Onitsha Exp way, Opp Anambra State Fire Service, Awka.'},
      {patterns:['lease','equipment leasing','lease equipment'], answer:'Yes, we provide equipment leasing.'},
      {patterns:['company name','name','g.u solutions','gu solutions'], answer:'Company Name: G.U Solutions.'}
    ];
    const faqItems = [
      { q: 'What services do you offer?', a: 'We offer Earth Moving, Crane lifting, and Equipment leasing.' },
      { q: 'How can I contact you?', a: 'Phone: 08039208659, 08028036656. Email: ezechigozie@gmail.com.' },
      { q: 'Where is your head office?', a: 'Head Office: Plot 279 Trans Amadi Port Harcourt.' },
      { q: 'Where is your branch office?', a: 'Branch Office: Km 10 Enugu-Onitsha Exp way, Opp Anambra State Fire Service, Awka.' },
      { q: 'Do you provide equipment leasing?', a: 'Yes, we provide equipment leasing.' },
      { q: 'What is your company name?', a: 'Company Name: G.U Solutions.' }
    ];
    function findAnswer(text){ const t=text.toLowerCase(); for (const f of faqs){ for (const p of f.patterns){ if (t.includes(p)) return f.answer; } } return null; }
    function redirectWhatsApp(){
      const number = '+2348028036656';
      const nm = (userName && userName.trim()) ? userName.trim() : 'a visitor';
      const message = `Hi, I’m ${nm} visiting from your website. I would like to know more about your business.`;
      const wi = window.WhatsAppIntegration;
      try {
        if (wi && typeof wi.redirect === 'function') {
          if (wi.redirect.length >= 2) { wi.redirect(number, message); }
          else { wi.redirect({ number, message }); }
          return;
        }
        if (wi && typeof wi.start === 'function') { wi.start({ number, message }); return; }
        if (wi && typeof wi.open === 'function') { wi.open({ number, message }); return; }
      } catch(e) {}
      try {
        const url = `whatsapp://send?phone=${encodeURIComponent(number)}&text=${encodeURIComponent(message)}`;
        window.location.href = url;
      } catch(e) {}
    }
    function showTyping(){
      const item=document.createElement('div');
      item.className='chatbot-msg chatbot-msg-bot typing';
      item.textContent='Typing...';
      messages.appendChild(item);
      messages.scrollTop=messages.scrollHeight;
      return item;
    }
    function typeOutFaqs(){
      const lines=[
        'Here are some questions you might want to ask:',
        '1. What services do you offer?',
        '2. How can I contact you?',
        '3. Where is your head office?',
        '4. Where is your branch office?',
        '5. Do you provide equipment leasing?',
        '6. What is your company name?'
      ];
      let i=0;
      function step(){
        const t=showTyping();
        setTimeout(function(){
          if (t && t.parentNode) t.parentNode.removeChild(t);
          addMessage('chatbot', lines[i]);
          i++;
          if (i<lines.length) step();
        }, 500);
      }
      step();
    }

    
    function detectPricingIntent(s){
      const t=String(s||'').toLowerCase();
      const k=['price','pricing','cost','fee','fees','subscription','plan','plans','payment','payments','discount','discounts','money','quote','quotes','budget','invoice','invoices','estimate','estimates','amount','rate','rates','tariff','tariffs','charge','charges'];
      for(let i=0;i<k.length;i++){ if(t.indexOf(k[i])>=0) return true; }
      return /(\$|₦|£|€)/.test(t);
    }
    async function askAssistantText(userText){
      const endpoint = window.CHAT_API_ENDPOINT || '';
      const key = window.OPENAI_API_KEY || '';
      const sys = 'You are the official G.U Solutions assistant. Answer questions about the platform, features, usage, onboarding, services, contacts, and troubleshooting. Never provide pricing or monetary amounts. If the user asks about pricing, costs, fees, subscriptions, plans, payment, discounts, or money, do not provide prices and instruct them to contact the owner on WhatsApp. Keep answers concise.';
      const ctx = history.map(function(h){ return { role: h.sender==='user' ? 'user' : 'assistant', content: h.message }; }).slice(-8);
      const msgs = [{role:'system',content:sys}].concat(ctx).concat([{role:'user',content:userText}]);
      try{
        if(endpoint){
          const r = await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:msgs})});
          if(!r.ok) return null;
          const j = await r.json();
          const txt = j.reply || j.content || j.message || (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
          if(!txt) return null;
          return txt.trim();
        } else if (key){
          const r = await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify({model:'gpt-4o-mini',messages:msgs,temperature:0.3})});
          if(!r.ok) return null;
          const j = await r.json();
          const txt = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
          if(!txt) return null;
          return txt.trim();
        }
      }catch(e){}
      return null;
    }
    const inputForm = panel.querySelector('.chatbot-input');
    inputForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const input=panel.querySelector('.chatbot-input input');
      const text=input.value.trim();
      if(!text) return;
      addMessage('user', text);

      if (!userName) {
        userName = text;
        const tEl1 = showTyping();
        setTimeout(function(){ if (tEl1 && tEl1.parentNode) tEl1.parentNode.removeChild(tEl1); addMessage('chatbot', 'Thank you, ' + userName + '. Welcome to G.U Solutions!'); }, 500);
        const tEl2 = showTyping();
        setTimeout(function(){ if (tEl2 && tEl2.parentNode) tEl2.parentNode.removeChild(tEl2); addMessage('chatbot', 'Here are some common questions you might want to ask:'); typeOutFaqs(); }, 1100);
        input.value='';
        return;
      }

      const t=text.toLowerCase();
      if (detectPricingIntent(t)) { addMessage('chatbot','For pricing details, please contact the owner directly on WhatsApp to discuss your specific needs.'); redirectWhatsApp(); input.value=''; return; }
      if (t.includes('thank')) { addMessage('chatbot', 'You’re welcome!'); input.value=''; return; }
      if (t.includes('bye') || t.includes('goodbye')) { addMessage('chatbot', 'Goodbye! Have a great day.'); input.value=''; return; }

      const greetings = /(\bhi\b|\bhello\b|\bhey\b|good\s*(morning|afternoon|evening))/;
      const wantsOwner = ((/(\bowner\b|\bceo\b)/.test(t) || /(connect|contact|speak|talk|reach).*?(owner|ceo)/.test(t) || /whatsapp/.test(t)) && !greetings.test(t));
      if (wantsOwner) {
        addMessage('chatbot', 'Let me connect you directly to the owner for more details.');
        redirectWhatsApp();
        input.value='';
        return;
      }

      const ans = findAnswer(text);
      const typing = showTyping();
      let reply = null;
      try { reply = await askAssistantText(text); } catch(e) { reply = null; }
      if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
      if (reply) {
        if (detectPricingIntent(reply.toLowerCase())) { addMessage('chatbot','For pricing details, please contact the owner directly on WhatsApp to discuss your specific needs.'); redirectWhatsApp(); }
        else { addMessage('chatbot', reply); addMessage('chatbot', 'You can ask another question.'); }
      } else if (ans) {
        addMessage('chatbot', ans);
        addMessage('chatbot', 'You can ask another question.');
      } else {
        addMessage('chatbot', 'Let me connect you directly to the owner for more details.');
        redirectWhatsApp();
      }
      input.value='';
    });
    
  }
  window.addEventListener('load', initChatbot);

})();

