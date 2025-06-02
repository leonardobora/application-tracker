// Academic Management System - JavaScript

// Data from the provided JSON
const data = {
  "opportunities": [
    {
      "id": 1,
      "title": "Programa Oportunidades Acadêmicas - EducationUSA",
      "type": "Bolsa de Estudo",
      "country": "Estados Unidos",
      "area": "Graduação/Pós-graduação",
      "deadline": "2025-01-15",
      "description": "Programa que auxilia estudantes academicamente qualificados sem condições financeiras para graduação e pós-graduação nos EUA",
      "requirements": ["Excelência acadêmica", "Comprovação de necessidade financeira", "Proficiência em inglês"],
      "status": "Aberta"
    },
    {
      "id": 2,
      "title": "Intercâmbio Alemanha - DAAD",
      "type": "Intercâmbio",
      "country": "Alemanha", 
      "area": "Diversas áreas",
      "deadline": "2025-02-28",
      "description": "Winterkurs - curso de inverno oferecido pelo DAAD para universitários de qualquer curso",
      "requirements": ["Estar matriculado em universidade", "Conhecimento de alemão ou inglês", "Bom desempenho acadêmico"],
      "status": "Aberta"
    },
    {
      "id": 3,
      "title": "Hackathon Copel 2025",
      "type": "Hackathon",
      "country": "Brasil",
      "area": "Tecnologia/Inovação",
      "deadline": "2025-03-04",
      "description": "Maratona universitária para estudantes de graduação do Paraná criarem soluções inovadoras",
      "requirements": ["Graduação no Paraná", "Equipe de 5 estudantes", "Mesma instituição"],
      "status": "Aberta"
    },
    {
      "id": 4,
      "title": "Schwarzman Scholars China",
      "type": "Fellowship",
      "country": "China",
      "area": "Mestrado",
      "deadline": "2025-09-15",
      "description": "Bolsas integrais para mestrado em uma das melhores universidades da China",
      "requirements": ["Graduação completa", "Excelência acadêmica", "Liderança comprovada", "Inglês fluente"],
      "status": "Aberta"
    },
    {
      "id": 5,
      "title": "Bolsas Austrália - Monash University",
      "type": "Bolsa de Estudo",
      "country": "Austrália",
      "area": "Graduação/Pós-graduação",
      "deadline": "2025-07-30",
      "description": "Bolsas de até 100% para graduação e pós-graduação na Monash University",
      "requirements": ["Excelência acadêmica", "IELTS/TOEFL", "Application completa"],
      "status": "Aberta"
    },
    {
      "id": 6,
      "title": "Mobilidade Acadêmica França",
      "type": "Intercâmbio",
      "country": "França",
      "area": "Mestrado/Doutorado",
      "deadline": "2025-05-20",
      "description": "3 bolsas de mobilidade para mestrado e doutorado na França",
      "requirements": ["Matriculado em pós-graduação", "Conhecimento de francês ou inglês", "Projeto de pesquisa"],
      "status": "Aberta"
    }
  ],
  "applicationStatuses": [
    "Rascunho",
    "Documentos Pendentes", 
    "Enviada",
    "Em Análise",
    "Entrevista Agendada",
    "Aceita",
    "Rejeitada",
    "Lista de Espera"
  ],
  "documentTypes": [
    "Currículo/CV",
    "Carta de Motivação",
    "Histórico Escolar",
    "Certificado de Proficiência",
    "Carta de Recomendação",
    "Portfolio",
    "Certificados",
    "Diploma",
    "Passaporte"
  ],
  "sampleUser": {
    "name": "Leonardo Bora",
    "email": "leonardo.bora@email.com",
    "university": "Universidade Federal do Paraná",
    "course": "Ciência da Computação",
    "semester": "6º semestre",
    "gpa": "8.7",
    "languages": ["Português (Nativo)", "Inglês (Fluente)", "Espanhol (Intermediário)"],
    "skills": ["Python", "React", "AWS", "AI/ML", "Hugging Face"],
    "interests": ["Inteligência Artificial", "Desenvolvimento Web", "Futebol", "Trilhas"]
  }
};

// Sample applications data
const myApplications = [
  {
    id: 1,
    opportunityId: 1,
    title: "Programa Oportunidades Acadêmicas - EducationUSA",
    status: "Em Análise",
    progress: 85,
    deadline: "2025-01-15",
    appliedDate: "2024-12-20"
  },
  {
    id: 2,
    opportunityId: 2,
    title: "Intercâmbio Alemanha - DAAD",
    status: "Documentos Pendentes",
    progress: 60,
    deadline: "2025-02-28",
    appliedDate: "2024-12-15"
  },
  {
    id: 3,
    opportunityId: 4,
    title: "Schwarzman Scholars China",
    status: "Aceita",
    progress: 100,
    deadline: "2025-09-15",
    appliedDate: "2024-11-30"
  },
  {
    id: 4,
    opportunityId: 5,
    title: "Bolsas Austrália - Monash University",
    status: "Rascunho",
    progress: 25,
    deadline: "2025-07-30",
    appliedDate: "2024-12-22"
  }
];

// Sample documents data
const userDocuments = [
  {
    id: 1,
    name: "Currículo Atualizado",
    type: "Currículo/CV",
    uploadDate: "2024-12-15",
    status: "Aprovado"
  },
  {
    id: 2,
    name: "Histórico Acadêmico UFPR",
    type: "Histórico Escolar",
    uploadDate: "2024-12-10",
    status: "Aprovado"
  },
  {
    id: 3,
    name: "Certificado TOEFL iBT",
    type: "Certificado de Proficiência",
    uploadDate: "2024-11-20",
    status: "Aprovado"
  },
  {
    id: 4,
    name: "Carta Prof. Silva",
    type: "Carta de Recomendação",
    uploadDate: "2024-12-01",
    status: "Pendente"
  },
  {
    id: 5,
    name: "Portfolio Projetos",
    type: "Portfolio",
    uploadDate: "2024-12-18",
    status: "Aprovado"
  },
  {
    id: 6,
    name: "Passaporte Brasileiro",
    type: "Passaporte",
    uploadDate: "2024-10-15",
    status: "Aprovado"
  }
];

// Global variables
let currentSection = 'dashboard';
let filteredOpportunities = [...data.opportunities];
let currentApplicationFilter = 'all';
let selectedOpportunity = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupFilters();
    setupModal();
    setupStatusTabs();
    setupCalendar();
    setupButtons();
    renderDashboard();
    renderOpportunities();
    renderMyApplications();
    renderDocuments();
    renderCalendarEvents();
}

// Navigation Setup
function setupNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar__link');
    const sections = document.querySelectorAll('.content-section');
    const breadcrumb = document.getElementById('breadcrumb-text');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
            
            // Update breadcrumb
            const sectionNames = {
                dashboard: 'Dashboard',
                opportunities: 'Oportunidades',
                applications: 'Minhas Aplicações',
                profile: 'Perfil Acadêmico',
                documents: 'Documentos',
                calendar: 'Calendário'
            };
            breadcrumb.textContent = sectionNames[targetSection];
            currentSection = targetSection;
        });
    });
}

// Filters Setup
function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    const countryFilter = document.getElementById('country-filter');
    const searchInput = document.getElementById('search-opportunities');
    const clearButton = document.getElementById('clear-filters');

    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (countryFilter) countryFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (clearButton) clearButton.addEventListener('click', clearFilters);
}

function applyFilters() {
    const typeFilter = document.getElementById('type-filter');
    const countryFilter = document.getElementById('country-filter');
    const searchInput = document.getElementById('search-opportunities');
    
    const typeValue = typeFilter ? typeFilter.value : '';
    const countryValue = countryFilter ? countryFilter.value : '';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    filteredOpportunities = data.opportunities.filter(opp => {
        const matchesType = !typeValue || opp.type === typeValue;
        const matchesCountry = !countryValue || opp.country === countryValue;
        const matchesSearch = !searchTerm || 
            opp.title.toLowerCase().includes(searchTerm) ||
            opp.description.toLowerCase().includes(searchTerm) ||
            opp.area.toLowerCase().includes(searchTerm);

        return matchesType && matchesCountry && matchesSearch;
    });

    renderOpportunities();
}

function clearFilters() {
    const typeFilter = document.getElementById('type-filter');
    const countryFilter = document.getElementById('country-filter');
    const searchInput = document.getElementById('search-opportunities');
    
    if (typeFilter) typeFilter.value = '';
    if (countryFilter) countryFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    filteredOpportunities = [...data.opportunities];
    renderOpportunities();
}

// Status Tabs Setup
function setupStatusTabs() {
    const statusTabs = document.querySelectorAll('.status-tab');
    
    statusTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            statusTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentApplicationFilter = tab.getAttribute('data-status');
            renderMyApplications();
        });
    });
}

// Buttons Setup
function setupButtons() {
    // Add Application button
    const addApplicationBtn = document.getElementById('add-application');
    if (addApplicationBtn) {
        addApplicationBtn.addEventListener('click', () => {
            // Switch to opportunities section
            const opportunitiesLink = document.querySelector('[data-section="opportunities"]');
            if (opportunitiesLink) opportunitiesLink.click();
        });
    }

    // Upload Document button
    const uploadDocBtn = document.getElementById('upload-document');
    if (uploadDocBtn) {
        uploadDocBtn.addEventListener('click', () => {
            alert('Funcionalidade de upload será implementada em versão futura.');
        });
    }
}

// Modal Setup
function setupModal() {
    const modal = document.getElementById('application-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelButton = document.getElementById('modal-cancel');
    const applyButton = document.getElementById('modal-apply');

    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (cancelButton) cancelButton.addEventListener('click', hideModal);
    if (applyButton) applyButton.addEventListener('click', applyToOpportunity);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
}

function showModal(opportunityId) {
    const opportunity = data.opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    selectedOpportunity = opportunity;
    const modal = document.getElementById('application-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (modalTitle) modalTitle.textContent = opportunity.title;
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="opportunity-details">
                <div class="mb-16">
                    <span class="opportunity-type">${opportunity.type}</span>
                </div>
                <div class="mb-16">
                    <strong>País:</strong> ${opportunity.country}<br>
                    <strong>Área:</strong> ${opportunity.area}<br>
                    <strong>Prazo:</strong> ${formatDate(opportunity.deadline)}
                </div>
                <div class="mb-16">
                    <strong>Descrição:</strong><br>
                    <p class="text-muted">${opportunity.description}</p>
                </div>
                <div class="mb-16">
                    <strong>Requisitos:</strong>
                    <ul>
                        ${opportunity.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    if (modal) modal.classList.add('active');
}

function hideModal() {
    const modal = document.getElementById('application-modal');
    if (modal) modal.classList.remove('active');
    selectedOpportunity = null;
}

function applyToOpportunity() {
    if (!selectedOpportunity) {
        alert('Erro: Nenhuma oportunidade selecionada.');
        return;
    }

    // Check if already applied
    const existingApplication = myApplications.find(app => app.opportunityId === selectedOpportunity.id);
    
    if (existingApplication) {
        alert('Você já aplicou para esta oportunidade!');
        return;
    }

    // Add new application
    const newApplication = {
        id: myApplications.length + 1,
        opportunityId: selectedOpportunity.id,
        title: selectedOpportunity.title,
        status: "Rascunho",
        progress: 10,
        deadline: selectedOpportunity.deadline,
        appliedDate: new Date().toISOString().split('T')[0]
    };

    myApplications.push(newApplication);
    renderMyApplications();
    renderDashboard();
    
    alert('Aplicação iniciada com sucesso! Você pode acompanhar o progresso na seção "Minhas Aplicações".');
    hideModal();
}

// Render Functions
function renderDashboard() {
    renderRecentApplications();
    renderUpcomingDeadlines();
}

function renderRecentApplications() {
    const container = document.getElementById('recent-applications');
    if (!container) return;
    
    const recentApps = myApplications.slice(0, 3);

    container.innerHTML = recentApps.map(app => `
        <div class="application-item">
            <div class="application-info">
                <h4>${app.title}</h4>
                <p>Aplicado em ${formatDate(app.appliedDate)} • Prazo: ${formatDate(app.deadline)}</p>
            </div>
            <div class="application-status">
                <span class="status status--${getStatusClass(app.status)}">${app.status}</span>
            </div>
        </div>
    `).join('');
}

function renderUpcomingDeadlines() {
    const container = document.getElementById('upcoming-deadlines');
    if (!container) return;
    
    const deadlines = myApplications
        .filter(app => new Date(app.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 4);

    container.innerHTML = deadlines.map(app => `
        <div class="deadline-item">
            <span>${app.title}</span>
            <span class="deadline-date">${formatDate(app.deadline)}</span>
        </div>
    `).join('');
}

function renderOpportunities() {
    const container = document.getElementById('opportunities-list');
    if (!container) return;
    
    if (filteredOpportunities.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Nenhuma oportunidade encontrada</h3>
                <p>Tente ajustar os filtros ou limpar a busca.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredOpportunities.map(opp => `
        <div class="opportunity-card" onclick="showModal(${opp.id})">
            <div class="opportunity-header">
                <span class="opportunity-type">${opp.type}</span>
            </div>
            <h3>${opp.title}</h3>
            <div class="opportunity-meta">
                <span>📍 ${opp.country}</span>
                <span>📚 ${opp.area}</span>
                <span class="opportunity-deadline">⏰ Prazo: ${formatDate(opp.deadline)}</span>
            </div>
            <p class="opportunity-description">${opp.description}</p>
        </div>
    `).join('');
}

function renderMyApplications() {
    const container = document.getElementById('my-applications');
    if (!container) return;
    
    let applicationsToShow = myApplications;
    if (currentApplicationFilter !== 'all') {
        applicationsToShow = myApplications.filter(app => app.status === currentApplicationFilter);
    }

    if (applicationsToShow.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Nenhuma aplicação encontrada</h3>
                <p>Você ainda não tem aplicações ${currentApplicationFilter === 'all' ? '' : 'com status "' + currentApplicationFilter + '"'}.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = applicationsToShow.map(app => `
        <div class="my-application-card">
            <div class="my-application-header">
                <h3>${app.title}</h3>
                <span class="status status--${getStatusClass(app.status)}">${app.status}</span>
            </div>
            <div class="application-details">
                <p class="text-muted">Aplicado em ${formatDate(app.appliedDate)} • Prazo: ${formatDate(app.deadline)}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${app.progress}%"></div>
                </div>
                <p class="text-muted">${app.progress}% completo</p>
            </div>
        </div>
    `).join('');
}

function renderDocuments() {
    const container = document.getElementById('documents-list');
    if (!container) return;
    
    container.innerHTML = userDocuments.map(doc => `
        <div class="document-card">
            <div class="document-icon">${getDocumentIcon(doc.type)}</div>
            <h4>${doc.name}</h4>
            <p class="text-muted">${doc.type}</p>
            <p class="text-muted">Enviado em ${formatDate(doc.uploadDate)}</p>
            <span class="status status--${getStatusClass(doc.status)}">${doc.status}</span>
        </div>
    `).join('');
}

// Calendar Setup and Rendering
function setupCalendar() {
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            console.log('Previous month');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            console.log('Next month');
        });
    }
}

function renderCalendarEvents() {
    const container = document.getElementById('calendar-events');
    if (!container) return;
    
    const upcomingEvents = myApplications
        .filter(app => new Date(app.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);

    container.innerHTML = upcomingEvents.map(event => `
        <div class="deadline-item">
            <span>${event.title}</span>
            <span class="deadline-date">${formatDate(event.deadline)}</span>
        </div>
    `).join('');

    // Simple calendar grid for June 2025
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const daysInMonth = 30;
    const startDay = 6; // June 1, 2025 is a Sunday (0), so we start at Sunday
    
    let calendarHTML = '';
    
    // Days of week headers
    const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayHeaders.forEach(day => {
        calendarHTML += `<div class="calendar-day" style="font-weight: bold; text-align: center; background-color: var(--color-secondary);">${day}</div>`;
    });
    
    // Empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
        calendarHTML += `<div class="calendar-day other-month"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === 2; // Current date is June 2, 2025
        const hasEvent = [15, 28].includes(day); // Sample events on 15th and 28th
        
        calendarHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">
                <div class="day-number">${day}</div>
                ${hasEvent ? '<div class="calendar-event">Prazo</div>' : ''}
            </div>
        `;
    }
    
    calendarGrid.innerHTML = calendarHTML;
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function getStatusClass(status) {
    const statusMap = {
        'Rascunho': 'info',
        'Documentos Pendentes': 'warning',
        'Enviada': 'info',
        'Em Análise': 'warning',
        'Entrevista Agendada': 'warning',
        'Aceita': 'success',
        'Rejeitada': 'error',
        'Lista de Espera': 'warning',
        'Aprovado': 'success',
        'Pendente': 'warning'
    };
    return statusMap[status] || 'info';
}

function getDocumentIcon(type) {
    const iconMap = {
        'Currículo/CV': '📄',
        'Carta de Motivação': '✍️',
        'Histórico Escolar': '🎓',
        'Certificado de Proficiência': '🏆',
        'Carta de Recomendação': '📝',
        'Portfolio': '💼',
        'Certificados': '🏅',
        'Diploma': '🎓',
        'Passaporte': '🛂'
    };
    return iconMap[type] || '📎';
}