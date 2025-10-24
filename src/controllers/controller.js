// Controller para gerenciar as rotas e lógica da aplicação
const dataModel = require('./database.js');

class HomeController {
    // Método para renderizar a página inicial (landing page)
    index(req, res) {
        try {
            // Obter todos os dados necessários do model
            const pageData = dataModel.getLandingPageData();
            
            // Dados adicionais para a view
            const viewData = {
                title: 'TechSolutions - Inovação e Tecnologia',
                currentYear: new Date().getFullYear(),
                ...pageData
            };

            // Renderizar a view com os dados
            res.render('index', viewData);
        } catch (error) {
            console.error('Erro ao carregar a página inicial:', error);
            res.status(500).render('error', {
                title: 'Erro Interno',
                message: 'Ocorreu um erro interno. Tente novamente mais tarde.',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }

    // Método para página sobre (caso queira expandir)
    about(req, res) {
        try {
            const companyInfo = dataModel.getCompanyInfo();
            
            res.render('about', {
                title: 'Sobre Nós - TechSolutions',
                company: companyInfo,
                currentYear: new Date().getFullYear()
            });
        } catch (error) {
            console.error('Erro ao carregar página sobre:', error);
            res.status(500).render('error', {
                title: 'Erro Interno',
                message: 'Ocorreu um erro interno. Tente novamente mais tarde.'
            });
        }
    }

    // Método para página de serviços (caso queira expandir)
    services(req, res) {
        try {
            const services = dataModel.getServices();
            
            res.render('services', {
                title: 'Nossos Serviços - TechSolutions',
                services: services,
                currentYear: new Date().getFullYear()
            });
        } catch (error) {
            console.error('Erro ao carregar página de serviços:', error);
            res.status(500).render('error', {
                title: 'Erro Interno',
                message: 'Ocorreu um erro interno. Tente novamente mais tarde.'
            });
        }
    }

    // Método para processar formulário de contato (simulado)
    contact(req, res) {
        try {
            const { name, email, message } = req.body;
            
            // Simular processamento do formulário
            console.log('Novo contato recebido:', { name, email, message });
            
            // Em uma aplicação real, aqui você salvaria no banco de dados
            // ou enviaria um email
            
            res.json({
                success: true,
                message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
            });
        } catch (error) {
            console.error('Erro ao processar contato:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao enviar mensagem. Tente novamente.'
            });
        }
    }
}

module.exports = new HomeController();