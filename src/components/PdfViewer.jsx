import React from 'react';
import { FileText, Download, Award, GraduationCap, Briefcase, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export function PdfViewer({ file }) {
  const handleDownload = () => {
    const textContent = `${portfolioData.developer.name.toUpperCase()} - RESUME\n${portfolioData.developer.title}\nEmail: ${portfolioData.developer.email}\nEducation: ${portfolioData.education.degree} in ${portfolioData.education.field} at ${portfolioData.education.institution}\nSkills: ${portfolioData.skills.languages.join(', ')}, ${portfolioData.skills.frontend.join(', ')}, ${portfolioData.skills.backend.join(', ')}`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Yogesh_Singh_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-[#101010] p-6 overflow-y-auto flex flex-col items-center select-text">
      {/* Top Controls Bar */}
      <div className="w-full max-w-3xl bg-[#101010] border border-white/[0.045] rounded-t-lg p-3 flex items-center justify-between text-xs text-[#B8B8B8]">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-[#A87878]" />
          <span className="font-semibold text-[#B8B8B8]">Yogesh_Singh_Resume.pdf</span>
          <span className="bg-[#252525] text-[10px] px-2 py-0.5 rounded text-[#707070]">PDF Document</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 bg-[#4F8CC9] hover:bg-[#3b72aa] text-white px-3 py-1 rounded transition-colors text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>

      {/* Main Document Viewer Canvas */}
      <div className="w-full max-w-3xl bg-[#141414] border-x border-b border-white/[0.045] rounded-b-lg p-8 shadow-2xl space-y-8 text-[#B8B8B8] font-sans">
        {/* Document Header */}
        <div className="border-b border-white/[0.045] pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#C0C0C0] tracking-tight">{portfolioData.developer.name}</h1>
            <p className="text-[#4F8CC9] font-medium text-sm mt-1">{portfolioData.developer.title} & Developer</p>
            <p className="text-xs text-[#707070] mt-1 flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{portfolioData.developer.email}</span>
            </p>
          </div>
          <div className="bg-[#252525] px-3 py-1.5 rounded border border-white/[0.045] text-[11px] text-[#707070]">
            Status: Available for hire
          </div>
        </div>

        {/* Executive Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-bold text-[#707070] uppercase tracking-wider flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#B8A86A]" />
            <span>Profile Summary</span>
          </h2>
          <p className="text-xs text-[#B8B8B8] leading-relaxed bg-[#101010] p-3.5 rounded border border-white/[0.045]">
            {portfolioData.developer.bio}
          </p>
        </section>

        {/* Education Section */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-[#707070] uppercase tracking-wider flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-[#4F8CC9]" />
            <span>Education</span>
          </h2>
          <div className="bg-[#101010] p-4 rounded border border-white/[0.045] space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-[#C0C0C0]">
              <span>{portfolioData.education.degree} in {portfolioData.education.field}</span>
              <span className="text-[#707070] font-normal text-[11px]">{portfolioData.education.status}</span>
            </div>
            <p className="text-xs text-[#4F8CC9]">{portfolioData.education.institution}</p>
          </div>
        </section>

        {/* Projects Summary */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-[#707070] uppercase tracking-wider flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-[#789B78]" />
            <span>Featured Portfolio Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {portfolioData.projects.map((proj) => (
              <div key={proj.id} className="bg-[#101010] p-3.5 rounded border border-white/[0.045] space-y-1">
                <div className="font-semibold text-[#C0C0C0]">{proj.name}</div>
                <div className="text-[11px] text-[#707070]">{proj.description}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
