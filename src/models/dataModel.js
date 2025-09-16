// Model para gerenciar dados da aplicação
// Simulando dados que normalmente viriam de um banco de dados

// Dados da empresa/projeto para a landing page
const companyInfo = {
  name: "TechSolutions",
  tagline: "Inovação e Tecnologia para o Futuro",
  description:
    "Desenvolvemos soluções tecnológicas inovadoras para empresas que buscam crescer no mundo digital.",
  founded: "2024",
  employees: "50+",
  projects: "200+",
};

// Serviços oferecidos
const services = [
  {
    id: 1,
    title: "Desenvolvimento Web",
    description:
      "Criamos websites modernos e responsivos usando as melhores tecnologias do mercado.",
    icon: "💻",
    price: "A partir de R$ 2.500",
  },
  {
    id: 2,
    title: "Aplicativos Mobile",
    description: "Desenvolvemos apps nativos e híbridos para iOS e Android.",
    icon: "📱",
    price: "A partir de R$ 5.000",
  },
  {
    id: 3,
    title: "Consultoria em TI",
    description:
      "Oferecemos consultoria especializada para otimizar seus processos tecnológicos.",
    icon: "🔧",
    price: "R$ 200/hora",
  },
];

// Depoimentos de clientes
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    company: "StartupXYZ",
    message:
      "Excelente trabalho! Nossa plataforma ficou incrível e nossos usuários adoraram.",
    rating: 5,
    avatar: "MS",
  },
  {
    id: 2,
    name: "João Santos",
    company: "Empresa ABC",
    message:
      "Profissionais competentes e prazo cumprido. Recomendo para todos!",
    rating: 5,
    avatar: "JS",
  },
  {
    id: 3,
    name: "Ana Costa",
    company: "Digital Corp",
    message:
      "Transformaram nossa ideia em realidade. Estamos muito satisfeitos com o resultado.",
    rating: 5,
    avatar: "AC",
  },
];

// Estatísticas da empresa
const stats = [
  { label: "Projetos Concluídos", value: "200+", icon: "✅" },
  { label: "Clientes Satisfeitos", value: "150+", icon: "😊" },
  { label: "Anos de Experiência", value: "5+", icon: "🎯" },
  { label: "Tecnologias Dominadas", value: "20+", icon: "⚡" },
];

class DataModel {
  // Métodos para obter dados
  getCompanyInfo() {
    return companyInfo;
  }

  getServices() {
    return services;
  }

  getServiceById(id) {
    return services.find((service) => service.id === parseInt(id));
  }

  getTestimonials() {
    return testimonials;
  }

  getStats() {
    return stats;
  }

  // Método para simular dados dinâmicos
  getLandingPageData() {
    return {
      company: this.getCompanyInfo(),
      services: this.getServices(),
      testimonials: this.getTestimonials(),
      stats: this.getStats(),
    };
  }
}

module.exports = new DataModel();
