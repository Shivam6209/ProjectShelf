# ProjectShelf

A modern portfolio platform for creative professionals to showcase their work with stunning, customizable portfolios and detailed case studies.

![ProjectShelf](https://img.shields.io/badge/ProjectShelf-Portfolio%20Platform-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

### 🎨 **Theme Engine**
- **3 Built-in Themes**: Default, Modern, and Creative
- **Dark Mode Support**: Complete dark/light mode toggle
- **Real-time Preview**: See changes instantly
- **OKLCH Color Space**: Advanced color management
- **Responsive Design**: Perfect on all devices

### 📊 **Portfolio Builder**
- **Modular Case Studies**: Comprehensive project documentation
- **Media Galleries**: Images, videos, and interactive content
- **Timeline Editor**: Project development phases
- **Technology Tags**: Showcase your tech stack
- **Outcomes Tracking**: Metrics and testimonials

### 📈 **Analytics Dashboard**
- **Traffic Insights**: Portfolio and project views
- **Engagement Metrics**: User interaction tracking
- **Performance Data**: Detailed analytics charts
- **Export Capabilities**: Data visualization and reports

### 🔧 **Developer Features**
- **Custom URLs**: `yourname.projectshelf.com`
- **SEO Optimized**: Built-in search engine optimization
- **Fast Performance**: Optimized builds and caching
- **TypeScript**: Full type safety
- **Modern Stack**: Next.js 15, React 18, Tailwind CSS 4

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/projectshelf.git
   cd projectshelf
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Frontend (.env.local)
   cd frontend
   cp .env.example .env.local
   
   # Backend (.env)
   cd ../backend
   cp .env.example .env
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
projectshelf/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React contexts (Auth, Theme)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   └── utils/           # Utility functions
│   └── package.json
├── README.md
└── .gitignore
```

## 🛠️ Development

### Frontend Commands
```bash
cd frontend

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Backend Commands
```bash
cd backend

# Development
npm run dev          # Start development server with nodemon
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
```

### Theme Development
The theme engine supports custom themes with OKLCH color space:

```typescript
// Example custom theme
const customTheme = {
  name: 'Custom',
  description: 'Your custom theme',
  primary: 'oklch(0.7 0.2 180)',    // Cyan
  secondary: 'oklch(0.3 0 0)',      // Dark gray
  accent: 'oklch(0.8 0.15 60)',     // Yellow
  background: 'oklch(0.98 0 0)',    // Light
  foreground: 'oklch(0.1 0 0)',     // Dark
  // ... other colors
};
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local)**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway/Heroku)
```bash
cd backend
npm run build
# Deploy to your preferred platform
```

### Docker (Optional)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Portfolios
- `GET /api/portfolios/:username` - Get user portfolio
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Analytics
- `GET /api/analytics/portfolio/:id` - Portfolio analytics
- `GET /api/analytics/project/:id` - Project analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write tests for new features
- Follow the existing code style
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [OKLCH Color Space](https://oklch.com/) - Advanced color management

## 📞 Support

- 📧 Email: support@projectshelf.com
- 💬 Discord: [Join our community](https://discord.gg/projectshelf)
- 📖 Documentation: [docs.projectshelf.com](https://docs.projectshelf.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/projectshelf/issues)

---

**Built with ❤️ by the ProjectShelf team**