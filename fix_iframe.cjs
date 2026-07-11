const fs = require('fs');

let content = fs.readFileSync('src/pages/ProjectsPage.tsx', 'utf8');
content = "import IframeWithSkeleton from '../components/IframeWithSkeleton';\n" + content;

const oldDiv = `<div className="relative flex-grow w-full overflow-hidden bg-[#050505]">
                        <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none" style={{ transform: 'scale(0.25)' }}>
                          <iframe 
                            src={project.link} 
                            className="w-full h-full border-none bg-white"
                            sandbox="allow-scripts allow-same-origin"
                            loading="lazy"
                            title={project.title}
                          />
                        </div>
                        
                        {/* Overlay to catch clicks and prevent iframe interaction while scrolling/hovering */}
                        <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center"> 
                           {/* Hover Effect CTA */}
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0">
                             <ArrowUpRight className="text-black" size={20} />
                           </div>
                        </div>
                      </div>`;

const newDiv = `<div className="relative flex-grow w-full overflow-hidden bg-[#050505]">
                        <IframeWithSkeleton src={project.link} title={project.title} />
                        
                        {/* Overlay to catch clicks and prevent iframe interaction while scrolling/hovering */}
                        <div className="absolute inset-0 z-20 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-auto"> 
                           {/* Hover Effect CTA */}
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0">
                             <ArrowUpRight className="text-black" size={20} />
                           </div>
                        </div>
                      </div>`;

content = content.replace(oldDiv, newDiv);
fs.writeFileSync('src/pages/ProjectsPage.tsx', content);
console.log('Fixed Iframe');
