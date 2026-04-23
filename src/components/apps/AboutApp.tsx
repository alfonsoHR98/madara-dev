import { motion } from "framer-motion";
import { Globe, Mail, MapPin, Download, ExternalLink } from "lucide-react";
import data from "../../data/resume.json";

function GithubIcon({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Separator() {
    return <div className="resume-separator" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="resume-section-title">{children}</h2>;
}

export default function AboutApp() {
    const { personalInfo, experience, projects, skills, education, languages } = data;

    return (
        <motion.div
            className="resume-root"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* ── Header ── */}
            <motion.div variants={item} className="resume-header">
                <motion.div
                    className="about-avatar"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                >
                    {personalInfo.avatarUrl ? (
                        <img src={personalInfo.avatarUrl} alt={personalInfo.name} />
                    ) : (
                        <div className="avatar-initials">{personalInfo.initials}</div>
                    )}
                </motion.div>

                <div className="resume-header-info">
                    <p className="app-label">Perfil</p>
                    <h1 className="resume-name">{personalInfo.name}</h1>
                    <p className="about-alias">{personalInfo.alias} · {personalInfo.title}</p>
                    <p className="about-bio">{personalInfo.summary}</p>

                    <div className="resume-meta">
                        <span><MapPin size={13} /> {personalInfo.location}</span>
                        <span><Mail size={13} /> {personalInfo.email}</span>
                    </div>

                    <div className="resume-socials">
                        <motion.a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-social-btn"
                            whileHover={{ y: -2 }}
                        >
                            <GithubIcon size={14} /> GitHub
                        </motion.a>
                        <motion.a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-social-btn"
                            whileHover={{ y: -2 }}
                        >
                            <LinkedinIcon size={14} /> LinkedIn
                        </motion.a>
                        <motion.button
                            className="resume-social-btn resume-social-btn--primary"
                            whileHover={{ y: -2 }}
                            onClick={() => window.print()}
                        >
                            <Download size={14} /> Descargar CV
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <Separator />

            {/* ── Experience ── */}
            <motion.div variants={item} className="resume-section">
                <SectionTitle>Experiencia</SectionTitle>
                <div className="resume-experience-list">
                    {experience.map((job, i) => (
                        <div key={i} className="resume-exp-item">
                            <div className="resume-exp-header">
                                <div>
                                    <h3 className="resume-exp-role">{job.role}</h3>
                                    <p className="resume-exp-company">{job.company}</p>
                                    <p className="resume-exp-location">{job.location}</p>
                                </div>
                                <span className="resume-badge">{job.period}</span>
                            </div>
                            <ul className="resume-exp-achievements">
                                {job.achievements.map((a, j) => (
                                    <li key={j}><span>•</span>{a}</li>
                                ))}
                            </ul>
                            {i < experience.length - 1 && <Separator />}
                        </div>
                    ))}
                </div>
            </motion.div>

            <Separator />

            {/* ── Projects ── */}
            <motion.div variants={item} className="resume-section">
                <SectionTitle>Proyectos destacados</SectionTitle>
                <div className="resume-projects-grid">
                    {projects.map((proj, i) => (
                        <motion.a
                            key={i}
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-project-card"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="resume-project-top">
                                <h3>{proj.name}</h3>
                                <ExternalLink size={13} />
                            </div>
                            <p>{proj.desc}</p>
                            <div className="resume-project-stack">
                                {proj.tech.map(t => (
                                    <span key={t} className="resume-tag">{t}</span>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            <Separator />

            {/* ── Skills ── */}
            <motion.div variants={item} className="resume-section">
                <SectionTitle>Skills</SectionTitle>
                <div className="resume-skills-list">
                    {skills.map((group, i) => (
                        <div key={i} className="resume-skill-group">
                            <p className="resume-skill-category">{group.category}</p>
                            <div className="skills-grid">
                                {group.items.map(s => (
                                    <motion.span
                                        key={s}
                                        className="skill-tag"
                                        style={{ "--skill-color": "var(--text)" } as React.CSSProperties}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {s}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <Separator />

            {/* ── Education ── */}
            <motion.div variants={item} className="resume-section">
                <SectionTitle>Educación</SectionTitle>
                <div className="resume-education-list">
                    {education.map((edu, i) => (
                        <div key={i} className="resume-edu-item">
                            <div className="resume-edu-header">
                                <div>
                                    <h3 className="resume-edu-degree">{edu.degree}</h3>
                                    <p className="resume-edu-institution">{edu.institution}</p>
                                </div>
                                <span className="resume-muted-text">{edu.period}</span>
                            </div>
                            {edu.extra && (
                                <span className="resume-badge resume-badge--outline">{edu.extra}</span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            <Separator />

            {/* ── Languages ── */}
            <motion.div variants={item} className="resume-section">
                <SectionTitle>Idiomas</SectionTitle>
                <div className="resume-languages-grid">
                    {languages.map((lang, i) => (
                        <div key={i} className="resume-lang-item">
                            <div className="resume-lang-header">
                                <span>{lang.lang}</span>
                                <span className="resume-muted-text">{lang.level}</span>
                            </div>
                            <div className="resume-lang-track">
                                <motion.div
                                    className="resume-lang-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${lang.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <Separator />

            {/* ── Actions ── */}
            <motion.div variants={item} className="app-actions" style={{ paddingBottom: "0.5rem" }}>
                <button type="button" data-target="window-projects">Ver proyectos</button>
                <button type="button" data-target="window-contact">Contacto</button>
            </motion.div>
        </motion.div>
    );
}
