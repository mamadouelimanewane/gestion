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
      text: "Bonjour ! Je suis **Joule**, votre assistant d'intelligence financière. Comment puis-je vous aider aujourd'hui ?",
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
      {/* AI Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 border border-indigo-400/30 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent"></div>
        <Sparkles className="text-white group-hover:rotate-12 transition-transform" size={28} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
      </motion.button>

      {/* Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-28 right-8 z-[110] w-[450px] bg-slate-900 border border-slate-700/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-all ${isMinimized ? 'h-20' : 'h-[600px]'}`}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10">
                   <Bot size={22} className="text-white" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest">Joule Agent</h3>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-[9px] font-bold text-indigo-100 uppercase tracking-tighter">Connecté au Journal Universel</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/70 hover:text-white">
                    {isMinimized ? <Maximize2 size={18} /> : <Shrink size={18} />}
                 </button>
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/70 hover:text-white">
                    <X size={18} />
                 </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.type === 'bot' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                           {msg.type === 'bot' ? <Bot size={14} /> : <User size={14} />}
                        </div>
                        <div className={`p-4 rounded-3xl text-xs leading-relaxed ${
                          msg.type === 'bot' 
                          ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none' 
                          : 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20'
                        }`}>
                          <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-black">$1</b>') }} />
                          <span className={`text-[9px] mt-2 block ${msg.type === 'bot' ? 'text-slate-500' : 'text-indigo-200'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                       <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                             <Bot size={14} />
                          </div>
                          <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                             <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                             <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                             <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar">
                   <QuickChip icon={<Wallet size={12} />} label="Position Cash" onClick={() => setInput("Quel est mon solde de trésorerie ?")} />
                   <QuickChip icon={<AlertTriangle size={12} />} label="Risques Clients" onClick={() => setInput("Quels sont les clients à risque ?")} />
                   <QuickChip icon={<TrendingUp size={12} />} label="Top Revenus" onClick={() => setInput("Quels sont mes meilleurs produits ?")} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-slate-800/50 border-t border-slate-700/50">
                  <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-inner group focus-within:border-indigo-500 transition-all">
                    <Command size={18} className="text-slate-500 ml-2" />
                    <input 
                      type="text" 
                      placeholder="Demandez n'importe quoi à Joule..." 
                      className="bg-transparent border-none outline-none text-xs w-full text-slate-200"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                      onClick={handleSend}
                      className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center text-white transition-all shadow-lg shadow-indigo-600/20"
                    >
                       <Send size={18} />
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
    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all whitespace-nowrap"
  >
     {icon}
     {label}
  </button>
);

export default JouleAssistant;
