const fs = require('fs');

// 1. Update App.tsx
const appFile = 'src/App.tsx';
let appContent = fs.readFileSync(appFile, 'utf8');

appContent = appContent.replace("import MSAPage from './pages/MSAPage';", "import MSAPage from './pages/MSAPage';\nimport ProjectsPage from './pages/ProjectsPage';");

appContent = appContent.replace("case '/pricing':", "case '/work':\n        return <ProjectsPage navigate={navigate} />;\n      case '/pricing':");

fs.writeFileSync(appFile, appContent);

// 2. Update Navigation.tsx
const navFile = 'src/components/Navigation.tsx';
let navContent = fs.readFileSync(navFile, 'utf8');

navContent = navContent.replace("{ name: 'PROCESS', path: '/process', label: '03_PROCESS' },", "{ name: 'PROCESS', path: '/process', label: '03_PROCESS' },\n    { name: 'WORK', path: '/work', label: '04_WORK' },");
navContent = navContent.replace("{ name: 'INSIGHTS', path: '/insights', label: '04_INSIGHTS' },", "{ name: 'INSIGHTS', path: '/insights', label: '05_INSIGHTS' },");
navContent = navContent.replace("{ name: 'PRICING', path: '/pricing', label: '05_PRICING' },", "{ name: 'PRICING', path: '/pricing', label: '06_PRICING' },");
navContent = navContent.replace("{ name: 'CONTACT', path: '/contact', label: '06_CONTACT' },", "{ name: 'CONTACT', path: '/contact', label: '07_CONTACT' },");

navContent = navContent.replace("<button onClick={() => navigate('/pricing')} className=\"text-left hover:text-white hover:pl-2 transition-all duration-300\">PRICING</button>", "<button onClick={() => navigate('/work')} className=\"text-left hover:text-white hover:pl-2 transition-all duration-300\">WORK</button>\n          <button onClick={() => navigate('/pricing')} className=\"text-left hover:text-white hover:pl-2 transition-all duration-300\">PRICING</button>");

fs.writeFileSync(navFile, navContent);

console.log("Updated App.tsx and Navigation.tsx");
