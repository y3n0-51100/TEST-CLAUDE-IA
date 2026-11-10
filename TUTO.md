# Publier Shelfie sur Google Play — tutoriel complet pour un particulier

Objectif : que le jeu soit téléchargeable sur Google Play et gagne de l'argent grâce aux pubs Google (AdMob).
Les informations de ce tutoriel ont été vérifiées en novembre 2026. Les écrans de Google changent souvent : si un bouton a un nom légèrement différent, cherche le même mot-clé. Si tu bloques, décris-moi ce que tu vois et je te dis quoi faire.

---

## 0. Vue d'ensemble

| Phase | Ce que tu fais | Durée réelle |
|---|---|---|
| A | Préparer les comptes gratuits (Gmail, AdMob) et la politique de confidentialité | 1 jour |
| B | Créer ton compte développeur Google Play (25 $) | 1 à 4 jours (vérification d'identité) |
| C | Fabriquer le fichier de l'app (AAB) | 1 heure |
| D | Créer l'app et remplir les formulaires dans la console | 2 à 3 heures |
| E | **Test fermé : 12 testeurs minimum pendant 14 jours d'affilée** | 14 jours + recrutement |
| F | Demander l'accès à la production, puis publier | 1 à 7 jours de revue |
| G | Brancher les vraies pubs et être payé | 3 à 6 semaines pour le premier virement |

**Délai total réaliste : 5 à 8 semaines**, dont 14 jours incompressibles de test.

**Coûts :** 25 $ une seule fois (Google Play). Tout le reste est gratuit.

**Règle qui change tout :** sur un compte **personnel** créé après novembre 2023, Google impose un **test fermé avec au moins 12 testeurs, qui restent inscrits en continu pendant 14 jours**, avant d'autoriser la publication. Tu as parlé de 14 joueurs : vise plutôt **15 à 20 personnes**, car certaines abandonnent ou n'acceptent jamais l'invitation. Cette règle dépend de Google, vérifie-la sur [la page officielle](https://support.google.com/googleplay/android-developer/answer/14151465) au moment de lancer.

**Attention aux revenus :** AdMob te verse l'argent seulement quand ton solde atteint **100 $** (le seuil est indiqué dans ton compte, vérifie-le), versement vers le 21 du mois. Avec peu de joueurs, ça peut prendre du temps. Les revenus dépendent entièrement du nombre de joueurs actifs : c'est le rôle des clips TikTok.

**Impôts :** les revenus publicitaires sont à déclarer. En France, une activité régulière relève souvent du statut de micro-entrepreneur : renseigne-toi auprès des impôts (impots.gouv.fr) ou de l'URSSAF avant le premier virement. Je ne suis pas conseiller fiscal.

---

## Phase A — Préparer (1 jour, gratuit)

### A1. Créer une adresse Gmail dédiée
1. Va sur gmail.com › **Créer un compte** › **Pour un usage personnel**.
2. Choisis une adresse du type `shelfie.game.contact@gmail.com`.
3. Utilise-la pour **tous** les comptes suivants. Note le mot de passe dans un gestionnaire de mots de passe ou sur papier.

### A2. Mettre en ligne la politique de confidentialité (obligatoire)
Google exige une adresse web publique pour la politique de confidentialité.

1. Va sur **github.com**, connecte-toi, ouvre ton dépôt `TEST-CLAUDE-IA`.
2. Ouvre le dossier `docs`, clique sur `privacy.html`, puis sur l'icône **crayon** (Edit).
3. Remplace les 4 passages entre crochets `[ ... ]` par :
   - ton **nom et prénom** (tu es un particulier, c'est toi l'éditeur) ;
   - ton **adresse Gmail dédiée**.
   Fais-le dans la partie française **et** dans la partie anglaise.
4. Clique **Commit changes** (bouton vert en haut à droite), puis confirme.
5. Va dans **Settings** (onglet du dépôt) › **Pages** (menu de gauche).
6. **Source** : *Deploy from a branch*. **Branch** : `claude/trusting-einstein-lca36v`, dossier **/docs**. Clique **Save**.
7. Attends 2 minutes, recharge la page. Un lien apparaît. Ta politique est à :
   `https://y3n0-51100.github.io/test-claude-ia/privacy.html`
8. **Ouvre ce lien dans ton navigateur** pour vérifier que la page s'affiche, sans texte jaune. Garde ce lien : tu en auras besoin.

Bonus : ton jeu est aussi jouable sur `https://y3n0-51100.github.io/test-claude-ia/play/`. C'est un lien à mettre dans tes bios Instagram et TikTok.

### A3. Créer ton compte AdMob
1. Va sur **admob.google.com** et connecte-toi avec la Gmail dédiée.
2. Choisis ton pays (France) et le fuseau horaire, accepte les conditions.
3. Menu **Applications** › **Ajouter une application**.
4. « Votre application est-elle publiée sur Google Play ou l'App Store ? » → **Non**.
5. Plateforme : **Android**. Nom : **Shelfie**. Clique sur **Ajouter**.
6. **Note l'ID de l'application** (il ressemble à `ca-app-pub-1234567890123456~1234567890`, avec un tilde `~`).
7. Dans l'application créée : **Blocs d'annonces** › **Ajouter un bloc d'annonces**.
   - Choisis **Avec récompense** (vidéo récompensée). Nom : `recompense`. Valeur de la récompense : laisse par défaut. Crée le bloc.
   - Recommence avec **Interstitielle**. Nom : `interstitiel`.
8. **Note les 2 ID de blocs** (forme `ca-app-pub-1234567890123456/1234567890`, avec une barre `/`).
9. **Envoie-moi** : l'ID d'application + les 2 ID de blocs. Je les mets dans le code. Ils ne sont pas secrets au sens d'un mot de passe, mais ne les publie pas inutilement.

> **Important :** pendant le test fermé, on garde les pubs de **test** de Google (aucun revenu). On passera aux vraies pubs juste avant la publication (phase F). Raison : si un testeur clique sur de vraies pubs, Google peut y voir du trafic invalide et suspendre ton compte AdMob. **Ne clique jamais toi-même sur les vraies pubs de ton jeu.**

---

## Phase B — Compte développeur Google Play (1 à 4 jours)

1. Prépare : ta pièce d'identité, ta carte bancaire, ton téléphone Android (idéal) et ta Gmail dédiée.
2. Va sur **play.google.com/console/signup** (connecte-toi avec la Gmail dédiée).
3. Type de compte : **Pour vous-même** (personnel). N'essaie pas le compte « organisation » : il demande une entreprise et un numéro D-U-N-S.
4. Remplis : nom légal (celui de ta pièce d'identité), adresse, téléphone. Le nom du développeur affiché publiquement peut être différent, par exemple « Shelfie Games ».
5. Paye les **25 $** (une seule fois).
6. Google demande la **vérification d'identité** (photo de la pièce d'identité) et la **vérification du téléphone** : suis les écrans.
7. Si Google te demande de **vérifier ton appareil Android avec l'application Play Console** (c'est le cas pour les nouveaux comptes personnels), installe l'app « Google Play Console » sur un téléphone Android et suis les instructions.
8. Attends l'e-mail de validation (de quelques heures à quelques jours). **Tu ne peux pas continuer tant que le compte n'est pas validé.**

---

## Phase C — Fabriquer le fichier de l'app (AAB) — 1 heure

Tu peux faire la phase C pendant que Google valide ton compte (phase B).

### C1. Installer les outils (une seule fois)
1. **Node.js** : va sur nodejs.org, télécharge la version **LTS** et installe-la.
2. **Git** : ouvre l'application **Terminal** (Cmd + Espace, tape « Terminal »), tape `git --version`. Si le Mac propose d'installer les outils, accepte.
3. **Android Studio** : developer.android.com/studio › télécharge, installe, lance-le. Au premier lancement, laisse-le installer tout ce qu'il propose (SDK, émulateur), c'est long.

### C2. Récupérer le projet
Dans le Terminal, copie-colle ces commandes **une par une** :

```bash
cd ~/Documents
git clone https://github.com/y3n0-51100/test-claude-ia.git shelfie
cd shelfie
git checkout claude/trusting-einstein-lca36v
npm install
npx cap sync android
```

Si GitHub demande une connexion, utilise ton compte GitHub (un « token » peut être demandé à la place du mot de passe : GitHub te guide pour le créer).

### C3. Ouvrir dans Android Studio et tester sur un émulateur
```bash
npx cap open android
```
1. Attends que le bas de l'écran finisse de charger (« Gradle sync »). Ça peut prendre 10 minutes la première fois.
2. En haut, choisis un appareil virtuel (**Device Manager** › crée un « Pixel » si besoin), puis clique sur le **triangle vert ▶**.
3. Vérifie que le jeu s'ouvre, que tu peux jouer, choisir une ambiance et que les pubs de test s'affichent (un bandeau « Test Ad »).

### C4. Fabriquer l'AAB signé
1. Menu **Build** › **Generate Signed App Bundle / APK…**
2. Choisis **Android App Bundle** › **Next**.
3. **Key store path** › **Create new…** :
   - Choisis un dossier **en dehors du projet** (par exemple `Documents/cles-shelfie`), nom du fichier : `shelfie.jks`.
   - Choisis un **mot de passe** (même pour la clé), un alias `shelfie`, validité 25 ans, ton nom.
4. **Sauvegarde le fichier `shelfie.jks` et le mot de passe à deux endroits différents** (clé USB + e-mail à toi-même, par exemple). C'est ta clé d'envoi : si tu la perds, la procédure de récupération est lourde.
5. **Next** › choisis **release** › **Create**.
6. Quand c'est fini, une bulle propose **locate** : clique pour retrouver `app-release.aab`. C'est le fichier à envoyer.

> À chaque mise à jour future, il faudra augmenter le numéro `versionCode` dans `android/app/build.gradle` (actuellement `1`). Dis-moi « prépare la version 2 » et je le fais.

---

## Phase D — Créer l'app dans la Play Console (2 à 3 heures)

Compte développeur validé ? Va sur **play.google.com/console**.

### D1. Créer l'app
1. **Créer une application**.
2. Nom : **Shelfie : Puzzle de tri**. Langue par défaut : **Français**.
3. Application ou jeu : **Jeu**. Gratuite ou payante : **Gratuite**.
4. Coche les deux déclarations (règles du programme, lois sur l'exportation américaines) puis **Créer l'application**.

### D2. Le tableau de bord : les tâches à remplir
Dans le menu de gauche : **Tableau de bord** (ou « Configurer votre application »). Remplis chaque tâche :

1. **Politique de confidentialité** : colle le lien de l'étape A2.
2. **Accès à l'application** : « Toutes les fonctionnalités sont accessibles sans identifiants ».
3. **Annonces** : « **Oui**, mon application contient des annonces ».
4. **Classification du contenu** : lance le questionnaire (adresse e-mail, catégorie **Jeu**). Réponds **Non** à tout (violence, sexe, jeux d'argent, etc.). Les publicités ne sont pas du contenu à signaler ici.
5. **Public cible et contenu** : coche **13-15, 16-17, 18 et plus**. **Ne coche surtout pas « moins de 13 ans »** (cela imposerait des règles très strictes sur les pubs). Réponds « Non » à « L'application attire-t-elle les enfants ? ».
6. **Applications d'actualités** : Non.
7. **Applications de suivi des contacts COVID-19** : Non.
8. **Sécurité des données** :
   - Collecte-t-elle ou partage-t-elle des données ? **Oui**.
   - Types de données : coche **Identifiants d'appareil ou autres** (ID publicitaire) et **Informations sur l'application et ses performances** si proposé ; localisation approximative n'est pas nécessaire sauf si la liste AdMob l'indique.
   - Pour chaque donnée : **Partagée** avec des tiers : **Oui** ; finalité : **Publicité ou marketing** ; collectée : Oui ; facultatif : non.
   - Chiffrement en transit : **Oui**. Possibilité de demander la suppression des données : **Non** (aucune donnée de compte).
9. **Identifiant publicitaire** : « Mon application utilise un identifiant publicitaire » → **Oui**, usage **Publicité**.
10. **Applications financières, santé, gouvernement** : réponds Non partout.

### D3. La fiche du Play Store
Menu **Présence sur le Play Store › Fiche Play Store principale** :
1. **Titre**, **description courte**, **description complète** : copie depuis `store/listing.md` (partie « Français »).
2. **Icône de l'application** : `assets/icon-only.png` (512×512 minimum, le 1024 est accepté, sinon redimensionne-le dans n'importe quel outil).
3. **Image de présentation (bannière)** : `store/feature-graphic-1024x500.png`.
4. **Captures d'écran du téléphone** : toutes les images de `store/screenshots/android/` (minimum 2, ici 5).
5. **Catégorie** : Puzzle. **Coordonnées** : ta Gmail dédiée (et le site si tu veux : `https://y3n0-51100.github.io/test-claude-ia/play/`).
6. **Enregistre**.

### D4. Autres rubriques à vérifier
- **Pays/régions** : on les choisira au moment de chaque version.
- **Prix** : Gratuit (ne peut plus être changé en payant ensuite).

---

## Phase E — Le test fermé : 12 testeurs, 14 jours

C'est l'étape la plus longue. Prépare-la bien.

### E1. Recruter les testeurs (fais-le AVANT d'envoyer la version)
Tu as besoin d'au moins **12 personnes** qui respectent **toutes** ces conditions :
- téléphone **Android** (pas iPhone) avec le **Play Store** ;
- une **adresse Gmail** / compte Google (c'est cette adresse qu'il faut te donner) ;
- elles acceptent l'invitation, installent le jeu, et **ne se désinscrivent pas pendant 14 jours**.

**Vise 15 à 20** pour avoir de la marge. Où les trouver :
- famille et amis qui ont un téléphone Android ;
- collègues, relations ;
- ta communauté TikTok/Instagram (poste une story « cherche testeurs Android pour mon jeu Shelfie, DM-moi ») ;
- groupes d'entraide de développeurs (par exemple le subreddit r/AndroidClosedTesting, ou des groupes Facebook de « testeurs d'applications ») : tu peux t'inscrire à leurs tests en échange. Reste prudent : ne paie pas d'inconnus et ne partage jamais tes identifiants.

Note leurs **adresses Gmail** dans un tableau.

**Message à envoyer à chaque testeur (à copier) :**
> Salut ! Je lance mon premier jeu mobile, Shelfie (puzzle de tri). Peux-tu m'aider à le tester sur ton téléphone Android ? Il faut juste : 1) accepter l'invitation que je t'envoie (lien), 2) installer le jeu depuis le Play Store, 3) y jouer un peu de temps en temps pendant 14 jours, 4) ne pas le désinstaller ni te désinscrire du test pendant cette période. Ça me sert à débloquer la publication. Merci ! Peux-tu m'envoyer ton adresse Gmail ? Surtout, ne clique pas sur les pubs.

### E2. Créer le test fermé
1. Console › menu **Tests et publication** (ou « Tests ») › **Tests fermés**.
2. **Créer un test** (ou « Créer une version ») sur la piste proposée (souvent « Alpha »). Nom au choix.
3. **Testeurs** : onglet **Testeurs** › **Créer une liste d'adresses e-mail** › nomme-la « Shelfie testeurs » › colle les adresses Gmail (séparées par des virgules ou une par ligne) › enregistre. Coche la liste.
4. **Pays/régions** : ajoute **France** (et d'autres si tes testeurs sont à l'étranger).
5. **Retours des testeurs** : indique ton e-mail (ou un lien) pour recevoir les remarques.
6. Retourne dans **Versions** › **Créer une version** :
   - Si on te propose « Signature d'application Play » : **accepte** (Google gère la clé finale, ta clé `shelfie.jks` sert d'envoi).
   - Importe `app-release.aab`.
   - Nom de la version et notes : « Première version de test ».
7. **Enregistrer** › **Vérifier la version** › **Lancer le déploiement du test fermé**.
8. Un message indique que la version est en cours d'examen. La première validation peut prendre de **quelques heures à quelques jours**. Tu reçois un e-mail à la fin.

### E3. Envoyer le lien d'inscription aux testeurs
1. Une fois la version disponible : onglet **Testeurs** du test fermé › copie le **lien d'inscription** (« Comment les testeurs rejoignent-ils votre test ? »).
2. Envoie ce lien à chaque testeur, avec la consigne :
   - ouvrir le lien **depuis leur téléphone Android**, connecté avec **l'adresse Gmail** donnée ;
   - cliquer sur **Devenir testeur** ;
   - puis sur **Télécharger l'application sur Google Play** et l'installer.
3. Dans l'onglet Testeurs, tu vois le nombre de personnes qui ont rejoint. **La condition est : 12 inscrits en continu.** Relance ceux qui n'ont pas accepté.

### E4. Les 14 jours
- Le compteur démarre quand tu as **au moins 12 testeurs inscrits**. Dans la page **Tableau de bord**, la section « Accès à la production » affiche la progression.
- Demande à tes testeurs d'**ouvrir l'application** de temps en temps (Google n'impose pas de durée de jeu, mais une vraie utilisation est préférable et utile pour tes retours).
- Si quelqu'un se désinscrit et que tu tombes **sous 12**, remplace-le **vite** : selon les sources, le compteur peut se bloquer ou repartir. Plus tu as de marge (15-20), moins ce risque existe.
- Ne change pas la liste sans besoin.
- Si tu corriges un bug, tu peux envoyer une nouvelle version dans le test (nouveau `versionCode`) : les testeurs la reçoivent par mise à jour, le compteur n'est normalement pas remis à zéro.
- Pendant ce temps, poste tes clips TikTok : c'est le meilleur moment pour construire la communauté qui téléchargera le jeu au lancement.

### E5. Optionnel : tester d'abord toi-même
Si tu as un téléphone Android, crée aussi un **test interne** (menu Tests › Tests internes) avec ton adresse seulement : la version est disponible en quelques minutes, sans les 14 jours. C'est utile pour vérifier que l'installation depuis le Play Store fonctionne, avant de solliciter des testeurs.

---

## Phase F — Demander la production et publier

### F1. Postuler à l'accès à la production
1. Au bout de 14 jours avec 12 testeurs, sur le **Tableau de bord** apparaît un bouton **Demander l'accès à la production** (ou « Postuler pour obtenir un accès à la production »).
2. Google te pose un **questionnaire** sur ton test. Réponds honnêtement et concrètement :
   - comment tu as recruté les testeurs (famille, amis, réseaux sociaux) ;
   - ce que les testeurs t'ont dit ou ce que tu as corrigé ;
   - pourquoi l'app est prête (elle fonctionne, la politique est en ligne, etc.).
3. Envoie. La réponse de Google prend en général **moins d'une semaine**. Tu reçois un e-mail.

### F2. Brancher les vraies pubs (juste avant la version finale)
Quand l'accès à la production est accordé :
1. **Dis-moi « passe en production »**. Je remplace les IDs de test par tes vrais IDs AdMob dans le code (`www/ads.js`, `AndroidManifest.xml`), je mets `IS_TESTING` à `false` et j'augmente le `versionCode`.
2. Sur ton Mac : `git pull`, `npm install`, `npx cap sync android`, `npx cap open android`, puis refais l'étape **C4** (fabriquer l'AAB, **avec la même clé `shelfie.jks`**).
3. Lance l'app sur l'émulateur : elle doit fonctionner. Les pubs peuvent ne pas s'afficher avant la publication (normal pour une nouvelle app).

### F3. Publier en production
1. Console › **Tests et publication › Production** › **Créer une version**.
2. Importe le **nouvel AAB** (celui avec les vraies pubs).
3. Notes de version : « Première version de Shelfie ».
4. **Pays/régions** : sélectionne ceux où tu veux être disponible (par exemple tous, ou France + pays francophones pour commencer).
5. **Enregistrer** › **Vérifier** › **Lancer le déploiement en production**.
6. Google vérifie l'app : **quelques heures à environ une semaine** pour une première publication. Tu reçois un e-mail « Votre application est publiée ».
7. **Rends-toi sur le lien Play Store de ton app** (Console › Présence sur le Play Store › ... › « Afficher sur Google Play ») pour voir ta fiche. Copie ce lien.

### F4. Si Google refuse l'app
Tu reçois un e-mail avec la raison précise. Les causes fréquentes : politique de confidentialité inaccessible, réponses incohérentes dans « Sécurité des données », ou pubs non déclarées. **Copie-moi le message** et on corrige, puis tu renvoies une version.

---

## Phase G — Gagner de l'argent

### G1. Lier l'app publiée à AdMob
1. AdMob › **Applications** › **Shelfie** › **Paramètres de l'application** › **Associer à l'application du store** (ou « Link app »).
2. Cherche **Shelfie : Puzzle de tri** et valide. Sans ça, les pubs diffusent peu ou mal.

### G2. Vérification de l'identité et de l'adresse (obligatoire pour être payé)
1. AdMob › **Paiements**.
2. **Vérification d'identité** : envoie ta pièce d'identité si demandé (avant le code postal).
3. Renseigne ton **adresse** exacte et ton **nom** (qui doivent correspondre à ton identité).
4. Quand tes gains atteignent **environ 10 $**, Google envoie un **code PIN à 6 chiffres par courrier postal** (de 2 à 3 semaines). Entre-le dans AdMob › Paiements › **Saisir le code PIN**. **Tu as 4 mois** pour le saisir et **3 erreurs** font perdre la vérification : recopie-le avec soin.
5. **Informations fiscales** : remplis le formulaire demandé (pays de résidence fiscale, numéro fiscal si demandé).
6. **Mode de paiement** : ajoute ton IBAN (virement bancaire).

### G3. Le premier paiement
- Dès que ton solde **dépasse le seuil de paiement (100 $ selon l'aide AdMob, à vérifier dans ton compte)** et que tout est vérifié, AdMob verse l'argent **vers le 21 du mois suivant**.
- Si tu n'atteins pas le seuil, l'argent est reporté au mois d'après.

### G4. Règles à ne jamais enfreindre
- Ne clique **jamais** sur les pubs de ton jeu, et ne demande à personne de le faire. Cela peut entraîner la suppression de ton compte AdMob et du versement.
- Ne dis pas aux joueurs de « cliquer sur les pubs ».
- Garde la politique de confidentialité en ligne à la même adresse.

### G5. Les premiers jours après la sortie
1. Poste le clip « C'est dispo », avec le lien du Play Store (ajoute-le dans la bio TikTok/Instagram).
2. Réponds à tous les commentaires.
3. Chaque jour, regarde :
   - **Play Console › Statistiques** : installations, désinstallations, avis ;
   - **AdMob › Accueil** : revenus estimés (les chiffres du jour sont provisoires).
4. Corrige les bugs signalés dans les avis, publie une mise à jour (`versionCode` +1).

---

## Checklist finale

- [ ] Gmail dédiée créée
- [ ] Politique de confidentialité en ligne, sans texte jaune
- [ ] Compte AdMob + app Android + 2 blocs d'annonces, IDs transmis
- [ ] Compte développeur Google Play validé (25 $)
- [ ] AAB signé fabriqué, clé `shelfie.jks` sauvegardée en 2 exemplaires
- [ ] App créée, tous les formulaires du tableau de bord remplis
- [ ] Fiche du Play Store remplie (textes, icône, bannière, captures)
- [ ] 15 à 20 testeurs recrutés, liste enregistrée
- [ ] Test fermé lancé, 12 testeurs inscrits en continu pendant 14 jours
- [ ] Accès à la production demandé et accordé
- [ ] Vraies pubs branchées, nouvel AAB envoyé en production
- [ ] App publiée, liens dans les bios
- [ ] App liée dans AdMob, identité + adresse vérifiées, PIN saisi, IBAN ajouté

## Problèmes fréquents
- **`command not found: npm`** : Node n'est pas installé ou le Terminal n'a pas été relancé. Refais C1, ferme et rouvre le Terminal.
- **Le nom du paquet `com.shelfie.game` est déjà pris** : dis-le-moi, je le change partout (il faut le faire avant la première publication).
- **Android Studio demande de mettre à jour Gradle** : accepte les mises à jour proposées, relance le « Gradle sync ».
- **Le compteur de 14 jours ne démarre pas** : vérifie qu'il y a au moins 12 testeurs avec le statut « Inscrit » et non « Invité ».
- **Pas de pub dans l'app juste après la sortie** : normal, AdMob peut mettre 24 à 48 h avant de diffuser des annonces réelles sur une nouvelle app.
