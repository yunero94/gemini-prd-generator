import React, { useState, useMemo } from 'react';
import { PRDParams, ProjectType, DetailLevel } from '../types';
import InputField from './InputField';
import PromptGuide from './PromptGuide';
import { Settings2, Sparkles, ChevronDown, ChevronUp, Lightbulb, AlertTriangle, Zap, BookOpen } from 'lucide-react';

interface ConfigurationFormProps {
  params: PRDParams;
  setParams: React.Dispatch<React.SetStateAction<PRDParams>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ params, setParams, onGenerate, isGenerating }) => {
  const [showTips, setShowTips] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const updateParam = <K extends keyof PRDParams>(key: K, value: PRDParams[K]) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  // Calculate Prompt Strength
  const promptStrength = useMemo(() => {
    const text = params.description.trim();
    if (!text) return { score: 0, label: 'Empty', color: 'bg-zinc-200', textColor: 'text-zinc-400' };

    let score = 0;
    const length = text.length;

    if (length > 20) score += 20;
    if (length > 100) score += 20;
    if (length > 250) score += 20;

    const keywords = ['user', 'feature', 'data', 'screen', 'mobile', 'web', 'api', 'admin', 'analytics', 'login', 'system'];
    const foundKeywords = keywords.filter(k => text.toLowerCase().includes(k));
    if (foundKeywords.length > 2) score += 20;
    if (foundKeywords.length > 5) score += 20;

    if (score >= 80) return { score, label: 'Excellent', color: 'bg-emerald-500', textColor: 'text-emerald-600' };
    if (score >= 60) return { score, label: 'Good', color: 'bg-teal-400', textColor: 'text-teal-500' };
    if (score >= 40) return { score, label: 'Moderate', color: 'bg-amber-400', textColor: 'text-amber-600' };
    return { score, label: 'Weak', color: 'bg-rose-400', textColor: 'text-rose-500' };
  }, [params.description]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-zinc-100 overflow-y-auto custom-scrollbar relative">
      <PromptGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
      
      <div className="p-8 space-y-8">
        
        {/* Project Section */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center">
              <Settings2 className="w-4 h-4 mr-2 text-zinc-400" />
              Project Basics
            </h2>
          </div>
          
          <InputField
            id="projectName"
            label="Project Name"
            value={params.projectName}
            onChange={(v) => updateParam('projectName', v)}
            placeholder="e.g. Nexus Dashboard"
            required
          />

          <div className="mb-5">
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Project Type</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(ProjectType).map((type) => (
                <button
                  key={type}
                  onClick={() => updateParam('projectType', type)}
                  className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-all text-left ${
                    params.projectType === type 
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <InputField
            id="targetAudience"
            label="Target Audience"
            value={params.targetAudience}
            onChange={(v) => updateParam('targetAudience', v)}
            placeholder="e.g. Creative Professionals, Enterprise Teams"
          />
        </section>

        {/* Description Section */}
        <section>
          <div className="flex justify-between items-end mb-2">
            <label htmlFor="description" className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              The Idea <span className="text-zinc-300 font-normal normal-case ml-1">(Be Descriptive)</span> <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowGuide(true)}
                className="text-xs flex items-center text-zinc-500 hover:text-zinc-800 font-medium transition-colors focus:outline-none"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Prompt Guide
              </button>
              <button
                onClick={() => setShowTips(!showTips)}
                className="text-xs flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors focus:outline-none"
              >
                {showTips ? 'Hide Tips' : 'Quick Tips'}
                {showTips ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
              </button>
            </div>
          </div>

          {showTips && (
            <div className="mb-6 p-5 bg-zinc-50/80 rounded-2xl border border-zinc-100 text-xs text-zinc-600 animate-in fade-in slide-in-from-top-2 shadow-inner">
              
              <div className="mb-5">
                <h4 className="font-bold text-zinc-900 mb-3 flex items-center uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1.5 text-indigo-500" /> Strong Examples
                </h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-zinc-100 shadow-sm">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase mb-1 block">Mobile App</span>
                    <p className="italic leading-relaxed text-zinc-700">
                      "A fitness tracking app for seniors. Features large typography, voice commands for logging meals, medication reminders, and a one-touch emergency SOS. Needs simple navigation and high contrast mode."
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-zinc-100 shadow-sm">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase mb-1 block">API Backend</span>
                    <p className="italic leading-relaxed text-zinc-700">
                      "A high-performance inventory API for e-commerce. Endpoints for SKU creation, batch stock updates, and low-stock webhooks. Must support multi-tenant architecture and handle 10k req/sec."
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-zinc-200/50">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                    <AlertTriangle className="w-3 h-3 mr-1.5 text-rose-500" /> What to Avoid
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-rose-700 bg-rose-50/50 p-2 rounded">
                      <span className="mr-2 font-bold">×</span>
                      "Make a Facebook clone." <span className="text-rose-400 ml-1 opacity-80">(Too broad)</span>
                    </li>
                     <li className="flex items-start text-rose-700 bg-rose-50/50 p-2 rounded">
                      <span className="mr-2 font-bold">×</span>
                      "Just use Python and React." <span className="text-rose-400 ml-1 opacity-80">(No functionality)</span>
                    </li>
                    <li className="flex items-start text-rose-700 bg-rose-50/50 p-2 rounded">
                      <span className="mr-2 font-bold">×</span>
                      "It needs to be fast and look good." <span className="text-rose-400 ml-1 opacity-80">(Subjective)</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}

          <div className="relative">
            <textarea
              id="description"
              className="w-full px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 text-zinc-800 text-sm placeholder-zinc-400 transition-all resize-none shadow-sm min-h-[160px]"
              value={params.description}
              onChange={(e) => updateParam('description', e.target.value)}
              placeholder="Describe your vision..."
            />
            <div className="absolute bottom-3 right-3">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white shadow-sm border border-zinc-100 ${promptStrength.textColor}`}>
                   {promptStrength.label}
                 </span>
            </div>
          </div>
          
          {/* Strength Meter Line */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 bg-zinc-100 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-700 ease-out ${promptStrength.color}`} 
                style={{ width: `${promptStrength.score}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Configuration Section */}
        <section className="pt-6 border-t border-zinc-100">
          <div className="mb-5">
             <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Detail Level</label>
             <div className="relative">
                <select 
                    value={params.detailLevel}
                    onChange={(e) => updateParam('detailLevel', e.target.value as DetailLevel)}
                    className="w-full appearance-none px-4 py-3 bg-zinc-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 text-sm text-zinc-800 cursor-pointer hover:bg-zinc-100/50"
                >
                    {Object.values(DetailLevel).map((level) => (
                    <option key={level} value={level}>{level}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-400">
                    <ChevronDown className="w-4 h-4" />
                </div>
             </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-zinc-50 rounded-lg -ml-2 transition-colors">
              <input
                type="checkbox"
                checked={params.includeUserStories}
                onChange={(e) => updateParam('includeUserStories', e.target.checked)}
                className="w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-500"
              />
              <span className="text-sm text-zinc-600 group-hover:text-zinc-900 font-medium">Include User Stories</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group p-2 hover:bg-zinc-50 rounded-lg -ml-2 transition-colors">
              <input
                type="checkbox"
                checked={params.includeTechStack}
                onChange={(e) => updateParam('includeTechStack', e.target.checked)}
                className="w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-500"
              />
              <span className="text-sm text-zinc-600 group-hover:text-zinc-900 font-medium">Include Tech Stack</span>
            </label>
          </div>
        </section>
      </div>

      <div className="mt-auto p-6 bg-white border-t border-zinc-100 sticky bottom-0 z-10">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !params.description.trim() || !params.projectName.trim()}
          className={`w-full flex items-center justify-center py-4 px-6 rounded-xl text-white font-bold tracking-wide transition-all duration-300 transform active:scale-[0.98] ${
            isGenerating || !params.description.trim() || !params.projectName.trim()
              ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-900 hover:bg-black shadow-lg hover:shadow-xl shadow-zinc-900/10'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Crafting PRD...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2 fill-current" />
              Generate Document
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfigurationForm;