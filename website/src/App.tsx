import { useMemo, useState } from 'react';
import {
  Check,
  ChevronRight,
  Copy,
  Globe,
  Terminal,
} from 'lucide-react';
import { skills } from './data/skills';

type Language = 'en' | 'zh';
type Installer = 'npx' | 'clawhub';

const recommendedIds = ['open-source-license', 'open-source-analysis', 'openrank'];

const agents = [
  { name: 'AMP', url: 'https://ampcode.com/', logo: 'https://www.google.com/s2/favicons?domain_url=https://ampcode.com&sz=64' },
  { name: 'Claude Code', url: 'https://claude.com/product/claude-code', logo: 'https://www.google.com/s2/favicons?domain_url=https://claude.com&sz=64' },
  { name: 'Cline', url: 'https://cline.bot/', logo: 'https://www.google.com/s2/favicons?domain_url=https://cline.bot&sz=64' },
  { name: 'Codex', url: 'https://openai.com/codex', logo: 'https://www.google.com/s2/favicons?domain_url=https://openai.com&sz=64' },
  { name: 'Cursor', url: 'https://cursor.sh', logo: 'https://www.google.com/s2/favicons?domain_url=https://cursor.com&sz=64' },
  { name: 'Goose', url: 'https://block.github.io/goose', logo: 'https://www.google.com/s2/favicons?domain_url=https://goose-docs.ai&sz=64' },
  { name: 'Roo', url: 'https://roocode.com/', logo: 'https://www.google.com/s2/favicons?domain_url=https://roocode.com&sz=64' },
  { name: 'Trae', url: 'https://www.trae.ai/', logo: 'https://www.google.com/s2/favicons?domain_url=https://trae.ai&sz=64' },
  { name: 'Windsurf', url: 'https://codeium.com/windsurf', logo: 'https://www.google.com/s2/favicons?domain_url=https://windsurf.com&sz=64' },
  { name: 'OpenCode', url: 'https://www.opencode.ai/', logo: 'https://www.google.com/s2/favicons?domain_url=https://opencode.ai&sz=64' },
  { name: 'Kiro', url: 'https://www.kiro.dev/', logo: 'https://www.google.com/s2/favicons?domain_url=https://kiro.dev&sz=64' },
];

const translations = {
  en: {
    navTitle: 'Open Source Skills',
    navSkills: 'Skills',
    navInstall: 'Install',
    navAgents: 'Agents',
    languageLabel: '中文',
    heroLabel: 'Skill catalog for maintainers',
    heroTitle: 'Agent skills for open source work',
    heroDesc:
      'Install focused skills for license review, repository analysis, PR writing, release notes, issue triage, contributor docs, and prompt review',
    copyInstall: 'Copy install command',
    copied: 'Copied',
    commandLabel: 'Install command',
    commandNote: 'Use the full package, or copy a per-skill command from any row',
    frameUrl: 'open source skills',
    workspace: 'Skill workspace',
    sidebarFeatured: 'Featured',
    sidebarAll: 'All skills',
    sidebarInstall: 'Install',
    selected: 'Selected skill',
    recommended: 'Recommended first',
    recommendedDesc: 'Start with the skills that answer the most common maintainer questions',
    allSkills: 'All skills',
    allSkillsDesc: 'A compact catalog with direct copy actions for both supported installers',
    supportedAgents: 'Supported agents and tools',
    category: 'Category',
    copyNpx: 'Copy npx',
    copyClawhub: 'Copy clawhub',
    viewGithub: 'View repository',
    installPath: 'Install path',
    footer: 'Built as a precise catalog for open source maintainers',
  },
  zh: {
    navTitle: 'Open Source Skills',
    navSkills: '技能',
    navInstall: '安装',
    navAgents: '工具',
    languageLabel: 'EN',
    heroLabel: '面向维护者的 Skill 目录',
    heroTitle: '开源 Agent Skill',
    heroDesc:
      '安装面向许可证审查、仓库分析、PR 描述、发版说明、Issue 分诊、贡献指南和 Prompt 审查的专用技能',
    copyInstall: '复制安装命令',
    copied: '已复制',
    commandLabel: '安装命令',
    commandNote: '可以安装完整技能包，也可以在任意行复制单个 skill 命令',
    frameUrl: 'open source skills',
    workspace: 'Skill 工作区',
    sidebarFeatured: '推荐',
    sidebarAll: '全部技能',
    sidebarInstall: '安装',
    selected: '当前技能',
    recommended: '推荐',
    recommendedDesc: '先从覆盖维护者高频问题的技能开始',
    allSkills: '全部技能',
    allSkillsDesc: '紧凑目录，支持直接复制两种安装命令',
    supportedAgents: '支持的 Agent 与工具',
    category: '分类',
    copyNpx: '复制 npx',
    copyClawhub: '复制 clawhub',
    viewGithub: '查看仓库',
    installPath: '安装路径',
    footer: '为开源维护者构建的 Agent 技能',
  },
};

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="5" y="5" width="6" height="6" rx="1.5" />
        <rect x="13" y="5" width="6" height="6" rx="1.5" />
        <rect x="5" y="13" width="6" height="6" rx="1.5" />
        <rect x="13" y="13" width="6" height="6" rx="1.5" />
      </svg>
    </span>
  );
}

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [installer, setInstaller] = useState<Installer>('npx');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState(recommendedIds[0]);

  const t = translations[lang];
  const selectedSkill = skills.find((skill) => skill.id === selectedSkillId) ?? skills[0];
  const recommendedSkills = useMemo(
    () => skills.filter((skill) => recommendedIds.includes(skill.id)),
    []
  );

  const command =
    installer === 'npx'
      ? 'npx skills add sunny0826/open-source-skills'
      : 'clawhub install <skill-name>';

  const copyToClipboard = (text: string, key: string) => {
    void navigator.clipboard.writeText(text).catch(() => undefined);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1600);
  };

  const skillCommand = (skillId: string, type: Installer) =>
    type === 'npx'
      ? `npx skills add sunny0826/open-source-skills --skill ${skillId}`
      : `clawhub install ${skillId}`;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Open Source Skills home">
          <BrandMark />
          <span>{t.navTitle}</span>
        </a>
        <div className="header-actions header-actions-polished">
          <button
            className="ghost-button"
            type="button"
            onClick={() => setLang((current) => (current === 'en' ? 'zh' : 'en'))}
          >
            <Globe aria-hidden="true" />
            <span>{t.languageLabel}</span>
          </button>
          <a
            className="icon-button github-icon-button"
            href="https://github.com/sunny0826/open-source-skills"
            target="_blank"
            rel="noreferrer"
            aria-label={t.viewGithub}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section hero-polish-command">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroLabel}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-desc">{t.heroDesc}</p>

            <div className="install-card" id="install">
              <div className="install-card-header">
                <div>
                  <span className="meta-label">{t.commandLabel}</span>
                  <p>{t.commandNote}</p>
                </div>
                <div className="segment" role="tablist" aria-label={t.installPath}>
                  <button
                    type="button"
                    className={installer === 'npx' ? 'is-active' : ''}
                    onClick={() => setInstaller('npx')}
                  >
                    npx
                  </button>
                  <button
                    type="button"
                    className={installer === 'clawhub' ? 'is-active' : ''}
                    onClick={() => setInstaller('clawhub')}
                  >
                    openclaw
                  </button>
                </div>
              </div>
              <div className="command-row">
                <Terminal aria-hidden="true" />
                <code>{command}</code>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => copyToClipboard(command, 'global-command')}
                  aria-label={t.copyInstall}
                >
                  {copiedKey === 'global-command' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>

          <div className="catalog-frame catalog-frame-command catalog-window-wide catalog-items-command catalog-items-selected" aria-label="Skill catalog preview">
            <div className="frame-bar">
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="frame-url">{t.frameUrl}</span>
            </div>
            <div className="catalog-command-body">
              <section className="catalog-command-inspector" aria-label={t.selected}>
                <span className="meta-label">{t.installPath}</span>
                <h2>{selectedSkill.name}</h2>
                <p>{selectedSkill.description[lang]}</p>
                <div className="detail-meta">
                  <span className="status-chip">{selectedSkill.category}</span>
                  <span className="status-chip accent">{installer}</span>
                </div>
              </section>

              <section className="catalog-command-list" aria-label={t.allSkills}>
                <div className="frame-list-header">
                  <span>{t.allSkills}</span>
                  <span className="mono">{skills.length} indexed</span>
                </div>
                {skills.slice(0, 7).map((skill) => {
                  const Icon = skill.icon;
                  const commandKey = `item-selected-${skill.id}`;
                  return (
                    <div
                      className={`catalog-item-selectable ${selectedSkillId === skill.id ? 'is-selected' : ''}`}
                      key={`item-selected-${skill.id}`}
                    >
                      <button
                        type="button"
                        className="catalog-item-compact"
                        onClick={() => setSelectedSkillId(skill.id)}
                      >
                        <Icon aria-hidden="true" />
                        <span>
                          <strong>{skill.id}</strong>
                          <span>{skill.category}</span>
                        </span>
                        <ChevronRight aria-hidden="true" />
                      </button>
                      {selectedSkillId === skill.id && (
                        <div className="selected-row-command">
                          <Terminal aria-hidden="true" />
                          <code>{skillCommand(skill.id, installer)}</code>
                          <button
                            type="button"
                            className="icon-button"
                            onClick={() => copyToClipboard(skillCommand(skill.id, installer), commandKey)}
                            aria-label={`${t.copyInstall}: ${skill.name}`}
                          >
                            {copiedKey === commandKey ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
          <section className="agents-carousel agents-hero-command" id="agents" aria-labelledby="agents-title">

            <div className="agents-command-line agents-bw-outline agents-rail-tight agents-layout-fixed agents-overlap-clear agents-logo-xl">
              <p className="agents-command-label" id="agents-title">{lang === 'en' ? 'works with' : '支持工具'}</p>
              <div className="agents-command-track" aria-label={t.supportedAgents}>
                <div className="agents-lane">
                  {[...agents, ...agents].map((agent, index) => (
                    <a
                      key={`agents-logo-xl-${agent.name}-${index}`}
                      href={agent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="agents-logo-card"
                      title={agent.name}
                    >
                      <img src={agent.logo} alt="" loading="lazy" />
                      <span>{agent.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </section>
        </section>

        <section className="section-block recommended-path" aria-labelledby="recommended-title">
          <div className="recommended-path-grid">
            <div className="recommended-path-copy">
              <p className="eyebrow">{lang === 'en' ? 'Suggested path' : '建议路径'}</p>
              <h2 id="recommended-title">{t.recommended}</h2>
              <p>{t.recommendedDesc}</p>
              <div className="recommended-command-line">
                <Terminal aria-hidden="true" />
                <code>{command}</code>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => copyToClipboard(command, 'recommended-global-command')}
                  aria-label={t.copyInstall}
                >
                  {copiedKey === 'recommended-global-command' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
            </div>
            <div className="recommended-path-list">
              {recommendedSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <article className="recommended-path-row" key={skill.id}>
                    <span className="recommended-rank">0{index + 1}</span>
                    <div className="skill-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.description[lang]}</p>
                    </div>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => copyToClipboard(skillCommand(skill.id, installer), `recommended-path-${skill.id}`)}
                    >
                      {copiedKey === `recommended-path-${skill.id}` ? t.copied : installer}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section-block skills-catalog" id="skills" aria-labelledby="skills-title">
          <div className="skills-catalog-shell">
            <aside className="skills-catalog-rail">
              <div>
                <p className="eyebrow">{t.allSkills}</p>
                <h2 id="skills-title">{t.allSkills}</h2>
              </div>
              <div className="skills-catalog-meta-polished">
                <span><span>skills</span><strong>{skills.length}</strong></span>
                <span><span>installers</span><strong>2</strong></span>
              </div>
            </aside>
            <div className="skills-catalog-list">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <article className="skills-catalog-row skills-catalog-row-accordion" key={skill.id}>
                    <Icon aria-hidden="true" />
                    <div className="skills-title-stack">
                      <h3>{skill.name}</h3>
                      <details>
                        <summary>{lang === 'en' ? 'Show details' : '展开详情'}</summary>
                        <p>{skill.description[lang]}</p>
                      </details>
                    </div>
                    <span className="status-chip">{skill.category}</span>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => copyToClipboard(skillCommand(skill.id, installer), `catalog-${skill.id}`)}
                    >
                      {copiedKey === `catalog-${skill.id}` ? t.copied : installer}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand">
          <BrandMark />
          <span>{t.navTitle}</span>
        </div>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

export default App;
