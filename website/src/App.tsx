import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Github, Code2, Sparkles, Globe } from 'lucide-react';
import { skills } from './data/skills';

type Language = 'en' | 'zh';

const translations = {
  en: {
    navTitle: 'OS Skills',
    heroTag: 'Exclusive Agent Skills for Open Source Maintainers',
    heroTitlePart1: 'Elevate Your',
    heroTitlePart2: 'Open Source Workflow',
    heroDesc: 'A suite of open-source tools for license comparison, project analysis, maintenance utilities, and more.',
    copyInstall: 'Copy installation command',
    inspiredBy: 'Supported by these AI Agents & Tools',
    skillsTitle: 'Available Skills',
    category: 'Category',
    copied: 'Copied',
    copyCommand: 'Copy command',
    footerPrefix: 'Built with',
    footerSuffix: 'for the Open Source Community.',
  },
  zh: {
    navTitle: 'OS Skills',
    heroTag: '为开源维护者打造的专属智能体技能库',
    heroTitlePart1: '提升你的',
    heroTitlePart2: '开源工作流',
    heroDesc: '提供开源许可证对比、开源项目分析、维护开源项目常用工具等一系列开源相关工具。',
    copyInstall: '复制安装命令',
    inspiredBy: '支持以下 AI Agent 与工具',
    skillsTitle: '可用技能库',
    category: '分类',
    copied: '已复制',
    copyCommand: '复制安装命令',
    footerPrefix: 'Built with',
    footerSuffix: 'for the Open Source Community.',
  }
};

function App() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedGlobal, setCopiedGlobal] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedGlobal(true);
      setTimeout(() => setCopiedGlobal(false), 2000);
    }
  };

  return (
    <div className="min-h-screen font-sans relative">
      <div className="bg-mesh"></div>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-50">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Terminal className="w-5 h-5 text-primary" />
            <span>{t.navTitle}</span>
          </div>
          <div className="flex items-center gap-4 relative z-50 pointer-events-auto">
            <button 
              onClick={toggleLanguage}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? '中文' : 'EN'}</span>
            </button>
            <a 
              href="https://github.com/sunny0826/open-source-skills" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-24 mt-12 relative z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 pointer-events-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.heroTag}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1] pointer-events-auto"
          >
            {t.heroTitlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">{t.heroTitlePart2}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mb-12 pointer-events-auto"
          >
            {t.heroDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto relative z-30 pointer-events-auto"
          >
            <div className="relative w-full group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none"></div>
              <div className="relative flex items-center justify-between bg-black/80 backdrop-blur-sm border border-border/60 rounded-lg p-1 pl-5 h-16 z-40 pointer-events-auto shadow-2xl">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Terminal className="w-5 h-5 text-primary shrink-0" />
                  <code className="text-sm md:text-base text-gray-300 font-mono select-all truncate">npx skills add sunny0826/open-source-skills</code>
                </div>
                <button 
                  onClick={() => copyToClipboard('npx skills add sunny0826/open-source-skills')}
                  className="flex items-center justify-center h-12 w-12 rounded-md hover:bg-white/10 transition-colors ml-2 shrink-0 cursor-pointer relative z-50 pointer-events-auto bg-white/5"
                  title={t.copyInstall}
                >
                  {copiedGlobal ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full relative z-30 pointer-events-auto mt-24"
          >
            <div className="flex items-center justify-center gap-4 mb-8 opacity-60">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-border"></div>
              <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-foreground">{t.inspiredBy}</p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-border"></div>
            </div>
            <div className="flex justify-center w-full">
              <div 
                className="flex overflow-hidden w-full max-w-5xl" 
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
              >
                <div className="flex gap-10 sm:gap-16 py-6 px-2 w-max animate-scroll">
                  {/* We duplicate the array to create a seamless infinite scroll effect */}
                  {[
                    { name: "AMP", url: "https://ampcode.com/", img: "https://skills.sh/agents/amp.svg" },
                    { name: "Claude Code", url: "https://claude.com/product/claude-code", img: "https://skills.sh/agents/claude-code.svg" },
                    { name: "ClawdBot", url: "https://clawd.bot/", img: "https://skills.sh/agents/clawdbot.svg" },
                    { name: "Cline", url: "https://cline.bot/", img: "https://skills.sh/agents/cline.svg" },
                    { name: "Codex", url: "https://openai.com/codex", img: "https://skills.sh/agents/codex.svg" },
                    { name: "Cursor", url: "https://cursor.sh", img: "https://skills.sh/agents/cursor.svg" },
                    { name: "Goose", url: "https://block.github.io/goose", img: "https://skills.sh/agents/goose.svg" },
                    { name: "Roo", url: "https://roocode.com/", img: "https://skills.sh/agents/roo.svg" },
                    { name: "Trae", url: "https://www.trae.ai/", img: "https://skills.sh/agents/trae.svg" },
                    { name: "Windsurf", url: "https://codeium.com/windsurf", img: "https://skills.sh/agents/windsurf.svg" }
                  ].concat([
                    { name: "AMP", url: "https://ampcode.com/", img: "https://skills.sh/agents/amp.svg" },
                    { name: "Claude Code", url: "https://claude.com/product/claude-code", img: "https://skills.sh/agents/claude-code.svg" },
                    { name: "ClawdBot", url: "https://clawd.bot/", img: "https://skills.sh/agents/clawdbot.svg" },
                    { name: "Cline", url: "https://cline.bot/", img: "https://skills.sh/agents/cline.svg" },
                    { name: "Codex", url: "https://openai.com/codex", img: "https://skills.sh/agents/codex.svg" },
                    { name: "Cursor", url: "https://cursor.sh", img: "https://skills.sh/agents/cursor.svg" },
                    { name: "Goose", url: "https://block.github.io/goose", img: "https://skills.sh/agents/goose.svg" },
                    { name: "Roo", url: "https://roocode.com/", img: "https://skills.sh/agents/roo.svg" },
                    { name: "Trae", url: "https://www.trae.ai/", img: "https://skills.sh/agents/trae.svg" },
                    { name: "Windsurf", url: "https://codeium.com/windsurf", img: "https://skills.sh/agents/windsurf.svg" }
                  ]).map((agent, i) => (
                    <a 
                      key={i}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 flex items-center justify-center" 
                      href={agent.url}
                      title={agent.name}
                    >
                      <img 
                        alt={agent.name} 
                        loading="eager" 
                        width="100" 
                        height="100" 
                        className="h-[48px] sm:h-[64px] lg:h-[80px] w-auto object-contain" 
                        src={agent.img} 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Grid */}
        <section id="skills" className="relative z-30 pointer-events-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Code2 className="w-8 h-8 text-primary" />
              {t.skillsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group glow-card bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-mono">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-20">
                    {skill.description[lang]}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50 relative z-10 pointer-events-auto">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {skill.category}
                    </span>
                    <button
                      onClick={() => copyToClipboard(`npx skills add sunny0826/open-source-skills --skill ${skill.id}`, idx)}
                      className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors cursor-pointer pointer-events-auto"
                    >
                      {copiedIndex === idx ? (
                        <><Check className="w-3 h-3" /> {t.copied}</>
                      ) : (
                        <><Copy className="w-3 h-3" /> {t.copyCommand}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Terminal className="w-5 h-5" />
          <span className="font-bold">{t.navTitle}</span>
        </div>
        <p className="text-sm">
          {t.footerPrefix} <span className="text-red-500">❤</span> {t.footerSuffix}
        </p>
      </footer>
    </div>
  );
}

export default App;