import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Send, Command, BrainCircuit, 
  TrendingUp, Wallet, AlertTriangle, MessageSquare,
  Bot, User, ChevronRight, Zap, Shrink, Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  data?: any;
  timestamp: Date;
}

const JouleAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Bonjour ! Je suis **Joule**, votre assistant d'intelligence financière Diamond Elite. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulation de l'IA Joule
    setTimeout(() => {
      let botResponse = "Je n'ai pas trouvé d'information précise sur ce sujet, mais je peux analyser vos journaux comptables.";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('cash') || lowerInput.includes('trésorerie') || lowerInput.includes('solde')) {
        botResponse = "Votre position de trésorerie actuelle est de **333 730 000 F CFA**. Elle est en hausse de **12%** par rapport au mois dernier. Souhaitez-vous voir les prévisions à 30 jours ?";
      } else if (lowerInput.includes('client') || lowerInput.includes('risque')) {
        botResponse = "J'ai identifié **3 clients** dépassant leur limite de crédit, dont **ETABLISSEMENT BETA** avec un dépassement de **3 500 000 F CFA**. Une relance de niveau 2 est suggérée.";
      } else if (lowerInput.includes('immobilisation') || lowerInput.includes('actif')) {
        botResponse = "Votre patrimoine actif s'élève à **23 000 000 F CFA** (Valeur Brute). La prochaine dotation aux amortissements est prévue pour le **31/12/2024**.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* AI Trigger Button - Diamond Style */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 12 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 z-[110] w-20 h-20 bg-[#0a6ed1] rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(10,110,209,0.4)] border border-blue-400/30 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
        <Sparkles className="text-white animate-pulse" size={32} strokeWidth={2.5} />
        <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
      </motion.button>

      {/* Assistant Window - Diamond Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-36 right-12 z-[120] w-[500px] bg-white border border-blue-50 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col transition-all duration-700 ${isMinimized ? 'h-24' : 'h-[750px]'}`}
          >
            {/* Header - Deep Azure */}
            <div className="p-8 bg-[#0a6ed1] flex items-center justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 shadow-2xl backdrop-blur-md">
                   <Bot size={32} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Joule Intelligence</h3>
                   <div className="flex items-center gap-3 mt-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                      <span className="text-[10px] font-black text-blue-50 uppercase tracking-[0.3em] opacity-80 italic">Synchronisé ACDOCA Core</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                 <button onClick={() => setIsMinimized(!isMinimized)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/70 hover:text-white border border-transparent hover:border-white/20">
                    {isMinimized ? <Maximize2 size={24} /> : <Shrink size={24} />}
                 </button>
                 <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all text-white/70 hover:text-white border border-transparent hover:border-white/20">
                    <X size={24} />
                 </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Area - Pure White & High Contrast */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 bg-white custom-scrollbar">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-5 max-w-[90%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-lg transition-transform hover:rotate-12 ${msg.type === 'bot' ? 'bg-blue-50 text-[#0a6ed1] border border-blue-100' : 'bg-slate-900 text-white shadow-xl'}`}>
                           {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                        </div>
                        <div className={`p-6 rounded-[2rem] text-sm font-black leading-relaxed shadow-xl border transition-all ${
                          msg.type === 'bot' 
                          ? 'bg-white text-[#0f172a] border-blue-50 rounded-tl-none shadow-blue-500/5' 
                          : 'bg-[#0a6ed1] text-white border-[#0a6ed1] rounded-tr-none shadow-blue-500/20'
                        }`}>
                          <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b class="text-[#0f172a] font-black underline decoration-[#0a6ed1]/30">$1</b>') }} className={msg.type === 'bot' ? '' : 'text-white'} />
                          <div className={`flex items-center gap-3 mt-4 text-[10px] font-black uppercase tracking-widest ${msg.type === 'bot' ? 'text-slate-300' : 'text-blue-100'}`}>
                             <div className={`w-1 h-4 rounded-full ${msg.type === 'bot' ? 'bg-blue-100' : 'bg-white/30'}`} />
                             {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                       <div className="flex gap-5">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0a6ed1] border border-blue-100 flex items-center justify-center shadow-lg">
                             <Bot size={20} />
                          </div>
                          <div className="bg-white px-6 py-4 rounded-2xl rounded-tl-none border border-blue-50 flex gap-2 shadow-xl items-center">
                             <div className="w-2 h-2 bg-[#0a6ed1] rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-[#0a6ed1] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                             <div className="w-2 h-2 bg-[#0a6ed1] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions - Diamond Style */}
                <div className="px-10 py-6 flex gap-4 overflow-x-auto no-scrollbar bg-blue-50/20 border-t border-blue-50">
                   <QuickChip icon={<Wallet size={16} />} label="Position Cash" onClick={() => setInput("Quel est mon solde de trésorerie ?")} />
                   <QuickChip icon={<AlertTriangle size={16} />} label="Risques Clients" onClick={() => setInput("Quels sont les clients à risque ?")} />
                   <QuickChip icon={<TrendingUp size={16} />} label="Top Revenus" onClick={() => setInput("Quels sont mes meilleurs produits ?")} />
                </div>

                {/* Input Area - Pure White & Luxury Shadows */}
                <div className="p-10 bg-white border-t border-blue-50">
                  <div className="flex items-center gap-5 bg-blue-50/30 border border-blue-100 rounded-[2rem] p-3 shadow-inner group focus-within:border-[#0a6ed1] focus-within:bg-white transition-all duration-500 h-[80px]">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0a6ed1] shadow-lg group-focus-within:rotate-12 transition-transform">
                       <Command size={24} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Demandez n'importe quoi à Joule..." 
                      className="bg-transparent border-none outline-none text-base w-full text-[#0f172a] font-black placeholder:text-slate-200 placeholder:italic placeholder:font-black tracking-tight"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                      onClick={handleSend}
                      className="w-14 h-14 bg-[#0a6ed1] hover:bg-blue-700 rounded-2xl flex items-center justify-center text-white transition-all shadow-3xl shadow-blue-500/40 active:scale-90"
                    >
                       <Send size={24} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const QuickChip = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 px-6 py-3 bg-white border border-blue-100 rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-[#0a6ed1] hover:bg-[#0a6ed1] hover:text-white hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 whitespace-nowrap shadow-sm group active:scale-95"
  >
     <span className="group-hover:scale-125 transition-transform">{icon}</span>
     {label}
  </button>
);

export default JouleAssistant;
