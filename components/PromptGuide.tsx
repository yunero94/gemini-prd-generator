import React from 'react';
import { X, BookOpen, CheckCircle, XCircle, ArrowRight, Lightbulb, Target } from 'lucide-react';

interface PromptGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromptGuide: React.FC<PromptGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-zinc-50/80">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl shadow-sm">
                <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Prompt Engineering Guide</h2>
                <p className="text-sm text-zinc-500 font-medium">Mastering the art of PRD generation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-10">
            {/* Section 1: The Basics */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                        The Golden Rule
                    </h3>
                </div>
                
                <p className="text-zinc-600 leading-relaxed mb-6 pl-1">
                    The quality of the generated PRD is directly proportional to the context you provide. 
                    Gemini is powerful, but it relies on your specific business logic and constraints to create meaningful requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                        <h4 className="flex items-center text-rose-700 font-bold text-sm mb-3">
                            <XCircle className="w-4 h-4 mr-2" /> Vague Input
                        </h4>
                        <p className="text-rose-900/80 text-sm italic mb-3">
                            "Make a food delivery app like UberEats."
                        </p>
                        <div className="text-xs text-rose-600 font-medium border-t border-rose-200/50 pt-2">
                            Result: Generic features, no unique value proposition, standard boilerplate text.
                        </div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                        <h4 className="flex items-center text-emerald-700 font-bold text-sm mb-3">
                            <CheckCircle className="w-4 h-4 mr-2" /> Contextual Input
                        </h4>
                        <p className="text-emerald-900/80 text-sm italic mb-3">
                            "A hyper-local food delivery app for home-cooked meals by neighborhood chefs. Features: 24h pre-order system, strict hygiene rating integration, and neighborhood-based community reviews."
                        </p>
                        <div className="text-xs text-emerald-600 font-medium border-t border-emerald-200/50 pt-2">
                            Result: Tailored features, specific user flows, relevant technical considerations.
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: The Framework */}
            <section>
                 <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">
                        The "RISE" Framework
                    </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                        <span className="text-2xl font-black text-amber-500 block mb-1">R</span>
                        <h4 className="font-bold text-zinc-900 text-sm">Role & User</h4>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Who is the product for? (e.g., "Busy parents", "Enterprise DevOps", "Gig economy workers")</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                        <span className="text-2xl font-black text-amber-500 block mb-1">I</span>
                        <h4 className="font-bold text-zinc-900 text-sm">Input & Core Features</h4>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">What are the mechanics? (e.g., "Data ingestion from CSV", "Real-time chat", "QR Code scanning")</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                        <span className="text-2xl font-black text-amber-500 block mb-1">S</span>
                        <h4 className="font-bold text-zinc-900 text-sm">Steps & Journey</h4>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Key user flows. (e.g., "User signs up -> Verifies ID -> Browses Listings -> Books Appointment")</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                        <span className="text-2xl font-black text-amber-500 block mb-1">E</span>
                        <h4 className="font-bold text-zinc-900 text-sm">Expectations & Constraints</h4>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Success metrics or limits. (e.g., "Must be GDPR compliant", "Mobile-first design", "Sub-200ms latency")</p>
                    </div>
                </div>
            </section>

             {/* Section 3: Detailed Checklist */}
             <section>
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4 border-l-4 border-blue-500 pl-3">
                    Pre-Generation Checklist
                </h3>
                <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100/50">
                    <ul className="space-y-3">
                        {[
                            "Did you define the primary user persona?",
                            "Did you list 3-5 core features clearly?",
                            "Did you mention platform constraints (iOS only, Web only)?",
                            "Did you clarify the monetization model (if relevant)?",
                            "Did you mention any 3rd party integrations (Stripe, Maps)?"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-zinc-700">
                                <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>

        {/* Footer */}
        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-zinc-900/10 active:scale-95"
            >
                I'm Ready to Build
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromptGuide;