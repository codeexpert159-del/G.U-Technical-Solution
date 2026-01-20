/**
 * G.U Technical Solutions AI Chatbot
 * Handles customer inquiries about services, with WhatsApp redirect for pricing
 */

class GUChatbot {
  constructor() {
    this.whatsappNumber = '2348028036656'; // WhatsApp number without + symbol
    this.toggle = document.querySelector('.chatbot-toggle');
    this.panel = document.querySelector('.chatbot-panel');
    this.messagesContainer = document.querySelector('.chatbot-messages');
    this.form = document.querySelector('.chatbot-input');
    this.closeBtn = document.querySelector('.chatbot-close');
    this.input = document.querySelector('.chatbot-input input');
    
    // State tracking
    this.userName = null;
    this.greetingShown = false;
    
    this.init();
  }

  init() {
    if (!this.toggle || !this.panel) return;
    
    this.toggle.addEventListener('click', () => this.togglePanel());
    this.closeBtn.addEventListener('click', () => this.togglePanel());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  togglePanel() {
    this.panel.classList.toggle('active');
    if (this.panel.classList.contains('active')) {
      // Show greeting only once when panel is first opened
      if (!this.greetingShown && this.messagesContainer.children.length === 0) {
        this.addBotMessage('Hello! Welcome to G.U Solutions. May I know your name?');
        this.greetingShown = true;
      }
      this.input.focus();
    }
  }

  togglePanel() {
    this.panel.classList.toggle('active');
    if (this.panel.classList.contains('active')) {
      this.input.focus();
    }
  }

  addBotMessage(text, isTyping = true) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    msgDiv.appendChild(contentDiv);
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    
    if (isTyping) {
      this.typeMessage(contentDiv, text);
    } else {
      contentDiv.innerHTML = text;
    }
  }

  typeMessage(element, text, speed = 20) {
    let index = 0;
    let processedHTML = '';
    let isHTML = false;
    let htmlBuffer = '';
    
    const typeNextChar = () => {
      if (index < text.length) {
        const char = text[index];
        
        // Handle HTML tags
        if (char === '<') {
          isHTML = true;
          htmlBuffer = '<';
        } else if (char === '>' && isHTML) {
          htmlBuffer += '>';
          processedHTML += htmlBuffer;
          isHTML = false;
          htmlBuffer = '';
        } else if (isHTML) {
          htmlBuffer += char;
        } else if (char === '\n') {
          // Convert newline to <br> tag
          processedHTML += '<br>';
        } else {
          processedHTML += char;
        }
        
        element.innerHTML = processedHTML + (isHTML ? htmlBuffer : '');
        this.scrollToBottom();
        index++;
        setTimeout(typeNextChar, speed);
      }
    };
    
    typeNextChar();
  }

  addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user-message';
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 0);
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.input.value.trim();
    if (!text) return;

    this.addUserMessage(text);
    this.input.value = '';

    // Simulate typing indicator
    setTimeout(() => {
      const response = this.getResponse(text);
      this.addBotMessage(response);
    }, 800);
  }

  getResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // If we don't have a name yet, check if user is providing their name
    if (!this.userName && !this.hasServiceKeywords(message) && message.length < 50) {
      // Check if it looks like a name (short message, no question marks, no special keywords)
      if (!message.includes('?') && !this.isPricingQuery(message) && !this.hasServiceKeywords(message)) {
        this.userName = userMessage;
        return `Nice to meet you, ${userMessage}! 👋\n\nHow can I assist you today? I can help you with:\n\n• Equipment Leasing\n• Crane Lifting Services\n• Earth Moving & Excavation\n• Surveying & Geotechnical Services\n• Logistics & Haulage\n\nOr feel free to ask any other questions!`;
      }
    }

    // Check for project inquiries
    if (message.includes('project') || message.includes('work') || message.includes('done')) {
      return this.getProjectsInfo(message);
    }

    // Check for pricing inquiries - redirect to WhatsApp
    if (this.isPricingQuery(message)) {
      return this.getPricingResponse(userMessage);
    }

    // Service-specific responses
    if (message.includes('equipment') || message.includes('leasing')) {
      return this.getEquipmentLeasingInfo(message);
    }

    if (message.includes('crane') || message.includes('lifting')) {
      return this.getCraneLiftingInfo(message);
    }

    if (message.includes('earth') || message.includes('moving')) {
      return this.getEarthMovingInfo(message);
    }

    if (message.includes('survey') || message.includes('geotechnical')) {
      return this.getSurveyingInfo(message);
    }

    if (message.includes('logistic') || message.includes('haulage') || message.includes('transport')) {
      return this.getLogisticsInfo(message);
    }

    // General company info
    if (message.includes('about') || message.includes('company') || message.includes('who are you')) {
      return this.getCompanyInfo();
    }

    if (message.includes('location') || message.includes('address') || message.includes('office')) {
      return this.getLocationInfo();
    }

    if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
      return this.getContactInfo();
    }

    if (message.includes('team') || message.includes('staff')) {
      return this.getTeamInfo();
    }

    // Construction general knowledge
    if (message.includes('construction')) {
      return this.getConstructionInfo(message);
    }

    // Default response
    return this.getDefaultResponse(message);
  }

  hasServiceKeywords(message) {
    const keywords = ['equipment', 'leasing', 'crane', 'lifting', 'earth', 'moving', 'survey', 'geotechnical', 'logistic', 'haulage', 'transport', 'about', 'company', 'location', 'address', 'office', 'contact', 'email', 'phone', 'team', 'staff', 'construction', 'price', 'cost', 'rate', 'quote', 'how much', 'fee', 'charge', 'project', 'work', 'done'];
    return keywords.some(keyword => message.includes(keyword));
  }

  getProjectsInfo(message) {
    const projects = [
      {
        title: 'Greenfield Estate Site Preparation',
        category: 'Private',
        status: 'Completed',
        description: 'Excavation, grading, and land clearing to prepare a 5-hectare residential estate for safe construction.',
        size: '5 Hectares',
        duration: '6 Weeks',
        location: 'Port Harcourt, Nigeria'
      },
      {
        title: 'Eastline Residential Estate Development',
        category: 'Residential',
        status: 'In Progress',
        description: 'Ongoing earthworks, foundation preparation, equipment deployment, and crane operations for a modern housing community.',
        size: '68 Units',
        duration: '9 Months',
        location: 'Enugu, Nigeria'
      },
      {
        title: 'Heavy Machinery Supply for Road Expansion',
        category: 'Infrastructure',
        status: 'Completed',
        description: 'Provided excavators, bulldozers, and compactors for a major road rehabilitation project on short- and long-term rental.',
        size: '12 Machines',
        duration: '4 Months',
        location: 'Owerri, Nigeria'
      },
      {
        title: 'City General Hospital Expansion',
        category: 'Healthcare',
        status: 'Completed',
        description: 'Construction of additional wards, operating theaters, and laboratory facilities to improve patient care and hospital capacity.',
        size: '8 Wards',
        duration: '12 Months',
        location: 'Lagos, Nigeria'
      },
      {
        title: 'Modern Secondary School Campus Development',
        category: 'Educational',
        status: 'Planning',
        description: 'Design and planning of classrooms, laboratories, administrative blocks, and sports facilities for a new educational campus.',
        size: '24 Classrooms',
        duration: '4 Months',
        location: 'Abuja, Nigeria'
      },
      {
        title: 'Industrial Manufacturing Plant Construction',
        category: 'Industrial',
        status: 'Completed',
        description: 'Construction of a steel fabrication and assembly plant including factory halls, loading docks, and storage facilities.',
        size: '15,000 m²',
        duration: '14 Months',
        location: 'Port Harcourt, Nigeria'
      }
    ];

    let response = '📁 Our Recent Projects\n\n';
    response += 'Here are some of the major construction projects we have successfully completed or are currently working on:\n\n';
    
    projects.forEach((project, index) => {
      response += `${index + 1}. ${project.title}\n`;
      response += `├─ Category: ${project.category}\n`;
      response += `├─ Status: ${project.status}\n`;
      response += `├─ Location: ${project.location}\n`;
      response += `├─ Size: ${project.size}\n`;
      response += `├─ Duration: ${project.duration}\n`;
      response += `└─ ${project.description}\n\n`;
    });
    
    response += '💼 Interested in discussing a project?\n\n';
    response += '<a href="https://wa.me/2348028036656?text=I%20want%20to%20discuss%20a%20project" target="_blank" class="whatsapp-link">📱 Chat with us on WhatsApp</a>';
    
    return response;
  }

  isPricingQuery(message) {
    const pricingKeywords = ['price', 'cost', 'rate', 'quote', 'how much', 'fee', 'charge', 'expensive', 'affordable', 'payment', 'budget'];
    return pricingKeywords.some(keyword => message.includes(keyword));
  }

  getPricingResponse(userMessage) {
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(userMessage)}`;
    return `Let me connect you with our owner for pricing details! 💼\n\n<a href="${whatsappUrl}" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>`;
  }

  getEquipmentLeasingInfo(message) {
    let info = '🏗️ Equipment Leasing Services\n\n';
    info += 'We offer a wide range of reliable, well-maintained equipment to support your construction activities.\n\n';
    
    info += 'Equipment Available:\n';
    info += '• Excavators • Bulldozers • Graders • Dumpers\n';
    info += '• Concrete Mixers • Vibrators • Generators\n';
    info += '• And much more!\n\n';
    
    info += 'Why Choose Our Equipment Leasing?\n';
    info += '✓ Modern, well-maintained machines\n';
    info += '✓ Flexible rental periods\n';
    info += '✓ Competitive pricing\n';
    info += '✓ Expert support included\n';
    info += '✓ Reduce capital costs\n\n';
    info += '💰 For pricing details:\n\n';
    const whatsappUrl = `https://wa.me/2348028036656?text=I%20need%20equipment%20leasing%20details`;
    info += `<a href="${whatsappUrl}" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>`;
    
    return info;
  }

  getCraneLiftingInfo(message) {
    let info = '🏗️ Crane Lifting Services\n\n';
    info += 'Professional crane and lifting solutions for heavy construction projects.\n\n';
    
    info += 'Services Include:\n';
    info += '• Mobile crane operations\n';
    info += '• Tower crane services\n';
    info += '• Heavy load lifting\n';
    info += '• Equipment positioning\n';
    info += '• Safety compliance\n';
    info += '• Professional operators\n\n';
    
    info += 'Capabilities:\n';
    info += 'We handle loads from light to extremely heavy with precision and safety.\n\n';
    
    info += '💰 For pricing details:\n\n';
    const whatsappUrl = `https://wa.me/2348028036656?text=I%20need%20crane%20lifting%20services`;
    info += `<a href="${whatsappUrl}" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>`;
    
    return info;
  }

  getEarthMovingInfo(message) {
    let info = '🏗️ Earth Moving Services\n\n';
    info += 'Comprehensive earth moving and excavation services for all construction needs.\n\n';
    
    info += 'Services Include:\n';
    info += '• Site excavation\n';
    info += '• Grading & leveling\n';
    info += '• Material hauling\n';
    info += '• Foundations preparation\n';
    info += '• Landscape grading\n';
    info += '• Precision earthwork\n\n';
    
    info += 'Our Expertise:\n';
    info += 'Years of experience in handling complex earthwork projects across Nigeria.\n\n';
    
    info += '💰 For pricing details:\n\n';
    const whatsappUrl = `https://wa.me/2348028036656?text=I%20need%20earth%20moving%20services`;
    info += `<a href="${whatsappUrl}" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>`;
    
    return info;
  }

  getSurveyingInfo(message) {
    let info = '🏗️ Surveying & Geotechnical Services\n\n';
    info += 'Professional surveying and geotechnical analysis for construction projects.\n\n';
    
    info += 'Services Include:\n';
    info += '• Land surveying\n';
    info += '• Soil testing & analysis\n';
    info += '• Borehole drilling\n';
    info += '• Geotechnical reports\n';
    info += '• Site assessment\n';
    info += '• Foundation design support\n\n';
    
    info += 'Why It Matters:\n';
    info += 'Proper surveying ensures accurate project execution and prevents costly mistakes.\n\n';
    
    info += '💰 For pricing details:\n\n';
    const whatsappUrl = `https://wa.me/2348028036656?text=I%20need%20surveying%20services`;
    info += `<a href="${whatsappUrl}" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>`;
    
    return info;
  }

  getLogisticsInfo(message) {
    let info = '🏗️ Logistics & Haulage Services\n\n';
    info += 'Reliable transportation and logistics solutions for construction materials and equipment.\n\n';
    
    info += 'Services Include:\n';
    info += '• Material haulage\n';
    info += '• Equipment transport\n';
    info += '• Heavy load logistics\n';
    info += '• Timely deliveries\n';
    info += '• Route planning\n';
    info += '• Safe handling\n\n';
    
    info += 'Our Commitment:\n';
    info += 'Safe, timely, and cost-effective transportation solutions.\n\n';
    
    info += '💰 For pricing details:\n\n';
    const whatsappUrl = `https://wa.me/2348028036656?text=I%20need%20logistics%20services`;
    info += `<a href="${whatsappUrl}" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>`;
    
    return info;
  }

  getCompanyInfo() {
    return '🏢 About G.U Technical Solutions\n\n' +
      'We are a leading construction support company specializing in:\n\n' +
      '• Equipment Leasing\n' +
      '• Crane Lifting Services\n' +
      '• Earth Moving & Excavation\n' +
      '• Surveying & Geotechnical Services\n' +
      '• Logistics & Haulage\n\n' +
      'Our Mission:\n' +
      'Building stronger, safer, and more efficient construction projects across Nigeria.\n\n' +
      'Why Choose Us?\n' +
      '✓ Professional expertise\n' +
      '✓ Well-maintained equipment\n' +
      '✓ Experienced team\n' +
      '✓ Competitive pricing\n' +
      '✓ Safety-focused operations\n\n' +
      '💼 Ready to work with us?\n\n' +
      '<a href="https://wa.me/2348028036656?text=Tell%20me%20more%20about%20G.U%20Solutions" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>';
  }

  getLocationInfo() {
    return '📍 Our Locations\n\n' +
      'Head Office:\n' +
      'Plot 279 Trans Amadi\n' +
      'Port Harcourt, Nigeria\n\n' +
      'Branch Office:\n' +
      'Km 10 Enugu-Onitsha Expressway\n' +
      'Opp Anambra State Fire Service\n' +
      'Awka, Nigeria\n\n' +
      '💼 Ready to discuss your project?\n\n' +
      '<a href="https://wa.me/2348028036656?text=I%20want%20to%20discuss%20a%20project" target="_blank" class="whatsapp-link">📱 Chat with us on WhatsApp</a>';
  }

  getContactInfo() {
    return '📞 Get In Touch\n\n' +
      'WhatsApp:\n' +
      '<a href="https://wa.me/2348028036656" target="_blank" class="whatsapp-link">📱 +234 802 803 6656</a>\n\n' +
      'Email:\n' +
      '📧 ezechigozie@gmail.com\n\n' +
      'Phone:\n' +
      '☎️ +234 802 803 6656\n\n' +
      'Business Hours:\n' +
      'Monday - Saturday, 9AM - 7PM\n\n' +
      'Visit our <a href="contact.html">Contact Page</a> for more details';
  }

  getTeamInfo() {
    return '👥 Our Expert Team\n\n' +
      'G.U Technical Solutions is led by experienced professionals with years of expertise in construction support services.\n\n' +
      'Our Team Brings:\n' +
      '✓ Deep industry knowledge\n' +
      '✓ Proven project management\n' +
      '✓ Safety expertise\n' +
      '✓ Customer commitment\n\n' +
      'Meet our full team: <a href="team.html">View Team Page</a>\n\n' +
      '💼 Questions about our experience?\n\n' +
      '<a href="https://wa.me/2348028036656?text=Tell%20me%20about%20your%20team" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>';
  }

  getConstructionInfo(message) {
    let info = '🏗️ Construction Solutions\n\n';
    
    if (message.includes('project')) {
      info += 'We support construction projects through multiple specialized services:\n\n';
      info += '1. Planning Phase\n';
      info += '   → Surveying & geotechnical analysis\n\n';
      info += '2. Execution Phase\n';
      info += '   → Equipment, machinery, and labor support\n\n';
      info += '3. Logistics\n';
      info += '   → Material and equipment transportation\n\n';
    }
    
    if (message.includes('challenge') || message.includes('problem')) {
      info += 'Common construction challenges we solve:\n\n';
      info += '• Equipment availability\n';
      info += '• Heavy load transportation\n';
      info += '• Soil assessment & foundation issues\n';
      info += '• Project timeline delays\n\n';
    }
    
    info += '💼 Tell us about your construction project:\n\n';
    info += '<a href="https://wa.me/2348028036656?text=I%20have%20a%20construction%20project" target="_blank" class="whatsapp-link">📱 Chat on WhatsApp</a>';
    
    return info;
  }

  getDefaultResponse(userMessage) {
    // Always use the same general response for all pages
    return `I'd love to help! 💡\n\nCould you be more specific?\n\nAre you asking about:\n\n• A particular service we offer?\n• How to get started with a project?\n• Our pricing or availability?\n• Something else?\n\nFeel free to ask, or <a href="https://wa.me/2348028036656" target="_blank" class="whatsapp-link">📱 chat with us on WhatsApp</a>!`;
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GUChatbot();
});
