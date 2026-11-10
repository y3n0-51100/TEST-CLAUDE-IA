# Publier Shelfie — ce qui reste à faire par toi

Tout le reste est prêt dans le dépôt (icônes, écrans de lancement, captures, textes, projets Android et iOS).

## 1. Avant tout
1. Compléter les deux champs jaunes de `docs/privacy.html` (nom de l'éditeur, e-mail) et activer GitHub Pages (Settings › Pages › dossier `/docs`).
2. Créer le compte **AdMob**, enregistrer l'app Android et l'app iOS, créer 2 blocs d'annonces par plateforme (récompensée, interstitiel).
3. Remplacer les IDs de test dans `www/ads.js`, `android/app/src/main/AndroidManifest.xml`, `ios/App/App/Info.plist`, puis mettre `IS_TESTING = false`.

## 2. Android (Google Play)
1. Compte développeur Google Play (25 $, une fois).
2. Créer la clé de signature : `keytool -genkey -v -keystore shelfie.jks -alias shelfie -keyalg RSA -keysize 2048 -validity 10000` — **sauvegarde le fichier et le mot de passe, ne les mets jamais dans Git**.
3. `npm install && npx cap sync android && npx cap open android` › Build › Generate Signed Bundle (AAB).
4. Console Play : créer l'app, remplir la fiche avec `store/listing.md`, les questionnaires, importer l'AAB en **test fermé**.
5. Compte personnel récent : test fermé avec 12 testeurs pendant 14 jours avant la production (règle à revérifier dans la console).

## 3. iOS (App Store)
1. Compte Apple Developer (99 $/an).
2. `git pull && npm install && npx cap sync ios && npx cap open ios` (Xcode + CocoaPods).
3. Dans Xcode : Signing & Capabilities › ton équipe ; Product › Archive › Distribute App › App Store Connect.
4. App Store Connect : fiche avec `store/listing.md`, captures `store/screenshots/ios/`, questionnaire de confidentialité, envoyer en revue.

## 4. Le jour J
Poster le clip « C'est dispo », mettre les liens des stores dans les bios Instagram et TikTok.
