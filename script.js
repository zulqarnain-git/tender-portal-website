// Sample data
const tenders = [
    {
        id: 1,
        title: "Infrastructure Development Project",
        category: "construction",
        value: "$2.5M",
        closingDate: "2025-06-15",
        status: "open",
        organization: "City Municipal Corp",
        description: "Complete infrastructure overhaul including roads, drainage, and utilities for the downtown district.",
        eligibility: "Licensed construction companies with 5+ years experience"
    },
    {
        id: 2,
        title: "IT Services and Support Contract",
        category: "technology",
        value: "$800K",
        closingDate: "2025-06-02",
        status: "closing",
        organization: "Department of Technology",
        description: "Comprehensive IT support services including hardware maintenance, software licensing, and technical support.",
        eligibility: "IT companies with government sector experience"
    },
    {
        id: 3,
        title: "Healthcare Equipment Procurement",
        category: "healthcare",
        value: "$1.2M",
        closingDate: "2025-05-28",
        status: "urgent",
        organization: "State Health Department",
        description: "Procurement of advanced medical equipment for regional hospitals including MRI machines and diagnostic tools.",
        eligibility: "Certified medical equipment suppliers"
    },
    {
        id: 4,
        title: "Educational Software Development",
        category: "education",
        value: "$450K",
        closingDate: "2025-06-20",
        status: "open",
        organization: "Education Ministry",
        description: "Development of interactive learning platform for K-12 students with multilingual support.",
        eligibility: "Software development companies with education sector portfolio"
    },
    {
        id: 5,
        title: "Green Energy Initiative",
        category: "construction",
        value: "$3.2M",
        closingDate: "2025-05-30",
        status: "urgent",
        organization: "Environmental Agency",
        description: "Installation of solar panels and wind turbines for government buildings across the region.",
        eligibility: "Renewable energy contractors with proven track record"
    },
    {
        id: 6,
        title: "Digital Transformation Project",
        category: "technology",
        value: "$1.8M",
        closingDate: "2025-07-01",
        status: "open",
        organization: "Government Digital Office",
        description: "Modernization of legacy systems and implementation of cloud-based solutions.",
        eligibility: "Technology companies specializing in digital transformation"
    }
];

const fundingOpportunities = [
    {
        id: 1,
        title: "Green Technology Innovation Grant",
        amount: "$500K",
        eligibility: "Startups, SMEs",
        deadline: "2025-07-15",
        description: "Supporting innovative solutions for environmental sustainability and clean energy."
    },
    {
        id: 2,
        title: "Digital Transformation Fund",
        amount: "$750K",
        eligibility: "Government Agencies",
        deadline: "2025-08-01",
        description: "Accelerating digital transformation initiatives in public sector organizations."
    },
    {
        id: 3,
        title: "Community Development Grant",
        amount: "$300K",
        eligibility: "NGOs, Community Groups",
        deadline: "2025-06-30",
        description: "Supporting community-led development projects and social impact initiatives."
    },
    {
        id: 4,
        title: "Healthcare Innovation Fund",
        amount: "$1M",
        eligibility: "Healthcare Organizations",
        deadline: "2025-09-15",
        description: "Funding for innovative healthcare solutions and medical technology development."
    },
    {
        id: 5,
        title: "Education Technology Grant",
        amount: "$600K",
        eligibility: "Educational Institutions",
        deadline: "2025-08-20",
        description: "Supporting the development of cutting-edge educational technology and learning platforms."
    },
    {
        id: 6,
        title: "Small Business Development Fund",
        amount: "$250K",
        eligibility: "Small Businesses",
        deadline: "2025-07-30",
        description: "Empowering small businesses with funding for growth and expansion initiatives."
    }
];

const faqs = [
    {
        question: "How do I register to participate in tenders?",
        answer: "You can register by clicking the 'Register' button and filling out the vendor registration form. You'll need to provide company details, certifications, and financial information."
    },
    {
        question: "What documents are required for bid submission?",
        answer: "Typically required documents include: company registration certificate, tax clearance, financial statements, technical proposal, and any specific certifications mentioned in the tender notice."
    },
    {
        question: "How can I track my submitted bids?",
        answer: "Once logged in, you can access your dashboard to view all submitted bids, their status, and any updates or communications from the tendering organization."
    },
    {
        question: "What happens if I miss the submission deadline?",
        answer: "Unfortunately, late submissions are not accepted. We recommend submitting your bids well before the deadline to avoid any technical issues."
    },
    {
        question: "How is the evaluation process conducted?",
        answer: "Bids are evaluated based on technical merit, financial proposal, and compliance with tender requirements. The process is transparent and follows strict evaluation criteria."
    },
    {
        question: "Can I modify my bid after submission?",
        answer: "Bid modifications are generally not allowed after submission. However, in exceptional circumstances and before the deadline, you may contact the tendering organization directly."
    }
];

// Utility functions
// Date formatting utility
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Countdown timer utility
function getCountdown(targetDate) {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            expired: false
        };
    }
    
    return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true
    };
}

// Check if tender is closing soon (within 5 days)
function isClosingSoon(closingDate) {
    const now = new Date();
    const closing = new Date(closingDate);
    const diffTime = closing.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 5 && diffDays > 0;
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filter tenders based on search and category
function filterTenders(tenders, searchQuery, category) {
    return tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             tender.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             tender.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = category === 'all' || tender.category === category;
        return matchesSearch && matchesCategory;
    });
}

// Generate random ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification (simple alert replacement)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-black' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    let numAmount = amount.replace(/[$,KM]/g, '');
    
    if (amount.includes('K')) {
        numAmount = parseFloat(numAmount) * 1000;
    } else if (amount.includes('M')) {
        numAmount = parseFloat(numAmount) * 1000000;
    }
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numAmount);
}

// Local storage utilities
const storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage not available');
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Local storage not available');
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Local storage not available');
        }
    }
};

// TenderHub Class
class TenderHub {
    constructor() {
        this.currentTenders = [...tenders];
        this.countdownTimers = new Map();
        this.init();
    }

    init() {
        this.initLucideIcons();
        this.setupEventListeners();
        this.renderTenderCards();
        this.renderClosingSoonCards();
        this.renderFundingCards();
        this.renderFAQs();
        this.startCountdownTimers();
        this.setupScrollEffects();
    }

    initLucideIcons() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.handleCategoryFilter(e.target.value);
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                scrollToElement(targetId);
            });
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('mobile-menu').classList.add('hidden');
            });
        });
    }

    handleSearch(query) {
        const categoryFilter = document.getElementById('category-filter');
        const category = categoryFilter ? categoryFilter.value : 'all';
        this.filterAndRenderTenders(query, category);
    }

    handleCategoryFilter(category) {
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value : '';
        this.filterAndRenderTenders(query, category);
    }

    filterAndRenderTenders(searchQuery = '', category = 'all') {
        const filteredTenders = filterTenders(this.currentTenders, searchQuery, category);
        this.renderTenderCards(filteredTenders);
        
        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        const tenderCards = document.getElementById('tender-cards');
        
        if (filteredTenders.length === 0) {
            noResults.classList.remove('hidden');
            tenderCards.classList.add('hidden');
        } else {
            noResults.classList.add('hidden');
            tenderCards.classList.remove('hidden');
        }
    }

    renderTenderCards(tendersToRender = this.currentTenders) {
        const container = document.getElementById('tender-cards');
        if (!container) return;

        container.innerHTML = '';

        tendersToRender.forEach(tender => {
            const card = this.createTenderCard(tender);
            container.appendChild(card);
        });

        // Re-initialize icons for new content
        this.initLucideIcons();
    }

    renderClosingSoonCards() {
        const container = document.getElementById('closing-soon-cards');
        if (!container) return;

        const closingSoonTenders = this.currentTenders.filter(tender => isClosingSoon(tender.closingDate));
        
        if (closingSoonTenders.length === 0) {
            document.getElementById('closing-soon').style.display = 'none';
            return;
        }

        container.innerHTML = '';

        closingSoonTenders.forEach(tender => {
            const card = this.createTenderCard(tender, true);
            card.classList.add('w-80', 'flex-shrink-0');
            container.appendChild(card);
        });

        this.initLucideIcons();
    }

    renderFundingCards() {
        const container = document.getElementById('funding-cards');
        if (!container) return;

        container.innerHTML = '';

        fundingOpportunities.forEach(funding => {
            const card = this.createFundingCard(funding);
            container.appendChild(card);
        });

        this.initLucideIcons();
    }

    createTenderCard(tender, isClosingSoon = false) {
        const card = document.createElement('div');
        card.className = 'tender-card p-6';
        card.setAttribute('data-tender-id', tender.id);

        const countdown = getCountdown(tender.closingDate);
        const showCountdown = isClosingSoon || tender.status === 'urgent' || tender.status === 'closing';

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg text-gray-900 mb-2 font-poppins">${tender.title}</h3>
                    <p class="text-gray-600 text-sm mb-3">${tender.organization}</p>
                </div>
                <span class="status-badge status-${tender.status}">
                    ${tender.status}
                </span>
            </div>
            
            <p class="text-gray-700 text-sm mb-4 line-clamp-2">${tender.description}</p>
            
            <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Value:</span>
                    <span class="font-medium text-green-600">${tender.value}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Closing:</span>
                    <span class="font-medium">${formatDate(tender.closingDate)}</span>
                </div>
            </div>

            ${showCountdown ? `
                <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div class="flex items-center gap-2 text-red-700 text-sm font-medium">
                        <i data-lucide="clock" class="w-4 h-4"></i>
                        <span class="countdown-text" data-target="${tender.closingDate}">
                            Closing in: ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m
                        </span>
                    </div>
                </div>
            ` : ''}
            
            <div class="flex gap-2">
                <button class="flex-1 btn-primary" onclick="tenderHub.viewTenderDetails(${tender.id})">
                    <i data-lucide="eye" class="w-4 h-4 mr-2 inline"></i>
                    View Details
                </button>
                <button class="btn-secondary" onclick="tenderHub.downloadTender(${tender.id})">
                    <i data-lucide="download" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        return card;
    }

    createFundingCard(funding) {
        const card = document.createElement('div');
        card.className = 'bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl';

        card.innerHTML = `
            <div class="mb-4">
                <h3 class="font-semibold text-lg mb-2 font-poppins">${funding.title}</h3>
                <p class="text-purple-100 text-sm">${funding.description}</p>
            </div>
            
            <div class="space-y-2 mb-4">
                <div class="flex justify-between">
                    <span class="text-purple-200">Amount:</span>
                    <span class="font-bold text-xl">${funding.amount}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-purple-200">Eligibility:</span>
                    <span class="font-medium">${funding.eligibility}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-purple-200">Deadline:</span>
                    <span class="font-medium">${formatDate(funding.deadline)}</span>
                </div>
            </div>
            
            <button class="w-full bg-white text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors" onclick="tenderHub.applyForFunding(${funding.id})">
                Apply Now
            </button>
        `;

        return card;
    }

    renderFAQs() {
        const container = document.getElementById('faq-container');
        if (!container) return;

        container.innerHTML = '';

        faqs.forEach((faq, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'bg-white rounded-lg shadow-sm border border-gray-200';

            faqItem.innerHTML = `
                <button
                    class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onclick="tenderHub.toggleFAQ(${index})"
                >
                    <span class="font-medium text-gray-900 font-poppins">${faq.question}</span>
                    <i data-lucide="chevron-down" class="w-5 h-5 text-gray-500 faq-icon" id="faq-icon-${index}"></i>
                </button>
                <div class="px-6 pb-4 hidden" id="faq-answer-${index}">
                    <p class="text-gray-600">${faq.answer}</p>
                </div>
            `;

            container.appendChild(faqItem);
        });

        this.initLucideIcons();
    }

    toggleFAQ(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        
        if (answer && icon) {
            answer.classList.toggle('hidden');
            icon.setAttribute('data-lucide', answer.classList.contains('hidden') ? 'chevron-down' : 'chevron-up');
            this.initLucideIcons();
        }
    }

    startCountdownTimers() {
        // Update countdown timers every second
        setInterval(() => {
            document.querySelectorAll('.countdown-text').forEach(element => {
                const targetDate = element.getAttribute('data-target');
                const countdown = getCountdown(targetDate);
                
                if (!countdown.expired) {
                    element.textContent = `Closing in: ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`;
                } else {
                    element.textContent = 'Closed';
                    element.parentElement.classList.add('bg-gray-100');
                    element.parentElement.classList.remove('bg-red-50');
                }
            });
        }, 60000); // Update every minute
    }

    setupScrollEffects() {
        // Add scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('bg-white/95', 'backdrop-blur-sm');
            } else {
                header.classList.remove('bg-white/95', 'backdrop-blur-sm');
            }
        });
    }

    // Action methods
    viewTenderDetails(tenderId) {
        const tender = this.currentTenders.find(t => t.id === tenderId);
        if (tender) {
            showNotification(`Viewing details for: ${tender.title}`, 'info');
            // In a real application, this would navigate to a detail page
            console.log('Tender details:', tender);
        }
    }

    downloadTender(tenderId) {
        const tender = this.currentTenders.find(t => t.id === tenderId);
        if (tender) {
            showNotification(`Downloading tender documents for: ${tender.title}`, 'success');
            // In a real application, this would trigger a file download
        }
    }

    applyForFunding(fundingId) {
        const funding = fundingOpportunities.find(f => f.id === fundingId);
        if (funding) {
            showNotification(`Opening application for: ${funding.title}`, 'info');
            // In a real application, this would open an application form
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tenderHub = new TenderHub();
});

// Handle page visibility change to pause/resume timers
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
    } else {
        if (window.tenderHub) {
            window.tenderHub.startCountdownTimers();
        }
    }
});