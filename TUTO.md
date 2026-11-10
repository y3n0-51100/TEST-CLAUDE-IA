# Tutoriel : publier Shelfie de A à Z (pour débutant)

Durée réelle : **3 à 5 semaines**, mais surtout à cause des délais (vérifications, tests, revue des stores). Le travail à toi représente quelques heures au total.
Coût : **25 $** (Google, une fois) + **99 $/an** (Apple). Tout le reste est gratuit.

> Besoin d'aide à une étape ? Copie-colle-moi le message d'erreur ou décris ce que tu vois à l'écran, je te dis quoi faire.

---

## Étape 1 — Rendre le jeu jouable tout de suite sur internet (10 min, gratuit)

Le jeu est une page web : tu peux le mettre en ligne aujourd'hui, avant même les stores. Tu auras un lien à mettre dans ta bio TikTok/Instagram.

1. Va sur **github.com**, connecte-toi, ouvre ton dépôt **TEST-CLAUDE-IA**.
2. Clique **Settings** (onglet en haut à droite) › **Pages** (menu de gauche).
3. Source : **Deploy from a branch**. Branche : **claude/trusting-einstein-lca36v**. Dossier : **/docs**. Clique **Save**.
4. Attends 1 à 2 minutes, puis recharge la page : un lien apparaît en haut.
5. Ton jeu est à : `https://y3n0-51100.github.io/test-claude-ia/play/`
6. Ta politique de confidentialité est à : `https://y3n0-51100.github.io/test-claude-ia/privacy.html`

Sur le web, les pubs sont simulées (pas de revenus) : c'est une version démo.

## Étape 2 — Compléter la politique de confidentialité (5 min)

1. Sur GitHub, ouvre `docs/privacy.html`, clique sur le **crayon** (Edit).
2. Cherche les 4 passages entre crochets `[...]` et remplace-les par ton nom (ou celui de ta société) et ton e-mail de contact. Fais-le dans la partie française **et** anglaise.
3. Clique **Commit changes**.

## Étape 3 — Créer l'adresse Gmail dédiée (5 min)

1. Crée une adresse du type `shelfie.game.contact@gmail.com`.
2. Utilise-la pour **tous** les comptes suivants (AdMob, Google Play, Apple). Ne la mélange pas avec ton adresse personnelle.

## Étape 4 — Créer le compte AdMob (gagner de l'argent avec les pubs) (20 min)

1. Va sur **admob.google.com**, connecte-toi avec la nouvelle adresse Gmail.
2. Accepte les conditions, choisis ton pays et la devise (euro).
3. **Applications › Ajouter une application**. Fais-le **deux fois** : une pour Android, une pour iOS. Réponds « Non » à « L'application est-elle publiée ? » (pas encore). Nom : Shelfie.
4. Note les deux **ID d'application** (forme `ca-app-pub-1234567890123456~1234567890`).
5. Dans chaque application, **Blocs d'annonces › Ajouter un bloc d'annonces** :
   - un bloc **Récompensée** (nom : `recompense`),
   - un bloc **Interstitielle** (nom : `interstitiel`).
6. Note les **4 ID de blocs** (forme `ca-app-pub-1234567890123456/1234567890`).
7. **Paiements** : renseigne ton adresse et ton identité fiscale. Google envoie un code postal PIN par courrier (quelques semaines) pour activer les paiements. Le versement a lieu à partir d'un seuil (environ 70 €, à vérifier dans ton compte).
8. **Envoie-moi les 2 ID d'application et les 4 ID de blocs** : je les mets dans le code et je désactive le mode test. Ne les transmets à personne d'autre.

## Étape 5 — Installer les outils sur ton Mac (45 min)

À faire une seule fois. Ouvre l'application **Terminal** (Cmd + Espace, tape « Terminal »).

1. **Xcode** : App Store › cherche « Xcode » › Installer (gros téléchargement, plusieurs Go). Ouvre-le une fois et accepte la licence.
2. **Outils en ligne de commande** : dans le Terminal :
   ```bash
   xcode-select --install
   ```
3. **Node.js** : télécharge la version **LTS** sur nodejs.org et installe-la.
4. **CocoaPods** (nécessaire pour iOS) :
   ```bash
   sudo gem install cocoapods
   ```
5. **Android Studio** : télécharge-le sur developer.android.com/studio, installe-le, lance-le et laisse-le installer ses composants (accepte tout par défaut).
6. **Git** : tape `git --version` dans le Terminal. Si ça propose d'installer, accepte.

## Étape 6 — Récupérer le projet sur ton Mac (10 min)

```bash
cd ~/Documents
git clone https://github.com/y3n0-51100/test-claude-ia.git shelfie
cd shelfie
git checkout claude/trusting-einstein-lca36v
npm install
npx cap sync
```

Si GitHub te demande de te connecter, utilise ton compte GitHub.

---

## Étape 7 — Android / Google Play

### 7.1 Créer le compte développeur (30 min + vérification de 1 à 3 jours)
1. Va sur **play.google.com/console**, connecte-toi avec l'adresse Gmail dédiée.
2. Choisis **Compte personnel**, paie les **25 $**.
3. Vérifie ton identité (pièce d'identité) et ton téléphone quand c'est demandé. Prévois quelques jours.

### 7.2 Mettre les vrais ID AdMob
Attends que je les aie branchés (étape 4.8), puis refais `git pull` dans le Terminal.

### 7.3 Fabriquer le fichier à envoyer (AAB)
1. Dans le Terminal : `npx cap open android` (Android Studio s'ouvre, laisse-le charger).
2. Menu **Build › Generate Signed App Bundle / APK…** › **Android App Bundle** › Next.
3. **Key store path › Create new…** : choisis un dossier **en dehors du projet** (par exemple Documents), nom `shelfie.jks`. Choisis un mot de passe, remplis les champs, OK.
4. **Sauvegarde ce fichier et le mot de passe à 2 endroits** (clé USB, gestionnaire de mots de passe). Si tu les perds, tu ne pourras plus mettre le jeu à jour.
5. Next › choisis **release** › Create. Le fichier `app-release.aab` est créé (Android Studio affiche un lien « locate »).

### 7.4 Créer l'app dans la console Google Play
1. **Créer une application** : nom « Shelfie : Puzzle de tri », langue français, **Jeu**, **Gratuite**.
2. Dans le menu **Tableau de bord**, suis les tâches proposées :
   - **Politique de confidentialité** : colle le lien de l'étape 1.
   - **Application avec des annonces** : Oui.
   - **Accès à l'application** : accessible sans connexion.
   - **Classification du contenu** : remplis le questionnaire (pas de violence, etc.).
   - **Public cible** : **13 ans et plus** (ne coche pas « enfants »).
   - **Sécurité des données** : réponses prêtes dans `store/listing.md`.
3. **Fiche Play Store principale** : copie les textes de `store/listing.md`, importe l'icône (`assets/icon-only.png`), la bannière (`store/feature-graphic-1024x500.png`) et les captures (`store/screenshots/android/`).

### 7.5 Test fermé obligatoire (14 jours pour un compte personnel récent)
1. **Tests › Test fermé › Créer une version** : envoie ton fichier `.aab`.
2. **Testeurs** : crée une liste avec **au moins 12 adresses Gmail** (amis, famille, abonnés), puis partage-leur le lien d'inscription au test. Ils doivent accepter **et** installer l'app.
3. Attends **14 jours** avec ces testeurs actifs. (Règle à revérifier dans la console : Google l'a déjà modifiée.)
4. Ensuite : **Production › Créer une version**, soumets. La revue prend de quelques heures à quelques jours.

---

## Étape 8 — iOS / App Store

### 8.1 Compte Apple Developer (30 min + 1 à 3 jours de vérification)
1. Va sur **developer.apple.com/programs**, clique **Enroll**.
2. Connecte-toi avec ton identifiant Apple, choisis **Individual** (particulier), paie **99 $/an**.

### 8.2 Préparer l'app dans Xcode
1. `npx cap open ios` (Xcode s'ouvre).
2. Clique sur **App** dans la colonne de gauche › onglet **Signing & Capabilities**.
3. Coche **Automatically manage signing**, choisis ton **Team** (ton compte développeur).
4. Si `com.shelfie.game` est déjà pris, modifie **Bundle Identifier** (par exemple `com.tonnom.shelfie`) et préviens-moi pour que je modifie aussi les fichiers Android.

### 8.3 Créer la fiche dans App Store Connect
1. Va sur **appstoreconnect.apple.com** › **Apps › + › Nouvelle app**.
2. Plateformes : iOS. Nom : Shelfie. Langue : français. Bundle ID : celui de Xcode. SKU : `shelfie1`.
3. Remplis la fiche avec `store/listing.md`. Captures : `store/screenshots/ios/`.
4. **Confidentialité de l'app** : indique que des données servent à la publicité (réponses dans `store/listing.md`). URL de la politique : celle de l'étape 1.
5. **Classification d'âge** : réponds au questionnaire (rien de sensible).

### 8.4 Envoyer l'app
1. Dans Xcode, en haut, choisis l'appareil **Any iOS Device (arm64)**.
2. Menu **Product › Archive**. Quand c'est fini : **Distribute App › App Store Connect › Upload**, suis les écrans.
3. Dans App Store Connect, attends quelques minutes que la version apparaisse, sélectionne-la dans ta fiche, puis **Ajouter pour vérification**.
4. La revue Apple prend en général 1 à 2 jours. Si elle est refusée, copie-moi le message : on corrige.

---

## Étape 9 — Le jour de la sortie

1. Quand les deux stores affichent ton jeu, copie les liens.
2. Mets-les dans la bio de **@shelfie.game** (Instagram et TikTok).
3. Poste le clip « C'est dispo » et réponds à tous les commentaires.
4. Après 1 semaine, regarde dans AdMob les premiers revenus, et dans les stores le nombre de téléchargements.

## Problèmes fréquents
- **`command not found: npm`** : Node n'est pas installé, refais l'étape 5.3 puis ferme et rouvre le Terminal.
- **Erreur CocoaPods dans Xcode** : dans le Terminal, `cd ios/App && pod install`.
- **Le nom de l'app est déjà pris sur un store** : choisis « Shelfie : Puzzle de tri » (nom plus long) ou ajoute un mot.
- **Pas de pub qui s'affiche juste après la sortie** : c'est normal, AdMob peut mettre jusqu'à 24-48 h à diffuser de vraies annonces sur une nouvelle app.
