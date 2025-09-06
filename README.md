# 🚀 Raj's 3D Portfolio

A modern, interactive 3D portfolio website built with the MERN stack, featuring immersive Three.js experiences and stunning visual effects.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-Latest-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-cyan)

## ✨ Features

- **🎨 Modern Design**: Dark theme with neon gradients (purple, cyan, pink)
- **🔮 3D Graphics**: Interactive Three.js scenes with React-Three-Fiber
- **💎 Glassmorphism**: Blurred transparent panels with glowing edges
- **🎭 Smooth Animations**: Framer Motion powered transitions
- **📱 Responsive**: Mobile-first design with adaptive layouts
- **⚡ Performance**: Optimized with lazy loading and Suspense
- **🎯 Interactive**: Cursor trails, hover effects, and 3D interactions

## 🛠 Tech Stack

### Frontend
- **React 18** + TypeScript
- **React-Three-Fiber** + Three.js + Drei
- **Framer Motion** for animations
- **TailwindCSS** for styling
- **Heroicons** for icons

### 3D Features
- Interactive 3D models with orbit controls
- Particle systems and floating animations
- Multiple lighting presets
- Real-time shader effects
- Responsive 3D scenes

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Rajkoli145/Portfolio.git
cd Portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Hero3D.tsx       # 3D hero section with globe
│   ├── NavBar.tsx       # Navigation with glassmorphism
│   ├── ProjectsGallery.tsx  # 3D project cards
│   ├── ProjectViewer.tsx    # 3D model viewer modal
│   ├── AboutSection.tsx     # About with floating 3D icons
│   ├── ContactSection.tsx   # Contact form with 3D mail
│   ├── Footer.tsx       # Footer component
│   └── LoadingScreen.tsx    # Futuristic loading screen
├── data/                # JSON data files
│   └── projects.json    # Project information
├── hooks/               # Custom React hooks
│   └── useCursorTrail.ts   # Cursor trail effect
└── App.tsx             # Main application component
```

## 🎯 Sections

### 🏠 Hero Section
- Fullscreen 3D canvas with rotating wireframe globe
- Floating particles and stars background
- Animated gradient title with neon effects
- Interactive CTA button

### 💼 Projects Gallery
- Grid of 3D project cards with tilt animations
- Search and filter functionality
- Hover effects revealing project links
- Detailed project viewer with 3D models

### 👨‍💻 About Section
- Floating 3D tech icons (React, Node.js, MongoDB, Three.js)
- Animated skill progress bars
- Achievement statistics
- Professional profile with glassmorphism

### 📧 Contact Section
- 3D animated mail hologram
- Interactive contact form
- Social media links with neon effects
- Form validation and animations

## 🎨 Design System

### Colors
- **Primary**: Neon Purple (#8B5CF6)
- **Secondary**: Neon Cyan (#06B6D4)
- **Accent**: Neon Pink (#EC4899)
- **Background**: Deep Black (#0a0a0a)

### Typography
- **Headers**: Orbitron (futuristic)
- **Body**: Inter (clean, readable)

### Effects
- Glassmorphism with backdrop blur
- Neon glow animations
- Particle systems
- Smooth scroll reveals

## 📱 Responsive Design

- **Desktop**: Full 3D experience with all interactions
- **Tablet**: Optimized 3D scenes with touch controls
- **Mobile**: Static previews with essential interactions
- **Navigation**: Collapsible hamburger menu on mobile

## ⚡ Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Suspense**: Graceful loading states
- **Memoization**: Optimized re-renders
- **Asset Optimization**: Compressed models and textures

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** community for amazing 3D capabilities
- **React-Three-Fiber** for seamless React integration
- **Framer Motion** for smooth animations
- **TailwindCSS** for rapid styling

## 📞 Contact

**Raj** - [LinkedIn](https://linkedin.com/in/raj) - [Email](mailto:raj@example.com)

**Project Link**: [https://github.com/Rajkoli145/Portfolio](https://github.com/Rajkoli145/Portfolio)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using React, Three.js & Modern Web Technologies
