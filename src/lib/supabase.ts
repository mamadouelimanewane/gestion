import { createClient } from '@supabase/supabase-js';

// Configuration Supabase pour GestionPro
// Ces variables seront remplacées par des variables d'environnement en production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types de données comptables pour la persistance
export interface JournalEntry {
  id: string;
  date_piece: string;
  reference: string;
  journal_code: string;
  libelle: string;
  montant_debit: number;
  montant_credit: number;
  compte_numero: string;
  tiers_id?: string;
  analytique_id?: string;
  status: 'draft' | 'posted' | 'validated';
  created_at: string;
  user_id: string;
  hash?: string; // Pour l'immuabilité (Blockchain-style)
}

export interface TaxDeclaration {
  id: string;
  periode: string;
  total_ca: number;
  tva_collectee: number;
  tva_deductible: number;
  net_a_payer: number;
  status: 'draft' | 'transmitted';
  edi_file?: string;
}

// Hooks ou services de persistance (simulés pour l'instant)
export const accountingService = {
  async getEntries() {
    // const { data, error } = await supabase.from('journal_entries').select('*');
    // return data;
    return []; // Mock
  },

  async postEntry(entry: Partial<JournalEntry>) {
    // Logique de hashage pour l'immuabilité avant insertion
    const entryData = JSON.stringify(entry);
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(entryData));
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    // const { data, error } = await supabase.from('journal_entries').insert([{ ...entry, hash: hashHex }]);
    console.log("Entry hashed and ready for persistence:", hashHex);
    return { ...entry, hash: hashHex };
  }
};
