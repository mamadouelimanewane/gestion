/**
 * Service de liaison automatique entre les modules opérationnels
 * (Ventes, Achats, Stocks) et la Comptabilité.
 */
export const AccountingLinkService = {
  /**
   * Simule la génération d'une écriture comptable à partir d'une facture
   */
  generateEntryFromInvoice: (invoice: any) => {
    console.log(`[AccountingLink] Génération des écritures pour la facture ${invoice.number}`);
    
    return [
      {
        date: new Date().toLocaleDateString(),
        journal: 'VTE',
        compte: '411000', // Client
        tiers: invoice.clientName,
        libelle: `Facture ${invoice.number} - ${invoice.clientName}`,
        debit: invoice.totalTTC,
        credit: 0
      },
      {
        date: new Date().toLocaleDateString(),
        journal: 'VTE',
        compte: '701000', // Ventes
        libelle: `Facture ${invoice.number} - ${invoice.clientName}`,
        debit: 0,
        credit: invoice.totalHT
      },
      {
        date: new Date().toLocaleDateString(),
        journal: 'VTE',
        compte: '445710', // TVA collectée
        libelle: `TVA sur Facture ${invoice.number}`,
        debit: 0,
        credit: invoice.totalTTC - invoice.totalHT
      }
    ];
  },

  /**
   * Simule la génération d'une écriture comptable à partir d'un achat
   */
  generateEntryFromPurchase: (purchase: any) => {
    console.log(`[AccountingLink] Génération des écritures pour l'achat ${purchase.ref}`);
    
    return [
      {
        date: new Date().toLocaleDateString(),
        journal: 'ACH',
        compte: '601000', // Achats
        libelle: `Achat ${purchase.ref} - ${purchase.supplier}`,
        debit: purchase.amountHT,
        credit: 0
      },
      {
        date: new Date().toLocaleDateString(),
        journal: 'ACH',
        compte: '445660', // TVA déductible
        libelle: `TVA sur Achat ${purchase.ref}`,
        debit: purchase.amountTTC - purchase.amountHT,
        credit: 0
      },
      {
        date: new Date().toLocaleDateString(),
        journal: 'ACH',
        compte: '401000', // Fournisseur
        tiers: purchase.supplier,
        libelle: `Achat ${purchase.ref} - ${purchase.supplier}`,
        debit: 0,
        credit: purchase.amountTTC
      }
    ];
  }
};
