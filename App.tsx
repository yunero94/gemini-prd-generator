import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ConfigurationForm from './components/ConfigurationForm';
import OutputDisplay from './components/OutputDisplay';
import { PRDParams, ProjectType, DetailLevel, GeneratedPRD } from './types';
import { generatePRD } from './services/geminiService';

const App: React.FC = () => {
  const [params, setParams] = useState<PRDParams>({
    projectName: '',
    description: '',
    projectType: ProjectType.WEB_APP,
    detailLevel: DetailLevel.STANDARD,
    targetAudience: '',
    includeTechStack: true,
    includeUserStories: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<GeneratedPRD | null>(null);
  const [error, setError] = useState<string | null>(null);

  // History State
  const [history, setHistory] = useState<GeneratedPRD[]>(() => {
    try {
      const saved = localStorage.getItem('prd_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  // Persist history whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('prd_history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!params.description || !params.projectName) return;

    setIsGenerating(true);
    setError(null);
    setData(null);

    try {
      const result = await generatePRD(params);
      setData(result);
      
      // Add to history
      setHistory(prev => [result, ...prev]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsGenerating(false);
    }
  }, [params]);

  const handleSelectVersion = (version: GeneratedPRD) => {
    setData(version);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen font-sans text-zinc-900">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Configuration - Fixed Width */}
        <div className="w-full md:w-96 lg:w-[28rem] flex-shrink-0 border-r border-zinc-200 bg-white z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
          <ConfigurationForm 
            params={params} 
            setParams={setParams} 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* Right Panel: Output - Canvas Style */}
        <div className="flex-1 overflow-hidden bg-zinc-100/50 bg-dot-pattern relative">
          <OutputDisplay 
            data={data}
            error={error}
            isGenerating={isGenerating}
            history={history}
            onSelectVersion={handleSelectVersion}
          />
        </div>
      </main>
    </div>
  );
};

export default App;