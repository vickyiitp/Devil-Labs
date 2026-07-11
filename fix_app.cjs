const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
content = content.replace(
  "import ProjectsPage from './pages/ProjectsPage';",
  "import ProjectsPage from './pages/ProjectsPage';\nimport AboutPage from './pages/AboutPage';"
);

// Add to switch case
content = content.replace(
  "      case '/work':\n        return <ProjectsPage navigate={navigate} />;\n      case '/pricing':",
  "      case '/work':\n        return <ProjectsPage navigate={navigate} />;\n      case '/about':\n        return <AboutPage navigate={navigate} />;\n      case '/pricing':"
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed App.tsx');
