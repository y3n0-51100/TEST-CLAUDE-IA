/* Régie pub AdMob via Capacitor. Dans un navigateur (sans natif), simule les pubs.
   ⚠ IDs ci-dessous = IDs de TEST officiels Google : à remplacer par les vrais avant publication. */
(() => {
  'use strict';
  const IDS = {
    android: { rewarded: 'ca-app-pub-3940256099942544/5224354917', interstitial: 'ca-app-pub-3940256099942544/1033173712' },
    ios: { rewarded: 'ca-app-pub-3940256099942544/1712485313', interstitial: 'ca-app-pub-3940256099942544/4411468910' },
  };
  const IS_TESTING = true; // passer à false avec les vrais IDs

  const cap = window.Capacitor;
  const native = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  const AdMob = native && cap.Plugins && cap.Plugins.AdMob;
  const ids = IDS[native ? cap.getPlatform() : 'android'];

  let ready = false, privacyRequired = false;

  // Consentement RGPD (obligatoire en UE) puis suivi iOS (ATT), puis initialisation
  async function init() {
    if (!AdMob) return;
    try {
      const info = await AdMob.requestConsentInfo();
      privacyRequired = info.privacyOptionsRequirementStatus === 'REQUIRED';
      if (info.isConsentFormAvailable && info.status === 'REQUIRED') await AdMob.showConsentForm();
      if (cap.getPlatform() === 'ios') {
        const st = await AdMob.trackingAuthorizationStatus();
        if (st.status === 'notDetermined') await AdMob.requestTrackingAuthorization();
      }
      await AdMob.initialize({ initializeForTesting: IS_TESTING });
      ready = true;
    } catch (e) { console.warn('AdMob init', e); }
  }

  // Résout à true uniquement si le joueur a regardé la vidéo jusqu'à la récompense
  async function rewarded() {
    if (!AdMob) return true; // navigateur : on simule
    if (!ready) return false;
    let got = false;
    const hs = [await AdMob.addListener('onRewardedVideoAdReward', () => { got = true; })];
    try {
      await AdMob.prepareRewardVideoAd({ adId: ids.rewarded, isTesting: IS_TESTING });
      await AdMob.showRewardVideoAd(); // résolu à la fin de la pub
    } catch (e) { console.warn('rewarded', e); }
    hs.forEach(h => h.remove());
    return got;
  }

  // Ne bloque jamais le jeu : en cas d'échec on continue
  async function interstitial() {
    if (!AdMob || !ready) return;
    try {
      await AdMob.prepareInterstitial({ adId: ids.interstitial, isTesting: IS_TESTING });
      await AdMob.showInterstitial();
    } catch (e) { console.warn('interstitial', e); }
  }

  const showPrivacy = () => AdMob && AdMob.showPrivacyOptionsForm();
  window.Ads = { init, rewarded, interstitial, showPrivacy, get privacyRequired() { return privacyRequired; } };
})();
