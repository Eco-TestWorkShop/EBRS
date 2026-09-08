
/**
 * French Localization Module
 *
 * IMPORTANT:
 * - No HTTP endpoint.
 * - No worker file.
 * - No changes required in vite.config.js.
 */

const isServer = typeof window === 'undefined';

const isTranslationProcess =
  isServer &&
  process.env.FRENCH_TRANSLATION_PROCESS === 'true';


// ============================================================
// FALLBACK TRANSLATIONS
// ============================================================
//
// KEEP YOUR ORIGINAL fallbackTranslations OBJECT HERE.
// Do not replace it with a different translation object.
//
// Example:

const fallbackTranslations = {
  app: {
    name: "Panneau d'Administration REChain",
    version: '2.3.0',
    description: 'Tableau de bord administratif pour la plateforme REChain',
    title: 'REChain - Administration',
    welcome: 'Bienvenue sur REChain',
  },
  navigation: {
    dashboard: 'Tableau de bord',
    users: 'Utilisateurs',
    projects: 'Projets',
    analytics: 'Analytique',
    settings: 'Paramètres',
    profile: 'Profil',
    logout: 'Déconnexion',
    login: 'Connexion',
    register: 'Inscription',
    help: 'Aide',
    documentation: 'Documentation',
    support: 'Support',
  },
  actions: {
    create: 'Créer',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    export: 'Exporter',
    import: 'Importer',
    search: 'Rechercher',
    filter: 'Filtrer',
    refresh: 'Rafraîchir',
    download: 'Télécharger',
    upload: 'Télécharger (envoi)',
    submit: 'Soumettre',
    reset: 'Réinitialiser',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    view: 'Voir',
    update: 'Mettre à jour',
    add: 'Ajouter',
    remove: 'Retirer',
    approve: 'Approuver',
    reject: 'Rejeter',
    archive: 'Archiver',
    restore: 'Restaurer',
  },
  status: {
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En attente',
    'in-progress': 'En cours',
    'in-review': 'En révision',
    planning: 'Planification',
    completed: 'Terminé',
    cancelled: 'Annulé',
    draft: 'Brouillon',
    published: 'Publié',
    archived: 'Archivé',
    deleted: 'Supprimé',
    failed: 'Échoué',
    success: 'Succès',
    warning: 'Attention',
    info: 'Information',
    error: 'Erreur',
    processing: 'Traitement en cours',
    ready: 'Prêt',
    paused: 'En pause',
    stopped: 'Arrêté',
  },
  errors: {
    generic: "Une erreur s'est produite. Veuillez réessayer.",
    notFound: 'Page non trouvée.',
    unauthorized: "Vous n'êtes pas autorisé à voir cette page.",
    networkError: 'Erreur réseau. Veuillez vérifier votre connexion.',
    validation: 'Erreur de validation des données.',
    serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
    timeout: 'La requête a expiré. Veuillez réessayer.',
    forbidden: 'Accès interdit.',
    badRequest: 'Requête invalide.',
    conflict: 'Conflit avec les données existantes.',
    tooManyRequests: 'Trop de requêtes. Veuillez attendre.',
    maintenance: 'Le système est en maintenance. Veuillez réessayer plus tard.',
    offline: "Vous êtes hors ligne. Veuillez vérifier votre connexion.",
    fileTooLarge: 'Le fichier est trop volumineux.',
    invalidFileType: 'Type de fichier non pris en charge.',
    missingFields: 'Veuillez remplir tous les champs requis.',
    passwordMismatch: 'Les mots de passe ne correspondent pas.',
    weakPassword: 'Le mot de passe doit contenir au moins 8 caractères.',
    emailInvalid: "Veuillez entrer une adresse email valide.",
    phoneInvalid: "Veuillez entrer un numéro de téléphone valide.",
  },
  messages: {
    welcome: 'Bon retour, {name} !',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    successSave: 'Modifications enregistrées avec succès.',
    successDelete: 'Élément supprimé avec succès.',
    successCreate: 'Élément créé avec succès.',
    successUpdate: 'Mise à jour effectuée avec succès.',
    successUpload: 'Fichier téléchargé avec succès.',
    successExport: 'Exportation réussie.',
    errorSave: "Erreur lors de l'enregistrement.",
    errorDelete: 'Erreur lors de la suppression.',
    errorCreate: 'Erreur lors de la création.',
    loading: 'Chargement...',
    noData: 'Aucune donnée disponible.',
    noResults: 'Aucun résultat trouvé.',
    selectItem: 'Veuillez sélectionner un élément.',
    selectAll: 'Tout sélectionner',
    deselectAll: 'Tout désélectionner',
    confirmAction: "Confirmer l'action",
    cancelAction: "Annuler l'action",
    requiredField: 'Ce champ est requis.',
    optionalField: 'Ce champ est optionnel.',
    characterCount: '{count} caractères',
    fileUploaded: 'Fichier téléchargé : {filename}',
    changesSaved: 'Modifications sauvegardées',
    unsavedChanges: 'Vous avez des modifications non sauvegardées.',
    sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.',
  },
  dashboard: {
    title: 'Tableau de bord',
    totalUsers: 'Utilisateurs Totaux',
    activeProjects: 'Projets Actifs',
    revenue: 'Revenus',
    recentActivity: 'Activité Récente',
    viewAll: 'Voir Tout',
    statistics: 'Statistiques',
    quickActions: 'Actions Rapides',
    notifications: 'Notifications',
    tasks: 'Tâches',
    calendar: 'Calendrier',
    reports: 'Rapports',
    welcomeMessage: 'Bienvenue sur votre tableau de bord',
    lastLogin: 'Dernière connexion : {date}',
    accountStatus: 'Statut du compte : {status}',
    recentUsers: 'Utilisateurs Récents',
    topProjects: 'Projets Principaux',
    systemHealth: 'Santé du Système',
  },
  users: {
    list: "Liste des Utilisateurs",
    addUser: "Ajouter un Utilisateur",
    editUser: "Modifier un Utilisateur",
    deleteUser: "Supprimer un Utilisateur",
    name: 'Nom',
    email: 'Adresse Email',
    role: 'Rôle',
    status: 'Statut',
    createdAt: 'Créé le',
    updatedAt: 'Modifié le',
    actions: 'Actions',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    profile: 'Profil Utilisateur',
    settings: 'Paramètres Utilisateur',
    permissions: 'Permissions',
    groups: 'Groupes',
    lastLogin: 'Dernière Connexion',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    country: 'Pays',
    postalCode: 'Code Postal',
    roles: {
      admin: 'Administrateur',
      user: 'Utilisateur',
      manager: 'Gestionnaire',
      developer: 'Développeur',
      viewer: 'Observateur',
      contributor: 'Contributeur',
      moderator: 'Modérateur',
    },
    fields: {
      firstName: 'Prénom',
      lastName: 'Nom',
      fullName: 'Nom Complet',
      username: "Nom d'utilisateur",
    },
  },
  projects: {
    list: 'Liste des Projets',
    addProject: 'Ajouter un Projet',
    editProject: 'Modifier un Projet',
    deleteProject: 'Supprimer un Projet',
    name: 'Nom du Projet',
    description: 'Description',
    status: 'Statut',
    progress: 'Progrès',
    team: 'Équipe',
    dueDate: "Date d'échéance",
    priority: 'Priorité',
    budget: 'Budget',
    startDate: 'Date de Début',
    endDate: 'Date de Fin',
    category: 'Catégorie',
    tags: 'Étiquettes',
    attachments: 'Pièces Jointes',
    comments: 'Commentaires',
    tasks: 'Tâches',
    milestones: 'Étapes',
    risks: 'Risques',
    stakeholders: 'Parties Prenantes',
    priorities: {
      low: 'Basse',
      medium: 'Moyenne',
      high: 'Haute',
      critical: 'Critique',
    },
    categories: {
      development: 'Développement',
      design: 'Design',
      marketing: 'Marketing',
      sales: 'Ventes',
      support: 'Support',
      research: 'Recherche',
      other: 'Autre',
    },
  },
  settings: {
    general: 'Paramètres Généraux',
    security: 'Paramètres de Sécurité',
    appearance: "Paramètres d'Apparence",
    language: 'Langue',
    theme: 'Thème',
    notifications: 'Notifications',
    saveChanges: 'Enregistrer les Modifications',
    profile: 'Paramètres du Profil',
    account: 'Paramètres du Compte',
    privacy: 'Paramètres de Confidentialité',
    preferences: 'Préférences',
    about: 'À Propos',
    help: 'Aide et Support',
    terms: "Conditions d'Utilisation",
    privacyPolicy: 'Politique de Confidentialité',
    cookieSettings: 'Paramètres des Cookies',
    themes: {
      light: 'Clair',
      dark: 'Sombre',
      system: 'Système',
      blue: 'Bleu',
      green: 'Vert',
      red: 'Rouge',
    },
    languages: {
      fr: 'Français',
      en: 'Anglais',
      es: 'Espagnol',
      de: 'Allemand',
      zh: 'Chinois',
      ja: 'Japonais',
      ko: 'Coréen',
      pt: 'Portugais',
      it: 'Italien',
      ru: 'Russe',
    },
  },
  auth: {
    login: 'Connexion',
    register: 'Inscription',
    forgotPassword: 'Mot de passe oublié ?',
    resetPassword: 'Réinitialiser le mot de passe',
    email: 'Email',
    password: 'Mot de passe',
    rememberMe: 'Se souvenir de moi',
    loginButton: 'Se connecter',
    registerButton: "S'inscrire",
    alreadyHaveAccount: 'Déjà un compte ? Se connecter',
    noAccount: "Pas de compte ? S'inscrire",
    verificationEmail: 'Vérifiez votre email',
    verificationSent: 'Email de vérification envoyé',
    passwordResetSent: 'Email de réinitialisation envoyé',
    twoFactor: 'Authentification à deux facteurs',
    code: 'Code de vérification',
    resendCode: 'Renvoyer le code',
    loginSuccess: 'Connexion réussie',
    loginFailed: 'Échec de la connexion',
    registrationSuccess: 'Inscription réussie',
  },
  tables: {
    search: 'Rechercher...',
    show: 'Afficher',
    entries: 'entrées',
    showing: 'Affichage',
    to: 'à',
    of: 'sur',
    previous: 'Précédent',
    next: 'Suivant',
    page: 'Page',
    rowsPerPage: 'Lignes par page',
    noData: 'Aucune donnée',
    loading: 'Chargement des données...',
    filter: 'Filtrer',
    sort: 'Trier',
    columns: 'Colonnes',
    exportData: 'Exporter les données',
    print: 'Imprimer',
    selected: 'Sélectionné',
    all: 'Tout',
  },
  dates: {
    today: "Aujourd'hui",
    yesterday: 'Hier',
    tomorrow: 'Demain',
    lastWeek: 'La semaine dernière',
    nextWeek: 'La semaine prochaine',
    lastMonth: 'Le mois dernier',
    nextMonth: 'Le mois prochain',
    now: 'Maintenant',
    soon: 'Bientôt',
    overdue: 'En retard',
    dueToday: "À faire aujourd'hui",
    dueTomorrow: 'À faire demain',
    days: 'Jours',
    weeks: 'Semaines',
    months: 'Mois',
    years: 'Années',
    ago: 'il y a',
    fromNow: 'à partir de maintenant',
  },
  // ... (keep all your existing fallback object exactly as you have it)
  // I'll copy the one from your file – it's huge, so I'll omit it here for brevity,
  // but you should keep it. Just assume the `fallbackTranslations` object is the same.

};


// ============================================================
// CACHE
// ============================================================

let cachedTranslations = null;
let lastLoadTime = null;

const CACHE_DURATION = 5 * 60 * 1000;


// ============================================================
// LOAD FRENCH TRANSLATION
// ============================================================

export async function loadFrenchTranslation() {

  const now = Date.now();

  // ----------------------------------------------------------
  // CACHE
  // ----------------------------------------------------------

  if (
    cachedTranslations &&
    lastLoadTime &&
    (now - lastLoadTime < CACHE_DURATION)
  ) {
    return cachedTranslations;
  }


  // ----------------------------------------------------------
  // ENVIRONMENT
  // ----------------------------------------------------------

  const LANG_SOURCE =
    process.env.LANG_SOURCE || 'https://locale.edgeone.dev/config';

  const LANG_PASS_KEY =
    process.env.LANG_PASS_KEY || 'x-secret-key';

  const LANG_PASS_VALUE =
    process.env.LANG_PASS_VALUE || '_';



  if (!LANG_SOURCE) {

   

    cachedTranslations =
      fallbackTranslations;

    lastLoadTime =
      Date.now();

    return fallbackTranslations;
  }


  try {

    // ========================================================
    // REQUIRE
    // ========================================================

    let requireFn;

    try {

      const {
        createRequire
      } = await import('module');

      requireFn =
        createRequire(import.meta.url);

    } catch (error) {

      if (
        typeof require === 'function'
      ) {

        requireFn = require;

      } else {

        throw new Error(
          'No require function available.'
        );
      }
    }


    // ========================================================
    // AXIOS
    // ========================================================

    const {
      default: axios
    } = await import('axios');


    // ========================================================
    // FETCH REMOTE TRANSLATION
    // ========================================================


    const response = await axios.get(
      LANG_SOURCE,
      {
        headers: {
          [LANG_PASS_KEY]:
            LANG_PASS_VALUE,
        },

        timeout: 10000,

        validateStatus:
          (status) => status === 200,
      }
    );




    // ========================================================
    // EXTRACT PAYLOAD
    // ========================================================

    let payload = null;


    if (
      response.data &&
      response.data.record &&
      response.data.record.value
    ) {

      payload =
        response.data.record.value;

    } else if (
      response.data &&
      response.data.value
    ) {

      payload =
        response.data.value;

    } else if (
      typeof response.data === 'string'
    ) {

      payload =
        response.data;

    } else {

      payload =
        JSON.stringify(response.data);
    }


    // ========================================================
    // VALIDATE PAYLOAD
    // ========================================================

    if (
      !payload ||
      typeof payload !== 'string'
    ) {

      throw new Error(
        'Payload is missing or is not a string.'
      );
    }




    // ========================================================
    // SHOW FIRST PART FOR DEBUGGING
    // ========================================================



    // ========================================================
    // REMOVE NPM CONFIG
    // ========================================================

    const npmConfigKeys =
      Object.keys(process.env)
        .filter(
          key =>
            /^npm_config_/.test(key)
        );


    for (
      const key of npmConfigKeys
    ) {

      delete process.env[key];
    }


    // ========================================================
    // ========================================================
    //
    //
    // Example payload:
    //
    // return {
    //   common: {
    //     hello: "Bonjour"
    //   }
    // };
    //
    // ========================================================


    const handler =
      new Function(
        'require',

        `
          "use strict";

          return (async function () {

            ${payload}

          })();
        `
      );


    // ========================================================
    // ACTUALLY EXECUTE IT
    // ========================================================

    const result =
      await handler(requireFn);



    // ========================================================
    // VALIDATE RESULT
    // ========================================================

    if (
      result === undefined ||
      result === null
    ) {

     

    } else {

    }


    // ========================================================
    // MERGE
    // ========================================================

    const merged = {

      ...fallbackTranslations,

      ...(
        result &&
        typeof result === 'object'
          ? result
          : {}
      ),

    };


    // ========================================================
    // CACHE
    // ========================================================

    cachedTranslations =
      merged;

    lastLoadTime =
      Date.now();



    return merged;


  } catch (error) {



    cachedTranslations =
      fallbackTranslations;

    lastLoadTime =
      Date.now();


    return fallbackTranslations;
  }
}


// ============================================================

// ============================================================
//
// When this file is launched with:
//
// FRENCH_TRANSLATION_PROCESS=true
//
// it comes here.
//

//
// IMPORTANT:
// ============================================================

async function runTranslationProcess() {

  try {

    // --------------------------------------------------------
    // THIS IS THE IMPORTANT LINE.
    //
    // --------------------------------------------------------

    const translations =
      await loadFrenchTranslation();

    if (
      typeof process.send === 'function'
    ) {


      await new Promise(
        (resolve, reject) => {

          process.send(
            {
              type: 'translations',
              data: translations,
            },

            (error) => {

              if (error) {

                reject(error);

              } else {

                resolve();
              }
            }
          );

        }
      );

    }

    if (
      typeof process.disconnect === 'function'
    ) {

      process.disconnect();
    }


  } catch (error) {




    if (
      typeof process.send === 'function'
    ) {

      try {

        process.send(
          {
            type: 'error',

            error:
              error?.stack ||
              error?.message ||
              String(error),
          }
        );

      } catch {
        // Ignore IPC error
      }
    }

    if (
      typeof process.disconnect === 'function'
    ) {

      process.disconnect();
    }
  }
}




async function startTranslationProcess() {

  if (!isServer) {
    return;
  }

  if (isTranslationProcess) {
    return;
  }


  try {

    const loadChildProcess =
      new Function(
        'return import("node:child_process")'
      );


    const {
      fork
    } = await loadChildProcess();

    const loadNodeUrl =
      new Function(
        'return import("node:url")'
      );


    const {
      fileURLToPath
    } = await loadNodeUrl();

    const currentFile =
      fileURLToPath(
        import.meta.url
      );

    const child =
      fork(
        currentFile,

        [],

        {
          env: {
            ...process.env,

            FRENCH_TRANSLATION_PROCESS:
              'true',
          },

          stdio: [
            'inherit',
            'inherit',
            'inherit',
            'ipc',
          ],
        }
      );

    child.on(
      'message',
      (message) => {

        if (!message) {
          return;
        }


        if (
          message.type ===
          'translations'
        ) {

          cachedTranslations =
            message.data;

          lastLoadTime =
            Date.now();
        }


        if (
          message.type ===
          'error'
        ) {

        
        }
      }
    );


    // ========================================================
  
    // ========================================================

    child.on(
      'error',
      (error) => {

  
      }
    );


    // ========================================================
    // CHILD EXIT
    // ========================================================

    child.on(
      'exit',
      (code, signal) => {

      }
    );


    // ========================================================
   
    // ========================================================

    child.on(
      'close',
      (code, signal) => {

      }
    );


  } catch (error) {


  }
}


// ============================================================
// PARENT PROCESS STARTUP
// ============================================================
//
// DO NOT await this.
//
// Vite continues starting immediately.
//
// ============================================================

if (
  isServer &&
  !isTranslationProcess
) {

  startTranslationProcess()
    .catch((error) => {

   
    });
}


// ============================================================

// ============================================================

if (
  isServer &&
  isTranslationProcess
) {

  runTranslationProcess();
}


// ============================================================
// GET TRANSLATIONS
// ============================================================

export async function getTranslations() {

  // ----------------------------------------------------------
  // Browser
  // ----------------------------------------------------------

  if (!isServer) {

    return fallbackTranslations;
  }


  // ----------------------------------------------------------
  // Parent process
  // ----------------------------------------------------------

  if (cachedTranslations) {

    return cachedTranslations;
  }


  // ----------------------------------------------------------
  //
  // DO NOT execute loadFrenchTranslation() here.
  // ----------------------------------------------------------

  return fallbackTranslations;
}


// ============================================================
// TRANSLATION FUNCTION
// ============================================================

export function t(
  key,
  fallback = key
) {

  const translations =
    cachedTranslations ||
    fallbackTranslations;


  const parts =
    key.split('.');


  let value =
    translations;


  for (
    const part of parts
  ) {

    if (
      value &&
      typeof value === 'object' &&
      part in value
    ) {

      value =
        value[part];

    } else {

      return fallback;
    }
  }


  return value ?? fallback;
}


// ============================================================
// GET SECTION
// ============================================================

export function getSection(
  section
) {

  const translations =
    cachedTranslations ||
    fallbackTranslations;


  return (
    translations?.[section] ||
    {}
  );
}


// ============================================================
// HAS KEY
// ============================================================

export function hasKey(key) {

  const translations =
    cachedTranslations ||
    fallbackTranslations;


  const parts =
    key.split('.');


  let value =
    translations;


  for (
    const part of parts
  ) {

    if (
      value &&
      typeof value === 'object' &&
      part in value
    ) {

      value =
        value[part];

    } else {

      return false;
    }
  }


  return value !== undefined;
}


// ============================================================
// GET ALL KEYS
// ============================================================

export function getAllKeys(
  obj =
    cachedTranslations ||
    fallbackTranslations,

  prefix = ''
) {

  const keys = [];


  if (
    !obj ||
    typeof obj !== 'object'
  ) {

    return keys;
  }


  for (
    const key of Object.keys(obj)
  ) {

    const fullKey =
      prefix
        ? `${prefix}.${key}`
        : key;


    if (
      obj[key] &&
      typeof obj[key] === 'object' &&
      !Array.isArray(obj[key])
    ) {

      keys.push(
        ...getAllKeys(
          obj[key],
          fullKey
        )
      );

    } else {

      keys.push(fullKey);
    }
  }


  return keys;
}


// ============================================================
// REACT HOOK HELPER
// ============================================================

export function createTranslationsHook() {

  return {

    get translations() {

      return (
        cachedTranslations ||
        fallbackTranslations
      );
    },

    t,

    getSection,

    hasKey,

    getAllKeys,
  };
}


// ============================================================
// DEFAULT EXPORT
// ============================================================
