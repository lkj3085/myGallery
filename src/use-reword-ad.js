// ios ca-app-pub-5406131448511792/2100194971
// android ca-app-pub-5406131448511792/5608195148
import { AdMobRewarded } from "expo-ads-admob";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const UNIT_ID = Platform.select({
  ios: __DEV__
    ? "ca-app-pub-3940256099942544/1712485313"
    : "ca-app-pub-5406131448511792/2100194971",
  android: __DEV__
    ? "ca-app-pub-3940256099942544/5224354917"
    : "ca-app-pub-5406131448511792/5608195148",
});

export const useRewordAd = () => {
  const [isLoaded, setIsLoaded] = useState(false); // 광고 로딩
  const [isRewarded, setIsRewarded] = useState(false); // 보상을 받을 수 있는 상태까지 시청
  const [isClosed, setIsClosed] = useState(false); // 광고가 닫혔는지

  const loadRewordAd = async () => {
    await AdMobRewarded.setAdUnitID(UNIT_ID);
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  const resetAdValue = () => {
    setIsLoaded(false);
    setIsRewarded(false);
    setIsClosed(false);
  };

  useEffect(() => {
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      console.log("rewardedVideoUserDidEarnReward");
      setIsLoaded(true);
    });
    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
      console.log("rewardedVideoDidLoad");
      setIsRewarded(true);
    });
    // AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
    //   console.log("rewardedVideoDidLoad");
    // });
    // AdMobRewarded.addEventListener("rewardedVideoDidPresent", () => {
    //   console.log("rewardedVideoDidPresent");
    // });
    // AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
    //   console.log("rewardedVideoDidFailToPresent");
    // });
    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
      console.log("rewardedVideoDidDismiss");
      setIsClosed(true);
    });

    return () => {
      AdMobRewarded.removeAllListeners();
    };
  }, []);

  return {
    loadRewordAd,
    isLoaded,
    isRewarded,
    isClosed,
    resetAdValue,
  };
};
